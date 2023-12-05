import { Renderer2, RendererFactory2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { SeoConfig } from '../config';
import * as i0 from "@angular/core";
export declare class JsonLdScriptFactory {
    protected platformId: string;
    protected winRef: WindowRef;
    protected rendererFactory: RendererFactory2;
    protected config: SeoConfig;
    protected renderer: Renderer2;
    constructor(platformId: string, winRef: WindowRef, rendererFactory: RendererFactory2, config: SeoConfig);
    build(schema: {}[]): void;
    /**
     * Indicates whether json ld data should be generated.
     *
     * This is only required on the server, but can be enabled in dev mode.
     */
    isJsonLdRequired(): boolean;
    /**
     * Creates a json-ld script element. The element is created one, and appended
     * to the html body element.
     *
     * ```html
     * <script id="json-ld" type="application/ld+json">
     * </script>
     * ```
     */
    protected getJsonLdScriptElement(): HTMLScriptElement;
    /**
     * Secure the given json-ld schema by encoding html characters (aka escaping), eg: <script> becomes &lt;script&gt;
     *
     * The given schema is not trusted, as malicious code could be injected (XSS)
     * into the json-ld script.
     */
    escapeHtml(schema: {}): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<JsonLdScriptFactory, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JsonLdScriptFactory>;
}
