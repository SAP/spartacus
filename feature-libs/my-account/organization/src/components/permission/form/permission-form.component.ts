import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  B2BUnitNode,
  OrgUnitService,
  PermissionService,
  OrderApprovalPermissionType,
  CurrencyService,
  Currency,
  Period,
} from '@spartacus/core';
import { Observable } from 'rxjs';

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

  units$: Observable<B2BUnitNode[]> = this.orgUnitService.getList();
  types$: Observable<
    OrderApprovalPermissionType[]
  > = this.permissionService.getTypes();
  currencies$: Observable<Currency[]> = this.currencyService.getAll();
  periods = Object.keys(Period);

  constructor(
    protected permissionService: PermissionService,
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.orgUnitService.loadList();
  }
}
