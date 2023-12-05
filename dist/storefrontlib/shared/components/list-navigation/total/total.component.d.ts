import { PaginationModel } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class TotalComponent {
    private _pagination;
    get pagination(): PaginationModel;
    set pagination(paginationModel: PaginationModel | undefined);
    /**
     * Current page, starting form page 0
     * */
    get currentPage(): number;
    get pageSize(): number;
    get totalResults(): number;
    get fromItem(): number;
    get toItem(): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<TotalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TotalComponent, "cx-total", never, { "pagination": "pagination"; }, {}, never, never, false, never>;
}
