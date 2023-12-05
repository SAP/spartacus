import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { MiniCartComponentService } from './mini-cart-component.service';
import * as i0 from "@angular/core";
export declare class MiniCartComponent {
    protected miniCartComponentService: MiniCartComponentService;
    iconTypes: typeof ICON_TYPE;
    quantity$: Observable<number>;
    total$: Observable<string>;
    constructor(miniCartComponentService: MiniCartComponentService);
    static ɵfac: i0.ɵɵFactoryDeclaration<MiniCartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MiniCartComponent, "cx-mini-cart", never, {}, {}, never, never, false, never>;
}
