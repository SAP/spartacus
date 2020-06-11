import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { B2BUnitNode, OrgUnitService } from '@spartacus/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UnitCommonFormComponentService {
  protected formConfiguration: { [key: string]: any } = {
    uid: [null, Validators.required],
  };

  constructor(
    protected fb: FormBuilder,
    protected orgUnitService: OrgUnitService
  ) {}

  getBusinessUnits(): Observable<B2BUnitNode[]> {
    return this.orgUnitService.getActiveUnitList();
  }

  getForm(): FormGroup {
    return this.fb.group(this.formConfiguration);
  }
}
