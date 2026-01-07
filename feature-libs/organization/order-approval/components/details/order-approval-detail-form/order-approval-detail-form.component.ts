/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  BtnLikeLinkDirective,
  FormErrorsComponent,
  SpinnerComponent,
} from '@spartacus/storefront';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  OrderApproval,
  OrderApprovalDecisionValue,
} from '../../../core/model/order-approval.model';
import { OrderApprovalService } from '../../../core/services/order-approval.service';
import { OrderApprovalDetailService } from '../order-approval-detail.service';

@Component({
  selector: 'cx-order-approval-detail-form',
  templateUrl: './order-approval-detail-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule,
    FormErrorsComponent,
    BtnLikeLinkDirective,
    RouterLink,
    AsyncPipe,
    TranslatePipe,
    UrlPipe,
  ],
})
export class OrderApprovalDetailFormComponent implements OnDestroy {
  approvalDecisionValue = OrderApprovalDecisionValue;
  approvalDecision: OrderApprovalDecisionValue;
  approvalFormVisible = false;
  approvalForm: UntypedFormGroup = this.fb.group({
    comment: [''],
  });

  protected orderApprovalLoading$: Observable<boolean> =
    this.orderApprovalDetailService
      .getOrderApprovalCodeFromRoute()
      .pipe(
        switchMap((approvalCode: string) =>
          this.orderApprovalService.getOrderApprovalLoading(approvalCode)
        )
      );

  protected decisionResultLoading$ =
    this.orderApprovalService.getMakeDecisionResultLoading();

  loading$: Observable<boolean> = combineLatest([
    this.orderApprovalLoading$,
    this.decisionResultLoading$,
  ]).pipe(
    map(
      ([approvalLoading, decisionResultLoading]) =>
        approvalLoading || decisionResultLoading
    )
  );

  orderApproval$: Observable<OrderApproval | undefined> =
    this.orderApprovalDetailService.getOrderApproval();

  constructor(
    protected orderApprovalDetailService: OrderApprovalDetailService,
    protected orderApprovalService: OrderApprovalService,
    private fb: UntypedFormBuilder
  ) {
    this.orderApprovalService.resetMakeDecisionProcessState();
  }

  displayDecisionForm(decision: OrderApprovalDecisionValue) {
    this.approvalDecision = decision;
    if (decision === OrderApprovalDecisionValue.APPROVE) {
      this.approvalForm.controls.comment.clearValidators();
    } else {
      this.approvalForm.controls.comment.setValidators([Validators.required]);
    }
    this.approvalFormVisible = true;
  }

  cancelDecisionForm() {
    this.approvalFormVisible = false;
    this.approvalForm.reset();
  }

  submitDecision(orderApproval: OrderApproval) {
    if (this.approvalForm.valid) {
      this.orderApprovalService.makeDecision(orderApproval.code ?? '', {
        decision: this.approvalDecision,
        comment: this.approvalForm.controls.comment.value,
      });
      this.approvalFormVisible = false;
    } else {
      this.approvalForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.orderApprovalService.resetMakeDecisionProcessState();
  }
}
