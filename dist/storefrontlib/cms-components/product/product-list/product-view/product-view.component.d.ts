import { EventEmitter } from '@angular/core';
import { ICON_TYPE } from '../../../misc/icon/icon.model';
import * as i0 from "@angular/core";
export declare enum ViewModes {
    Grid = "grid",
    List = "list"
}
export declare class ProductViewComponent {
    iconTypes: typeof ICON_TYPE;
    mode: ViewModes;
    modeChange: EventEmitter<ViewModes>;
    get buttonClass(): string;
    /**
     *   Display icons inversely to allow users
     *   to see the view they will navigate to
     */
    get viewMode(): ICON_TYPE.GRID | ICON_TYPE.LIST;
    changeMode(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ProductViewComponent, "cx-product-view", never, { "mode": "mode"; }, { "modeChange": "modeChange"; }, never, never, false, never>;
}
