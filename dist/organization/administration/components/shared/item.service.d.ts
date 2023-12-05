import { UntypedFormGroup } from '@angular/forms';
import { RoutingService } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { Observable } from 'rxjs';
import { CurrentItemService } from './current-item.service';
import { FormService } from './form/form.service';
import * as i0 from "@angular/core";
/**
 * Provides CRUD operations for all organization entities.
 *
 * This base class simplifies the various entity implementation, and ensures a consistent
 * component implementation.
 */
export declare abstract class ItemService<T> {
    protected currentItemService: CurrentItemService<T>;
    protected routingService: RoutingService;
    protected formService: FormService<T>;
    constructor(currentItemService: CurrentItemService<T>, routingService: RoutingService, formService: FormService<T>);
    key$: Observable<string>;
    current$: Observable<T | undefined>;
    isInEditMode$: Observable<boolean>;
    /**
     * Returns the current business unit code.
     *
     * The current unit is driven by the route parameter.
     */
    unit$: Observable<string>;
    error$: Observable<boolean>;
    save(form: UntypedFormGroup, key?: string): Observable<OrganizationItemStatus<T>>;
    /**
     * Deletes an item.
     */
    delete?(key: string, additionalParam?: string): Observable<OrganizationItemStatus<T>>;
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
    getForm(item?: T): UntypedFormGroup | null;
    /**
     * Launches the detailed route for the given item item.
     */
    launchDetails(item?: T): void;
    /**
     * Returns the route parameters that are used when launching the
     * details page. The route parameters default to the actual item,
     * but can be further populated in implementations.
     *
     * Customized route parameters are useful in case the actual item
     * doesn't match the expected route parameters. You can manipulate
     * the parameter data.
     */
    protected buildRouteParams(item?: T): any;
    getRouterParam(key: string): Observable<string>;
    /**
     * Sets to true when the user is on the entity item form page
     */
    setEditMode(isInEdit: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ItemService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ItemService<any>>;
}
