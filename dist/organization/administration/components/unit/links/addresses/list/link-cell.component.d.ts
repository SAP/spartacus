import { B2BUnit } from '@spartacus/core';
import { OutletContextData, TableDataOutletContext } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { ItemService } from '../../../../shared/item.service';
import { CellComponent } from '../../../../shared/table/cell.component';
import * as i0 from "@angular/core";
export declare class LinkCellComponent extends CellComponent {
    protected outlet: OutletContextData<TableDataOutletContext>;
    protected itemService: ItemService<B2BUnit>;
    unitKey$: Observable<string>;
    constructor(outlet: OutletContextData<TableDataOutletContext>, itemService: ItemService<B2BUnit>);
    get tabIndex(): number;
    getRouterModel(uid: string): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<LinkCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LinkCellComponent, "cx-org-link-cell", never, {}, {}, never, never, false, never>;
}
