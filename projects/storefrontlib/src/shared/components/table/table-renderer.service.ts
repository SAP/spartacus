import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { OutletService } from '../../../cms-structure/outlet/outlet.service';
import { Table } from './table.model';

@Injectable({
  providedIn: 'root',
})
export class TableRendererService {
  // keep a list of outletRefs to avoid recreation
  protected outletRefs = new Map();

  constructor(
    protected outletService: OutletService,
    protected componentFactoryResolver: ComponentFactoryResolver
  ) {}

  add(dataset: Table) {
    dataset.structure.fields.forEach((field) => {
      if (!!dataset.structure.options.fields?.[field]?.dataRenderer) {
        const ref = this.getDataOutletRef(dataset.structure.type, field);
        if (this.outletRefs.has(ref)) {
          return;
        }
        this.outletRefs.set(ref, true);
        const template = this.componentFactoryResolver.resolveComponentFactory(
          dataset.structure.options.fields[field].dataRenderer
        );
        this.outletService.add(ref, <any>template);
      }
    });
  }

  /**
   * Returns the data (td) outlet reference for the given field.
   *
   * The field is generated as:
   * `table.[tableType].data.[tableField]`
   */
  getDataOutletRef(type, field: string): string {
    return `table.${type}.data.${field}`;
  }
}
