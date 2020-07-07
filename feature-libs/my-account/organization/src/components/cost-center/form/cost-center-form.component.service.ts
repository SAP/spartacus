import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CostCenter, CostCenterService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { FormsPersistenceService } from '../../shared/services/forms-persistence.service';

// TODO:#form-persistence - move to ../services?
/**
 * Cost center component service is used when creating or editing
 * a cost center.
 *
 * It offers a helpful set of methods when working with
 * forms, creating and updating the cost center.
 *
 */
@Injectable({ providedIn: 'root' })
export class CostCenterFormComponentService {
  protected formConfiguration: { [key: string]: any } = {
    code: ['', Validators.required],
    name: ['', Validators.required],
    unit: null,
    currency: null,
  };

  constructor(
    protected costCenterService: CostCenterService,
    protected persistenceService: FormsPersistenceService
  ) {}

  /**
   * Generates a key for the cost center form.
   *
   * @returns a generated key
   */
  generateKey(): string {
    return this.persistenceService.generateKey();
  }

  /**
   * Fetches the form from the persistence service.
   *
   * @param defaultValue the value to use when pre-populating the form
   * @param key the key by which to fetch/store the form
   * @returns the form
   */
  getForm(defaultValue: object, key: string): FormGroup {
    return this.persistenceService.get(
      this.formConfiguration,
      key,
      defaultValue
    );
  }

  /**
   * Removes the form from the persistence service.
   *
   * @param key the key for the form being removed
   * @returns `true` if the form was removed, `false` otherwise
   */
  removeForm(key: string): boolean {
    return this.persistenceService.remove(key);
  }

  /**
   * Checks if the form is already persisted.
   *
   * @param key the key used to check for the persisted form
   * @returns `true` if the form exists, `false` otherwise
   */
  hasForm(key: string): boolean {
    return this.persistenceService.has(key);
  }

  /**
   * Loads and returns an observable of the cost center
   * for the given code.
   *
   * @param code a cost center code which to load and get
   * @returns an observable of the loaded cost center
   */
  loadAndGet(code: string): Observable<CostCenter> {
    this.costCenterService.loadCostCenter(code);
    return this.costCenterService.get(code);
  }

  /**
   * Creates the provided cost center on the back-end.
   *
   * @param costCenter to create
   */
  create(costCenter: CostCenter): void {
    this.costCenterService.create(costCenter);
  }

  /**
   * Updates the cost center associated with the given `costCenterCode`,
   * and updates it with the provided `costCenter`.
   *
   * @param costCenterCode to update
   * @param costCenter updated cost center
   */
  update(costCenterCode: string, costCenter: CostCenter): void {
    this.costCenterService.update(costCenterCode, costCenter);
  }
}
