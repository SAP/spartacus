import { EntitiesModel, PaginationModel, Translatable } from '@spartacus/core';
import { ICON_TYPE, Table, TableStructure, TrapFocus } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../item.service';
import { OrganizationTableType } from '../organization.model';
import { ListService, CreateButtonType } from './list.service';
import * as i0 from "@angular/core";
export declare class ListComponent<T = any, P = PaginationModel> {
    protected service: ListService<T, P>;
    protected organizationItemService: ItemService<T>;
    readonly trapFocus: typeof TrapFocus;
    hasGhostData: boolean;
    constructor(service: ListService<T, P>, organizationItemService: ItemService<T>);
    viewType: OrganizationTableType;
    domainType: string;
    sortCode: string | undefined;
    iconTypes: typeof ICON_TYPE;
    createButtonAllTypes: typeof CreateButtonType;
    createButtonType: CreateButtonType;
    /**
     * The current key represents the current selected item from the dataset.
     * This key is used to load the item details as well as highlight the item in
     * a list of items.
     */
    readonly currentKey$: Observable<string>;
    readonly structure$: Observable<TableStructure>;
    readonly listData$: Observable<EntitiesModel<T> | undefined>;
    key: string;
    hideAddButton: boolean;
    /**
     * Returns the total number of items.
     */
    getListCount(dataTable: Table | EntitiesModel<T>): number | undefined;
    /**
     * Browses to the given page number
     */
    browse(pagination: P | undefined, pageNumber: number): void;
    /**
     * Navigates to the detailed view of the selected list item.
     */
    launchItem(event: T): void;
    /**
     * Sorts the list.
     */
    sort(pagination: P | undefined): void;
    /**
     * Function to call when 'Manage Users' button is clicked
     */
    onCreateButtonClick(): void;
    /**
     * Returns the label for Create button
     */
    getCreateButtonLabel(): Translatable;
    static ɵfac: i0.ɵɵFactoryDeclaration<ListComponent<any, any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ListComponent<any, any>, "cx-org-list", never, { "key": "key"; "hideAddButton": "hideAddButton"; }, {}, never, ["[actions]"], false, never>;
}
