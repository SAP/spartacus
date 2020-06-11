import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormsPersistenceService } from '../../../../shared/services/forms/forms-persistence.service';

@Injectable({ providedIn: 'root' })
export class CostCenterFormComponentService {
  protected formConfiguration: { [key: string]: any } = {
    code: ['', Validators.required],
    name: ['', Validators.required],
    unit: null,
    currency: null,
  };

  constructor(protected persistenceService: FormsPersistenceService) {}

  getForm(prePopulatedFormData: object = {}, key?: object): FormGroup {
    return this.persistenceService.get(
      key ?? this.formConfiguration,
      this.formConfiguration,
      prePopulatedFormData
    );
  }

  removeForm(key: object): boolean {
    return this.persistenceService.remove(key);
  }
}
