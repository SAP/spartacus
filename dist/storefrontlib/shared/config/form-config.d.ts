import * as i0 from "@angular/core";
export declare abstract class FormConfig {
    form?: {
        passwordVisibilityToggle: boolean;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<FormConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormConfig>;
}
declare module '@spartacus/core' {
    interface Config extends FormConfig {
    }
}
