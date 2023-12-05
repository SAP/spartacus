import { AnonymousConsentsStatePersistenceService } from '../services/anonymous-consents-state-persistence.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../state/state.module";
import * as i3 from "@ngrx/store";
import * as i4 from "@ngrx/effects";
export declare function anonymousConsentsStatePersistenceFactory(anonymousConsentsStatePersistenceService: AnonymousConsentsStatePersistenceService): () => void;
export declare class AnonymousConsentsStoreModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<AnonymousConsentsStoreModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<AnonymousConsentsStoreModule, never, [typeof i1.CommonModule, typeof i2.StateModule, typeof i3.StoreFeatureModule, typeof i4.EffectsFeatureModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<AnonymousConsentsStoreModule>;
}
