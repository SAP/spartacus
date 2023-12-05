import { EntitiesModel } from '@spartacus/core';
import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { ResponsiveTableConfiguration } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ListService } from '../list/list.service';
import { BaseItem } from '../organization.model';
import * as i0 from "@angular/core";
export declare abstract class SubListService<T extends BaseItem> extends ListService<T> {
    /**
     * The default table structure for sub lists is only showing tables with vertical layout.
     */
    protected defaultTableStructure: ResponsiveTableConfiguration;
    /**
     * @override This sub list will show 3 items.
     */
    protected ghostData: EntitiesModel<T>;
    assign?(_key: string, ..._args: any): Observable<OrganizationItemStatus<T>>;
    unassign?(_key: string, ..._args: any): Observable<OrganizationItemStatus<T>>;
    /**
     * As we can't filter with the backend API, we do this client side.
     */
    protected filterSelected(list: EntitiesModel<T> | undefined): EntitiesModel<T> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<SubListService<any>, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SubListService<any>>;
}
