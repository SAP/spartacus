import { B2BUnit } from '@spartacus/core';
import { OutletContextData, TableDataOutletContext } from '@spartacus/storefront';
import { CellComponent } from '../../../shared/table/cell.component';
import { UnitTreeService } from '../../services/unit-tree.service';
import * as i0 from "@angular/core";
export declare class ToggleLinkCellComponent extends CellComponent {
    protected outlet: OutletContextData<TableDataOutletContext>;
    protected unitTreeService: UnitTreeService;
    get depthLevel(): any;
    constructor(outlet: OutletContextData<TableDataOutletContext>, unitTreeService: UnitTreeService);
    get combinedName(): string;
    get tabIndex(): number;
    get expanded(): any;
    /**
     * Counts the number of descendants
     */
    get count(): any;
    toggleItem(event: Event): void;
    /**
     * Indicates whether the tree item should have a toggle navigation.
     *
     * The toggle navigation is used in case the tree item has descendants,
     * and if the tree item level is not configured to be shown anyway.
     */
    get isSwitchable(): boolean;
    get hasItem(): boolean;
    protected get item(): B2BUnit | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<ToggleLinkCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ToggleLinkCellComponent, "cx-org-toggle-link-cell", never, {}, {}, never, never, false, never>;
}
