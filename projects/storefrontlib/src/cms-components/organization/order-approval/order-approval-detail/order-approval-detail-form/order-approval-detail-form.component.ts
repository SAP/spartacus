import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderApproval, OrderApprovalService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { OrderApprovalDetailService } from '../order-approval-detail.service';

enum ApprovalDecisionValue {
  APPROVE = 'APPROVE',
  REJECT = 'REJECT',
}

@Component({
  selector: 'cx-order-approval-detail-form',
  templateUrl: './order-approval-detail-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderApprovalDetailFormComponent {
  approvalDecisionValue = ApprovalDecisionValue;
  approvalDecision: ApprovalDecisionValue;
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

  displayDecisionForm(decision: ApprovalDecisionValue) {
    this.approvalDecision = decision;
    this.approvalFormVisible = true;
  }

  cancelDecisionForm() {
    this.approvalFormVisible = false;
    this.approvalForm.reset();
  }

  submitDecision(orderApproval: OrderApproval) {
    this.orderApprovalService.makeDecision(orderApproval.code, {
      decision: this.approvalDecision,
      comment: this.approvalForm.controls.comment.value,
    });
  }
}
