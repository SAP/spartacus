import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { OrgUnitService } from '@spartacus/core';
import { FormsPersistenceService } from '../../../../shared/services/forms/forms-persistence.service';

@Injectable({ providedIn: 'root' })
export class CostCenterFormComponentService {
  protected formConfiguration: { [key: string]: any } = {
    code: ['', Validators.required],
    name: ['', Validators.required],
    unit: null,
    currency: null,
  };

  constructor(
    protected persistenceService: FormsPersistenceService,
    protected orgUnitService: OrgUnitService
  ) {}

  //TODO:#save-forms - move to unit form?
  loadOrgUnitNodes(): void {
    this.orgUnitService.loadOrgUnitNodes();
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
