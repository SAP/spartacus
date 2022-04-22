import { ComponentFactoryResolver, Injectable, Type } from '@angular/core';
import { OutletService } from '../../../cms-structure/outlet/outlet.service';
import { TableConfig } from './config/table.config';
import {
  TableDataOutletContext,
  TableHeaderOutletContext,
  TableOptions,
  TableStructure,
} from './table.model';

/**
 * The table renderer service adds a component for each table cells (th and td)
 * based on a fine grained configuration. Each table type can configure both global
 * components for headers and cells as well as individual components for field
 * specific cells.
 *
 * The components are added to the outlet slots for the corresponding cells. The table
 * structure and data is added to the outlet context.
 */
@Injectable({
  providedIn: 'root',
})
export class TableRendererService {
  // keep a list of outletRefs to avoid recreation
  protected outletRefs = new Map();

  constructor(
    protected outletService: OutletService,
    protected componentFactoryResolver: ComponentFactoryResolver,
    protected config: TableConfig
  ) {}

  /**
   * Adds the configured table component for the header and data.
   */
  add(structure: TableStructure): void {
    structure?.cells?.forEach((field) => {
      const thRenderer = this.getHeaderRenderer(structure, field);
      if (thRenderer) {
        const ref = this.getHeaderOutletRef(structure.type, field);
        this.render(ref, thRenderer);
      }
      const tdRenderer = this.getDataRenderer(structure, field);
      if (tdRenderer) {
        const ref = this.getDataOutletRef(structure.type, field);
        this.render(ref, tdRenderer);
      }
    });
  }

  protected render(outletRef: string, renderer: Type<any>) {
    if (this.outletRefs.has(outletRef)) {
      return;
    }
    this.outletRefs.set(outletRef, true);
    const template =
      this.componentFactoryResolver.resolveComponentFactory(renderer);
    this.outletService.add(outletRef, <any>template);
  }

  /**
   * Returns the header render component for the given field.
   */
  protected getHeaderRenderer(
    structure: TableStructure,
    field: string
  ): Type<any> {
    return (
      structure.options?.cells?.[field]?.headerComponent ||
      structure.options?.headerComponent ||
      this.config.tableOptions?.headerComponent
    );
  }

  /**
   * Returns the data render component for the given field.
   */
  protected getDataRenderer(
    structure: TableStructure,
    field: string
  ): Type<any> {
    return (
      structure.options?.cells?.[field]?.dataComponent ||
      structure.options?.dataComponent ||
      this.config.tableOptions?.dataComponent
    );
  }

  /**
   * Returns the header (th) outlet reference for the given field.
   *
   * The outlet reference is generated as:
   * `table.[tableType].header.[field]`
   */
  getHeaderOutletRef(type: string, field: string): string {
    return `table.${type}.header.${field}`;
  }

  /**
   * Returns the header (th) outlet context for the given field.
   */
  getHeaderOutletContext(
    type: string,
    options: TableOptions,
    i18nRoot: string,
    field: string
  ): TableHeaderOutletContext {
    return {
      _type: type,
      _options: options,
      _field: field,
      _i18nRoot: i18nRoot,
    };
  }

  /**
   * Returns the data (td) outlet reference for the given field.
   *
   * The field is generated as:
   * `table.[tableType].data.[tableField]`
   */
  getDataOutletRef(type: string, field: string): string {
    return `table.${type}.data.${field}`;
  }

  /**
   * Returns the data (td) outlet context for the given field.
   */
  getDataOutletContext(
    type: string,
    options: TableOptions,
    i18nRoot: string,
    field: string,
    data: any
  ): TableDataOutletContext {
    return {
      ...data,
      _type: type,
      _options: options,
      _field: field,
      _i18nRoot: i18nRoot,
    };
  }
}
