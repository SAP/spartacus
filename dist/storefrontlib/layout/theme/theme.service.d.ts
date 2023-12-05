import { ComponentRef, Renderer2, RendererFactory2 } from '@angular/core';
import { SiteContextConfig } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class ThemeService {
    protected config: SiteContextConfig;
    protected rendererFactory: RendererFactory2;
    protected rootComponent: ComponentRef<any>;
    protected renderer: Renderer2;
    protected existingTheme: string;
    constructor(config: SiteContextConfig, rendererFactory: RendererFactory2);
    /**
     * This function is to be called for the root component that is
     * bootstrapped.
     */
    init(rootComponent: ComponentRef<any>): void;
    setTheme(theme: string | undefined): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ThemeService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ThemeService>;
}
