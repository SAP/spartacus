import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
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

  /**
   * Returns the current business unit code.
   *
   * The current unit is driven by the route parameter.
   */
  unit$: Observable<string> = this.currentItemService.b2bUnit$;

  save(form: FormGroup, key?: string): Observable<OrganizationItemStatus<T>> {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      const formValue = form.value;
      form.disable();

      // this potentially fails when creating/saving takes time:
      // - the new item might not yet exists and therefore will fail with a 404 in case of routing
      // - the new item  might not yet be saved, thus the detailed route would not reflect the changes
      this.launchDetails(formValue);

      return key ? this.update(key, formValue) : this.create(formValue);
    }
  }

  /**
   * Loads an item.
   */
  abstract load(...params: any[]): Observable<T>;

  /**
   * Creates a new item.
   */
  protected abstract create(value: T): Observable<OrganizationItemStatus<T>>;

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
    const params = this.getRouteParams(item);
    if (cxRoute && item && Object.keys(item).length > 0) {
      this.routingService.go({ cxRoute, params });
    }
  }

  /**
   * Returns the route parameters that are used when launching the
   * details page. The route parameters default to the actual item,
   * but can be further populated in implementations.
   *
   * Customized route parameters are useful in case the actual item
   * doesn't match the expected route parameters. You can manipulate
   * the parameter data.
   */
  protected getRouteParams(item: T): any {
    return item;
  }
}
