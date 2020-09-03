import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { FormUtils } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, map, pluck, switchMap } from 'rxjs/operators';
import { QUERY_PARAMS } from '../constants';

/**
 * Abstract Base class for all organization entities. This class simplifies
 * the various entity implementation, that only differ by dependencies and
 * data model.
 */
@Injectable()
export abstract class CurrentOrganizationItemService<T> {
  constructor(protected routingService: RoutingService) {}

  /**
   * Observes the key for the active organization item. The active key is observed
   * from the list of route parameters. The full route parameter list is evaluated,
   * including child routes.
   *
   * To allow for specific ("semantic") route parameters, the route parameter _key_ is
   * retrieved from the `getParamKey`.
   */
  readonly key$: Observable<string> = this.routingService
    .getParams()
    .pipe(pluck(this.getParamKey()), distinctUntilChanged());

  /**
   * Observes the active item.
   *
   * The active item is loaded by the active `key$`.
   */
  readonly item$: Observable<T> = this.key$.pipe(
    switchMap((code: string) => (code ? this.getItem(code) : of(null)))
  );

  /**
   * Observes the b2bUnit based on the query parameters.
   */
  // TODO: rename to unit$ or activeUnit$
  readonly b2bUnit$ = this.routingService.getRouterState().pipe(
    map(
      (routingData) => routingData.state.queryParams?.[QUERY_PARAMS.parentUnit]
    ),
    distinctUntilChanged()
  );

  launchDetails(params: T): void {
    const cxRoute = this.getDetailsRoute();
    if (cxRoute) {
      this.routingService.go({ cxRoute, params });
    }
  }

  save(form: FormGroup, code?: string) {
    if (form.invalid) {
      form.markAllAsTouched();
      FormUtils.deepUpdateValueAndValidity(form);
    } else {
      form.disable();
      if (code) {
        this.update(code, form.value);
      } else {
        this.create(form.value);
      }
      this.launchDetails(form.value);
    }
  }

  // TODO: make abstract as soon as all services move to this new version
  protected update(_key: string, _value: T): void {}
  protected create(_value: T): void {}

  // TODO: make abstract!
  load(..._args): Observable<T> {
    return;
  }

  /**
   * Returns the route parameter key for the item. The route parameter key differs
   * per item, so that route parameters are distinguished in the route configuration.
   */
  protected abstract getParamKey(): string;

  /**
   * Emits the current model or null, if there is no model available
   */
  protected abstract getItem(...params: any[]): Observable<T>;

  protected getDetailsRoute(): string {
    return;
  }
}
