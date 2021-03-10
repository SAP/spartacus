import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Permission } from '@spartacus/organization/administration/core';
import { CellComponent } from '../cell.component';

@Component({
  selector: 'cx-org-limit-cell',
  templateUrl: './limit-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitCellComponent extends CellComponent {
  get isTimeSpanThreshold(): boolean {
    return (
      (this.model as Permission).orderApprovalPermissionType?.code ===
      'B2BOrderThresholdTimespanPermission'
    );
  }

  get isOrderThreshold(): boolean {
    return (
      (this.model as Permission).orderApprovalPermissionType?.code ===
      'B2BOrderThresholdPermission'
    );
  }

  get isExceedPermission(): boolean {
    return (
      (this.model as Permission).orderApprovalPermissionType?.code ===
      'B2BBudgetExceededPermission'
    );
  }
}
