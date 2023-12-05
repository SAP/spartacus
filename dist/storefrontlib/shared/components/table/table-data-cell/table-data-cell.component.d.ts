import { OutletContextData } from '../../../../cms-structure/outlet/outlet.model';
import { TableHeaderOutletContext } from '../table.model';
import * as i0 from "@angular/core";
export declare class TableDataCellComponent {
    protected outlet: OutletContextData<TableHeaderOutletContext>;
    constructor(outlet: OutletContextData<TableHeaderOutletContext>);
    get value(): string;
    protected get model(): any;
    protected get field(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TableDataCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TableDataCellComponent, "cx-table-data-cell", never, {}, {}, never, never, false, never>;
}
