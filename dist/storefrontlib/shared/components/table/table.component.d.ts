import { EventEmitter } from '@angular/core';
import { TableRendererService } from './table-renderer.service';
import { TableDataOutletContext, TableHeaderOutletContext, TableStructure } from './table.model';
import * as i0 from "@angular/core";
/**
 * The table component provides a generic table DOM structure, with 3 layout types:
 * horizontal, vertical and _stacked vertical_ layout. The layout is driven by the
 * table structure.
 *
 * The implementation is fairly "dumb" and only renders string based content for TH
 * and TD elements. The actual cell rendering is delegated to a (configurable) cell
 * component. Additionally, each cell is registered as an outlet, so that customizations
 * can be done by both outlet templates and components.
 *
 * The outlet references are concatenated from the table `type` and header `key`. The
 * following snippet shows an outlet generated for a table header, for the table type
 * "cost-center" with a header key "name":
 *
 * ```
 * <th>
 *   <template cxOutlet="table.cost-center.header.name">
 *   </template>
 * </th>
 * ```
 *
 * Similarly, the data cells (`<td>`) are generated with the outlet template reference
 * `table.cost-center.data.name`.
 */
export declare class TableComponent<T> {
    protected rendererService: TableRendererService;
    tableType: string;
    horizontalLayout: boolean;
    verticalLayout: boolean;
    verticalStackedLayout: boolean;
    private _structure;
    set structure(structure: TableStructure);
    get structure(): TableStructure;
    data: T[];
    /**
     * The i18nRoot is passed into the table cell context, so that
     * cell components can concatenate the i18n root and label.
     */
    i18nRoot: string;
    /**
     * Provides a mechanism to compare a matching value for each item.
     *
     * The `property` refers to the dataset.value property, and the value tot the
     * matching property value.
     */
    currentItem: {
        value: any;
        property: string;
    };
    launch: EventEmitter<any>;
    constructor(rendererService: TableRendererService);
    init(): void;
    launchItem(item: any): void;
    /**
     * Indicates whether the given item is the current item.
     *
     * The current item is driven by the `currentItem`, that holds a
     * property and value to compare.
     */
    isCurrentItem(item: any): boolean;
    /**
     * Returns the header (th) outlet reference for the given field.
     */
    getHeaderOutletRef(field: string): string;
    /**
     * Returns the header (th) outlet context for the given field.
     */
    getHeaderOutletContext(field: string): TableHeaderOutletContext;
    /**
     * Returns the data (td) outlet reference for the given field.
     */
    getDataOutletRef(field: string): string;
    /**
     * Returns the data (td) outlet context for the given field.
     */
    getDataOutletContext(field: string, data: any): TableDataOutletContext;
    trackData(_i: number, item: any): any;
    /**
     * Generates the table type into the UI in devMode, so that developers
     * can easily get the notion of the table type.
     */
    protected addTableDebugInfo(): void;
    /**
     * Helper method to return the deeply nested orientation configuration.
     */
    private get layout();
    /**
     * Helper method to return the deeply nested type.
     */
    private get type();
    private get options();
    static ɵfac: i0.ɵɵFactoryDeclaration<TableComponent<any>, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableComponent<any>, "cx-table", never, { "structure": "structure"; "data": "data"; "i18nRoot": "i18nRoot"; "currentItem": "currentItem"; }, { "launch": "launch"; }, never, never, false, never>;
}
