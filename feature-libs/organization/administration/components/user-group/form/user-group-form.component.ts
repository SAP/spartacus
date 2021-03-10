import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import {
  B2BUnitNode,
  OrgUnitService,
  UserGroup,
} from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItemService } from '../../shared/item.service';
import { UserGroupItemService } from '../services/user-group-item.service';
import { createCodeForEntityName } from '../../shared/utility/entity-code';

@Component({
  selector: 'cx-org-user-group-form',
  templateUrl: './user-group-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'content-wrapper' },
  providers: [
    {
      provide: ItemService,
      useExisting: UserGroupItemService,
    },
  ],
})
export class UserGroupFormComponent implements OnInit {
  form: FormGroup = this.itemService.getForm();

  // getList ???
  units$: Observable<B2BUnitNode[]> = this.unitService.getActiveUnitList().pipe(
    tap((units) => {
      if (units.length === 1) {
        this.form?.get('orgUnit.uid')?.setValue(units[0]?.id);
      }
    })
  );

  constructor(
    protected itemService: ItemService<UserGroup>,
    protected unitService: OrgUnitService
  ) {}

  ngOnInit(): void {
    this.unitService.loadList();
  }

  createUidWithName(name: AbstractControl, code: AbstractControl): void {
    createCodeForEntityName(name, code);
  }
}
