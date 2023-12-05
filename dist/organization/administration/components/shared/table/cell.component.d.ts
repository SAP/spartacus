import { OutletContextData, TableDataOutletContext, TableFieldOptions } from '@spartacus/storefront';
import * as i0 from "@angular/core";
export declare class CellComponent {
    protected outlet: OutletContextData<TableDataOutletContext>;
    constructor(outlet: OutletContextData<TableDataOutletContext>);
    get tabIndex(): number;
    get model(): TableDataOutletContext;
    get property(): string | undefined;
    /**
     * Indicates wether the cell is linkable.
     *
     * If the cells is linkable, an anchor link is created to the detailed route
     * of the given `_type`.
     *
     * Defaults to `true`.
     */
    get linkable(): boolean;
    /**
     * Helper method to access the cell options.
     */
    get cellOptions(): TableFieldOptions;
    /**
     * Generates the configurable route to the detail page of the given context item.
     */
    get route(): string;
    get routeModel(): any;
    get type(): string;
    /**
     * Indicates whether the item is loaded.
     */
    get hasItem(): boolean;
    protected get item(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CellComponent, "cx-org-cell", never, {}, {}, never, never, false, never>;
}
