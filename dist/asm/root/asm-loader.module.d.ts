import { AsmEnablerService } from './services/asm-enabler.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/storefront";
/**
 * The ASM loader module takes care of loading the ASM UI
 * only in case there's a reason to do so.
 */
export declare class AsmLoaderModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmLoaderModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AsmLoaderModule, never, [typeof i1.CommonModule, typeof i2.PageComponentModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AsmLoaderModule>;
}
/**
 *
 * We do not like to block the UI, which is why we delgate loading of ASM
 * to a real component; the router and state aren't available in an optimized
 * way during the APP_INITIALIZER.
 */
export declare function asmFactory(asmEnablerService: AsmEnablerService): () => void;
