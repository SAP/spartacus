import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { B2BUnitNode, OrgUnitService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FormsPersistenceService } from '../../../../shared/services/forms/forms-persistence.service';

@Injectable({ providedIn: 'root' })
export class CostCenterFormComponentService {
  protected formConfiguration: { [key: string]: any } = {
    code: ['', Validators.required],
    name: ['', Validators.required],
    //TODO:#save-forms - check these inner fgs.
    unit: this.fb.group({
      uid: [null, Validators.required],
    }),
    currency: null,
  };

  constructor(
    protected fb: FormBuilder,
    protected persistenceService: FormsPersistenceService,
    protected orgUnitService: OrgUnitService
  ) {}

  loadOrgUnitNodes(): void {
    this.orgUnitService.loadOrgUnitNodes();
  }

  getBusinessUnits(): Observable<B2BUnitNode[]> {
    return this.orgUnitService.getActiveUnitList();
  }

  //TODO:#save-forms - make key optional, and use the formConfiguration instead
  getForm(key: string, prePopulatedFormData: object = {}): FormGroup {
    return this.persistenceService.get(
      key,
      this.formConfiguration,
      prePopulatedFormData
    );
  }

  removeForm(key: string): boolean {
    return this.persistenceService.remove(key);
  }
}
