import { ComponentFactoryResolver } from '@angular/core';
import { OutletService } from '../../../cms-structure/outlet/outlet.service';
import * as i0 from "@angular/core";
import * as i1 from "./component/skip-link.component";
import * as i2 from "./directive/skip-link.directive";
import * as i3 from "@angular/common";
import * as i4 from "@spartacus/core";
import * as i5 from "../keyboard-focus/keyboard-focus.module";
export declare class SkipLinkModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<SkipLinkModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<SkipLinkModule, [typeof i1.SkipLinkComponent, typeof i2.SkipLinkDirective], [typeof i3.CommonModule, typeof i4.I18nModule, typeof i4.ConfigModule, typeof i5.KeyboardFocusModule], [typeof i2.SkipLinkDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<SkipLinkModule>;
}
/**
 * Adds the skip link component before the cx-storefront.
 */
export declare function skipLinkFactory(componentFactoryResolver: ComponentFactoryResolver, outletService: OutletService): () => void;
