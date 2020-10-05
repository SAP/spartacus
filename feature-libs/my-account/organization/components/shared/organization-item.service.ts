import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/my-account/organization/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { CurrentOrganizationItemService } from './current-organization-item.service';
import { OrganizationFormService } from './organization-form/organization-form.service';

/**
 * Provides CRUD operations for all organization entities.
 *
 * This base class simplifies the various entity implementation, and ensures a consistent
 * component implementation.
 */
@Injectable()
export abstract class OrganizationItemService<T> {
  constructor(
    protected currentItemService: CurrentOrganizationItemService<T>,
    protected routingService: RoutingService,
    protected formService: OrganizationFormService<T>
  ) {}

  key$ = this.currentItemService.key$;
  current$ = this.currentItemService.item$;
  unit$: Observable<string> = this.currentItemService.b2bUnit$;

  save(form: FormGroup, key?: string) {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      const formValue = form.value;
      form.disable();

      if (key) {
        this.update(key, formValue);
      } else {
        this.create(formValue);
      }
      // this potentially fails when creating/saving takes time:
      // - the new item might not yet exists and therefor will fail with a 404 in case of routing
      // - the new item  might not yet be saved, thus the detailed route would not reflect the changes
      this.launchDetails(formValue);
    }
  }

  /**
   * Loads an item.
   */
  abstract load(...params: any[]): Observable<T>;

  /**
   * Creates a new item.
   */
  protected abstract create(value: T): void;

  /**
   * Updates an existing item.
   */
  abstract update(key: string, value: T): Observable<OrganizationItemStatus<T>>;

  /**
   * Returns the detailed cxRoute for the organization item.
   */
  protected abstract getDetailsRoute(): string;

  getForm(item?: T): FormGroup {
    return this.formService.getForm(item);
  }

  /**
   * Launches the detailed route for the given item item.
   */
  launchDetails(item: T): void {
    const cxRoute = this.getDetailsRoute();
    if (cxRoute && Object.keys(item).length > 0) {
      this.routingService.go({ cxRoute, params: item });
    }
  }
}
