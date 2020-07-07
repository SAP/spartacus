import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderApproval, OrderApprovalService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderApprovalDetailService } from '../order-approval-detail.service';

@Component({
  selector: 'cx-order-approval-detail-form',
  templateUrl: './order-approval-detail-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderApprovalDetailFormComponent {
  approvalDecision: 'APPROVE' | 'REJECT';
  approvalFormVisible = false;
  approvalForm: FormGroup = this.fb.group({
    comment: [''],
  });

  constructor(
    protected orderApprovalDetailService: OrderApprovalDetailService,
    protected orderApprovalService: OrderApprovalService,
    private fb: FormBuilder
  ) {}

  get orderApproval$(): Observable<OrderApproval> {
    return this.orderApprovalDetailService.getOrderApproval();
  }

  displayDecisionForm(decision: 'APPROVE' | 'REJECT') {
    this.approvalDecision = decision;
    if (decision === 'APPROVE') {
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
      this.orderApprovalService.makeDecision(orderApproval.code, {
        decision: this.approvalDecision,
        comment: this.approvalForm.controls.comment.value,
      });
    } else {
      this.approvalForm.markAllAsTouched();
    }
  }
}
