import { OrganizationItemStatus } from '@spartacus/organization/administration/core';
import { OutletContextData, TableDataOutletContext } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../item.service';
import { ListService } from '../list/list.service';
import { MessageService } from '../message/services/message.service';
import { BaseItem } from '../organization.model';
import { CellComponent } from '../table/cell.component';
import * as i0 from "@angular/core";
export declare class AssignCellComponent<T extends BaseItem> extends CellComponent {
    protected outlet: OutletContextData<TableDataOutletContext>;
    protected organizationItemService: ItemService<T>;
    protected messageService: MessageService;
    protected organizationSubListService: ListService<T>;
    constructor(outlet: OutletContextData<TableDataOutletContext>, organizationItemService: ItemService<T>, messageService: MessageService, organizationSubListService: ListService<T>);
    get isAssigned(): boolean;
    toggleAssign(): void;
    protected assign(key: string, linkKey: string): Observable<OrganizationItemStatus<T>>;
    protected unassign(key: string, linkKey: string): Observable<OrganizationItemStatus<T>>;
    /**
     * Returns the key for the linked object.
     *
     * At the moment, we're using a generic approach to assign objects,
     * but the object do not have a normalized shape. Therefor, we need
     * to evaluate the context to return the right key for the associated
     * item.
     */
    protected get link(): string;
    protected notify(item: any, state: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AssignCellComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AssignCellComponent<any>, "cx-org-assign-cell", never, {}, {}, never, never, false, never>;
}
