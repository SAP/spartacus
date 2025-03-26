/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import { RoutingService } from '@spartacus/core';
import {
  PUNCHOUT_ERROR_PAGE_URL,
  PunchoutFacade,
  PunchoutRequisition,
} from '@spartacus/punchout/root';
import { filter, map, Observable, switchMap, take, tap, timer } from 'rxjs';

@Component({
  selector: 'cx-punchout-requsition',
  templateUrl: './punchout-requisition.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class PunchoutRequisitionComponent implements OnInit {
  @ViewChild('punchoutFormElement')
  punchoutFormElement!: ElementRef<HTMLFormElement>;
  protected punchoutFacade = inject(PunchoutFacade);
  protected routingService = inject(RoutingService);
  punchoutFormGroup: FormGroup;

  fb = inject(FormBuilder);

  punchoutRequisition$: Observable<PunchoutRequisition | undefined> =
    this.punchoutFacade.getPunchoutSessionRequisition().pipe(
      take(1),
      tap((punchoutRequisition) => {
        this.listenAndSubmitForm(punchoutRequisition).subscribe({
          next: () => {
            this.punchoutFormElement.nativeElement.submit();
          },
          error: (err) => {
            console.log('sub error', err);
            this.routingService.goByUrl(PUNCHOUT_ERROR_PAGE_URL);
          },

          complete: () => {
            console.log('sub complete');
          },
        });
        this.punchoutFormGroup.setValue({
          order: punchoutRequisition?.orderAsCXML,
        });
      })
    );

  protected listenAndSubmitForm(
    req: PunchoutRequisition | undefined
  ): Observable<boolean> {
    return this.punchoutFormGroup.controls['order'].valueChanges.pipe(
      tap((value: string) => console.log('order value changed', value)),
      filter((value: string) => value === req?.orderAsCXML),
      take(1),
      switchMap(() => {
        console.log('flo this.punchoutFormElement.nativeElement');

        return this.isNativeFormElementReady();
      }),
      switchMap(() => {
        return this.punchoutFacade.logoutPunchoutUser();
      }),
      take(1)
    );
  }

  ngOnInit(): void {
    console.log('PunchoutRequisitionComponent ngOninit');

    this.punchoutFormGroup = this.fb.group({
      order: [''],
    });
  }

  isNativeFormElementReady(): Observable<boolean> {
    console.log('submitForm');
    return timer(0).pipe(
      map(() => {
        if (!this.punchoutFormElement?.nativeElement) {
          console.log('Form is null');
          throw () => 'Form not ready';
        } else {
          return true;
        }
      })
    );
  }
}
