import { CellComponent } from '../cell.component';
import * as i0 from "@angular/core";
export declare class StatusCellComponent extends CellComponent {
    get label(): "organization.enabled" | "organization.disabled" | undefined;
    get isActive(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<StatusCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StatusCellComponent, "cx-org-status-cell", never, {}, {}, never, never, false, never>;
}
