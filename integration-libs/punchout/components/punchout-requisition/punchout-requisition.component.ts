/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PunchoutFacade, PunchoutRequisition } from '@spartacus/punchout/root';
import { filter, map, Observable, switchMap, take, tap, timer } from 'rxjs';

@Component({
  selector: 'cx-punchout-requsition',
  templateUrl: './punchout-requisition.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutRequisitionComponent implements OnInit {
  protected punchoutFacade = inject(PunchoutFacade);
  protected formBuilder = inject(FormBuilder);

  @ViewChild('punchoutFormElement')
  punchoutFormElement!: ElementRef<HTMLFormElement>;
  punchoutFormGroup: FormGroup;
  readonly FORM_CONTROL_NAME = {
    ORDER: 'order',
  } as const;

  punchoutRequisition$: Observable<PunchoutRequisition | undefined> =
    this.punchoutFacade.getPunchoutSessionRequisition().pipe(
      take(1),
      tap((punchoutRequisition) => {
        this.listenAndSubmitForm(punchoutRequisition).subscribe({
          next: () => {
            this.punchoutFormElement.nativeElement.submit();
          },
          error: () => {
            this.punchoutFacade.endPunchoutSession();
          },
        });
        this.punchoutFormGroup.setValue({
          [this.FORM_CONTROL_NAME.ORDER]: punchoutRequisition?.orderAsCXML,
        });
      })
    );

  ngOnInit(): void {
    this.punchoutFormGroup = this.formBuilder.group({
      [this.FORM_CONTROL_NAME.ORDER]: [''],
    });
  }

  protected listenAndSubmitForm(
    req: PunchoutRequisition | undefined
  ): Observable<boolean> {
    return this.punchoutFormGroup.controls[
      this.FORM_CONTROL_NAME.ORDER
    ].valueChanges.pipe(
      filter((value: string) => value === req?.orderAsCXML),
      take(1),
      switchMap(() => {
        return this.isFormNativeElementAccessible();
      }),
      switchMap(() => {
        return this.punchoutFacade.logoutPunchoutUser();
      }),
      take(1)
    );
  }

  protected isFormNativeElementAccessible(): Observable<boolean> {
    // timer(0) wait for next Javascript event loop, this way DOM native elements becomes accessible.
    return timer(0).pipe(
      map(() => {
        if (!this.punchoutFormElement?.nativeElement) {
          throw new Error('Form native element not accessible');
        } else {
          return true;
        }
      })
    );
  }
}
