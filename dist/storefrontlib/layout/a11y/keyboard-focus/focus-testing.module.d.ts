import { FocusConfig } from './keyboard-focus.model';
import * as i0 from "@angular/core";
export declare class MockKeyboardFocusDirective {
    config: FocusConfig;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockKeyboardFocusDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<MockKeyboardFocusDirective, "[cxFocus]", never, { "config": "cxFocus"; }, {}, never, never, false, never>;
}
export declare class KeyboardFocusTestingModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<KeyboardFocusTestingModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<KeyboardFocusTestingModule, [typeof MockKeyboardFocusDirective], never, [typeof MockKeyboardFocusDirective]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<KeyboardFocusTestingModule>;
}
