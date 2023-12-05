import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class HamburgerMenuService {
    isExpanded: BehaviorSubject<boolean>;
    constructor(router: Router);
    /**
     * toggles the expand state of the hamburger menu
     */
    toggle(forceCollapse?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<HamburgerMenuService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HamburgerMenuService>;
}
