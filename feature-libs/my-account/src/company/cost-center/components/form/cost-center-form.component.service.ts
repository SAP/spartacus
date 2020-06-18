import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormsPersistenceService } from '../../../../shared/form/services/forms-persistence.service';

@Injectable({ providedIn: 'root' })
export class CostCenterFormComponentService {
  protected formConfiguration: { [key: string]: any } = {
    code: ['', Validators.required],
    name: ['', Validators.required],
    unit: null,
    currency: null,
  };

  constructor(protected persistenceService: FormsPersistenceService) {}

  getForm(prePopulatedFormData: object = {}, key?: string): FormGroup {
    return this.persistenceService.get(
      key,
      this.formConfiguration,
      prePopulatedFormData
    );
  }

  removeForm(key: string): boolean {
    return this.persistenceService.remove(key);
  }

  has(key: string): boolean {
    return this.persistenceService.has(key);
  }
}
