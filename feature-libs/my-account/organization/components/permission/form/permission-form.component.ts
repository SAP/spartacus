import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  B2BUnitNode,
  OrderApprovalPermissionType,
  CurrencyService,
  Currency,
  Period,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import {
  PermissionFormService,
  PermissionType,
} from './permission-form.service';
import { OrgUnitService } from '@spartacus/my-account/organization/core';
import { PermissionService } from '@spartacus/my-account/organization/core';

@Component({
  selector: 'cx-permission-form',
  templateUrl: './permission-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionFormComponent implements OnInit {
  /**
   * The form is controlled from the container component.
   */
  @Input() form: FormGroup;

  /**
   * Property used to recognize if form is on create or edit state.
   * Value of this property is used to mark permission type field as readonly.
   */
  @Input() editMode?: boolean;

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getList();
  types$: Observable<
    OrderApprovalPermissionType[]
  > = this.permissionService.getTypes();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();
  periods = Object.keys(Period);

  constructor(
    protected permissionService: PermissionService,
    protected permissionFormService: PermissionFormService,
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.orgUnitService.loadList();
    if (this.form && !this.editMode) {
      this.permissionFormService.adjustForm(this.form, {
        code: PermissionType.EXCEEDED,
      });
    }
  }

  onTypeSelect(type: OrderApprovalPermissionType): void {
    this.permissionFormService.adjustForm(this.form, type);
  }
}
