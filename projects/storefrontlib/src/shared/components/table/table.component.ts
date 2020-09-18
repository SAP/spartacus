import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  isDevMode,
  Output,
} from '@angular/core';
import { TableRendererService } from './table-renderer.service';
import {
  Table,
  TableDataOutletContext,
  TableHeaderOutletContext,
  TableLayout,
} from './table.model';

/**
 * The table component provides a generic DOM structure based on the `dataset` input.
 * The `Table` dataset contains a type, table structure and table data.
 *
 * The table component only supports horizontal, vertical and stacked table layout.
 *
 * The implementation is fairly "dumb" and only renders string based content for TH and TD elements.
 * The actual cell rendering is delegated to a (configurable) cell component. Additionally, each cell
 * is registered as an outlet, so that customizations can be done by both outlet templates
 * and components.
 *
 * The outlet references are concatenated from the table `type` and header `key`. The following
 * snippet shows an outlet generated for a table header, for the table type "cost-center" with
 * a header key "name":
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
@Component({
  selector: 'cx-table',
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  @HostBinding('attr.__cx-table-type') tableType: string;
  @HostBinding('class.horizontal') horizontalLayout: boolean;
  @HostBinding('class.vertical') verticalLayout: boolean;
  @HostBinding('class.vertical-stacked') verticalStackedLayout: boolean;

  private _dataset: Table;
  @Input() set dataset(value) {
    this._dataset = value;
    this.init(value);
  }
  get dataset(): Table {
    return this._dataset;
  }

  /**
   * Provides a mechanism to compare a matching value for each item.
   *
   * The `property` refers to the dataset.value property, and the value tot the
   * matching property value.
   */
  @Input() currentItem: { value: any; property: string };

  @Output() launch = new EventEmitter();

  constructor(protected rendererService: TableRendererService) {}

  init(dataset: Table) {
    this.verticalLayout = !this.layout || this.layout === TableLayout.VERTICAL;
    this.verticalStackedLayout = this.layout === TableLayout.VERTICAL_STACKED;
    this.horizontalLayout = this.layout === TableLayout.HORIZONTAL;

    this.rendererService.add(dataset);

    this.addTableDebugInfo();
  }

  launchItem(item: any): void {
    this.launch.emit(item);
  }

  /**
   * Indicates whether the given item is the current item.
   *
   * The current item is driven by the `currentItem`, that holds a
   * property and value to compare.
   */
  isCurrentItem(item: any): boolean {
    if (!this.currentItem || !this.currentItem.value) {
      return;
    }
    return this.currentItem?.value === item?.[this.currentItem?.property];
  }

  /**
   * Returns the header (th) outlet reference for the given field.
   */
  getHeaderOutletRef(field: string): string {
    return this.rendererService.getHeaderOutletRef(this.type, field);
  }

  /**
   * Returns the header (th) outlet context for the given field.
   */
  getHeaderOutletContext(field: string): TableHeaderOutletContext {
    return this.rendererService.getHeaderOutletContext(
      this.type,
      this.options,
      field
    );
  }

  /**
   * Returns the data (td) outlet reference for the given field.
   */
  getDataOutletRef(field: string): string {
    return this.rendererService.getDataOutletRef(this.type, field);
  }

  /**
   * Returns the data (td) outlet context for the given field.
   */
  getDataOutletContext(field: string, data: any): TableDataOutletContext {
    return this.rendererService.getDataOutletContext(
      this.type,
      this.options,
      field,
      data
    );
  }

  trackData(_i: number, item: any): any {
    return JSON.stringify(item);
  }

  /**
   * Generates the table type into the UI in devMode, so that developers
   * can easily get the notion of the table type.
   */
  protected addTableDebugInfo() {
    if (isDevMode() && this.type) {
      this.tableType = this.type;
    }
  }

  /**
   * Helper method to return the deeply nested orientation configuration.
   */
  private get layout() {
    return this.dataset?.structure?.options?.layout;
  }

  /**
   * Helper method to return the deeply nested type.
   */
  private get type() {
    return this.dataset?.structure?.type;
  }

  private get options() {
    return this.dataset?.structure?.options;
  }
}
