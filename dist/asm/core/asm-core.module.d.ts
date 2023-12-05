import { AsmStatePersistenceService } from './services/asm-state-persistence.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./store/asm-store.module";
export declare function asmStatePersistenceFactory(asmStatePersistenceService: AsmStatePersistenceService): () => void;
export declare class AsmCoreModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCoreModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AsmCoreModule, never, [typeof i1.CommonModule, typeof i2.AsmStoreModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AsmCoreModule>;
}
