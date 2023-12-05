import { ComponentFactoryResolver, Type } from '@angular/core';
import { OutletService } from '../../../cms-structure/outlet/outlet.service';
import { TableConfig } from './config/table.config';
import { TableDataOutletContext, TableHeaderOutletContext, TableOptions, TableStructure } from './table.model';
import * as i0 from "@angular/core";
/**
 * The table renderer service adds a component for each table cells (th and td)
 * based on a fine grained configuration. Each table type can configure both global
 * components for headers and cells as well as individual components for field
 * specific cells.
 *
 * The components are added to the outlet slots for the corresponding cells. The table
 * structure and data is added to the outlet context.
 */
export declare class TableRendererService {
    protected outletService: OutletService;
    protected componentFactoryResolver: ComponentFactoryResolver;
    protected config: TableConfig;
    protected outletRefs: Map<any, any>;
    constructor(outletService: OutletService, componentFactoryResolver: ComponentFactoryResolver, config: TableConfig);
    /**
     * Adds the configured table component for the header and data.
     */
    add(structure: TableStructure): void;
    protected render(outletRef: string, renderer: Type<any>): void;
    /**
     * Returns the header render component for the given field.
     */
    protected getHeaderRenderer(structure: TableStructure, field: string): Type<any> | undefined;
    /**
     * Returns the data render component for the given field.
     */
    protected getDataRenderer(structure: TableStructure, field: string): Type<any> | undefined;
    /**
     * Returns the header (th) outlet reference for the given field.
     *
     * The outlet reference is generated as:
     * `table.[tableType].header.[field]`
     */
    getHeaderOutletRef(type: string, field: string): string;
    /**
     * Returns the header (th) outlet context for the given field.
     */
    getHeaderOutletContext(type: string, options: TableOptions | undefined, i18nRoot: string, field: string): TableHeaderOutletContext;
    /**
     * Returns the data (td) outlet reference for the given field.
     *
     * The field is generated as:
     * `table.[tableType].data.[tableField]`
     */
    getDataOutletRef(type: string, field: string): string;
    /**
     * Returns the data (td) outlet context for the given field.
     */
    getDataOutletContext(type: string, options: TableOptions | undefined, i18nRoot: string, field: string, data: any): TableDataOutletContext;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableRendererService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<TableRendererService>;
}
