import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormsPersistenceService } from '../../shared/services/forms-persistence.service';

// TODO:#form-persistence - move to ../services
@Injectable({ providedIn: 'root' })
export class CostCenterFormComponentService {
  protected formConfiguration: { [key: string]: any } = {
    code: ['', Validators.required],
    name: ['', Validators.required],
    unit: null,
    currency: null,
  };

  constructor(protected persistenceService: FormsPersistenceService) {}

  getForm(defaultValue: object, key: string): FormGroup {
    return this.persistenceService.get(
      this.formConfiguration,
      defaultValue,
      key
    );
  }

  removeForm(key: string): boolean {
    return this.persistenceService.remove(key);
  }

  has(key: string): boolean {
    return this.persistenceService.has(key);
  }
}
