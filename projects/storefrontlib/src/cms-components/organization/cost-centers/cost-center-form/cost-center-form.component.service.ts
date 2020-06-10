import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  B2BUnitNode,
  Currency,
  CurrencyService,
  OrgUnitService,
} from '@spartacus/core';
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
    currency: this.fb.group({
      isocode: [null, Validators.required],
    }),
  };

  constructor(
    protected fb: FormBuilder,
    protected persistenceService: FormsPersistenceService,
    protected currencyService: CurrencyService,
    protected orgUnitService: OrgUnitService
  ) {}

  loadOrgUnitNodes(): void {
    this.orgUnitService.loadOrgUnitNodes();
  }

  getCurrencies(): Observable<Currency[]> {
    return this.currencyService.getAll();
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
