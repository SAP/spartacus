import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { FormUtils } from '@spartacus/storefront';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrentItemService } from './current-item.service';
import { FormService } from './form/form.service';

/**
 * Provides CRUD operations for all organization entities.
 *
 * This base class simplifies the various entity implementation, and ensures a consistent
 * component implementation.
 */
@Injectable()
export abstract class ItemService<T> {
  constructor(
    protected currentItemService: CurrentItemService<T>,
    protected routingService: RoutingService,
    protected formService: FormService<T>
  ) {}

  key$ = this.currentItemService.key$;
  current$ = this.currentItemService.item$;

  isInEditMode$: Observable<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Returns the current business unit code.
   *
   * The current unit is driven by the route parameter.
   */
  unit$: Observable<string> = this.currentItemService.b2bUnit$;

  error$: Observable<boolean> = this.key$.pipe(
    switchMap((key) => this.currentItemService.getError(key))
  );

  save(form: FormGroup, key?: string): Observable<OrganizationItemStatus<T>> {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
      return of();
    } else {
      /**
       * This assignment is needed to re-use form value after `form.disable()` call
       * In some cases value was converted by `form.disable()` into empty object
       */
      const formValue = form.value;
      form.disable();

      return key ? this.update(key, formValue) : this.create(formValue);
    }
  }

  /**
   * Deletes an item.
   */
  delete?(
    key: string,
    additionalParam?: string
  ): Observable<OrganizationItemStatus<T>>;
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
    const params = this.buildRouteParams(item);
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
  protected buildRouteParams(item: T): any {
    return item;
  }

  getRouterParam(key: string): Observable<string> {
    return this.currentItemService.getRouterParam(key);
  }

  /**
   * Sets to true when the user is on the entity item form page
   */
  setEditMode(isInEdit: boolean) {
    (this.isInEditMode$ as BehaviorSubject<boolean>).next(isInEdit);
  }
}
