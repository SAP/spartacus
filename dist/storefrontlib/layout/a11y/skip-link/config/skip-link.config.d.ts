import * as i0 from "@angular/core";
export declare abstract class SkipLinkConfig {
    skipLinks?: SkipLink[];
    static ɵfac: i0.ɵɵFactoryDeclaration<SkipLinkConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SkipLinkConfig>;
}
export declare abstract class SkipLink {
    key: string;
    i18nKey: string;
    target?: HTMLElement;
    position?: SkipLinkScrollPosition;
}
export declare enum SkipLinkScrollPosition {
    BEFORE = "BEFORE",
    AFTER = "AFTER"
}
declare module '@spartacus/core' {
    interface Config extends SkipLinkConfig {
    }
}
