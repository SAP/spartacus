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
import { PunchoutRequisition } from '@spartacus/punchout/root';
import {
  filter,
  mergeMap,
  Observable,
  of,
  retry,
  switchMap,
  take,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { PunchoutComponentService } from '../punchout.component.service';

@Component({
  selector: 'cx-punchout-requsition',
  templateUrl: './punchout-requisition.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PunchoutRequisitionComponent implements OnInit {
  @ViewChild('punchoutFormElement')
  punchoutFormElement!: ElementRef<HTMLFormElement>;

  punchoutFormGroup: FormGroup;
  protected punchoutService = inject(PunchoutComponentService);
  fb = inject(FormBuilder);

  punchoutRequisition$: Observable<PunchoutRequisition> = this.punchoutService
    .getPunchoutRequisition()
    .pipe(
      take(1),
      tap((req) => {
        this.punchoutFormGroup.controls['order'].valueChanges
          .pipe(
            tap((value: string) => console.log('order value changed', value)),
            filter((value: string) => value === req.orderAsCXML),
            take(1),
            switchMap((value) => {
              console.log('flo val', value);
              return this.submitForm();
            }),
            take(1)
          )
          .subscribe(() => {
            this.punchoutFormElement.nativeElement.submit();
          });
        this.punchoutFormGroup.setValue({ order: req.orderAsCXML });
      })
    );

  ngOnInit(): void {
    console.log('PunchoutRequisitionComponent ngOninit');

    this.punchoutFormGroup = this.fb.group({
      order: [''],
    });
  }

  submitForm(): Observable<boolean> {
    console.log('submitForm');
    return timer(10).pipe(
      mergeMap(() => {
        if (!this.punchoutFormElement.nativeElement) {
          console.log('Form is null');
          return throwError(() => 'Form not ready');
        } else {
          return of(true);
        }
      }),
      retry(10)
    );
  }
}
