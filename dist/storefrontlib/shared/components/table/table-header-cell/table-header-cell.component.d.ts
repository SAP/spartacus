import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import { TableFieldOptions, TableHeaderOutletContext } from '../table.model';
import * as i0 from "@angular/core";
export declare class TableHeaderCellComponent {
    protected outlet: OutletContextData<TableHeaderOutletContext>;
    constructor(outlet: OutletContextData<TableHeaderOutletContext>);
    /**
     * Returns the static label for the given field, if available.
     */
    get header(): string | undefined;
    /**
     * Returns the localized label for the given field.
     *
     * The localized label is either driven by the configured `label.i18nKey`
     * or concatenated by the table `type` and field `key`:
     *
     * `[tableType].[fieldKey]`
     *
     * The localized header can be translated with the `cxTranslate` pipe or `TranslationService`.
     */
    get localizedHeader(): string;
    protected get fieldOptions(): TableFieldOptions | undefined;
    protected get field(): string;
    protected get type(): string;
    protected get i18nRoot(): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableHeaderCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableHeaderCellComponent, "cx-table-header-cell", never, {}, {}, never, never, false, never>;
}
