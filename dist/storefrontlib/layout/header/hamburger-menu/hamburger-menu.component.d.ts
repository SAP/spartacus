import { Observable } from 'rxjs';
import { HamburgerMenuService } from './hamburger-menu.service';
import * as i0 from "@angular/core";
export declare class HamburgerMenuComponent {
    private hamburgerMenuService;
    constructor(hamburgerMenuService: HamburgerMenuService);
    toggle(): void;
    get isExpanded(): Observable<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HamburgerMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<HamburgerMenuComponent, "cx-hamburger-menu", never, {}, {}, never, never, false, never>;
}
