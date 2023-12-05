import { ElementRef, Renderer2 } from '@angular/core';
import { JsonLdScriptFactory } from './json-ld-script.factory';
import * as i0 from "@angular/core";
/**
 * Low level directive that adds a json-ld script tag to the component.
 * This code bypasses the strict XSS security, as otherwise we're not able
 * to append a script tag with JS inside.
 *
 * This helper directive is actually not used in Spartacus, as Spartacus
 * appends json-ld the data to the document body.
 *
 * This directive can however be used by merchants to write static schema data
 * to the DOM in a save way.
 */
export declare class JsonLdDirective {
    protected renderer: Renderer2;
    protected jsonLdScriptFactory: JsonLdScriptFactory;
    protected element: ElementRef;
    /**
     * Writes the schema data to a json-ld script element.
     */
    set cxJsonLd(schema: string | {});
    constructor(renderer: Renderer2, jsonLdScriptFactory: JsonLdScriptFactory, element: ElementRef);
    /**
     * attach the json-ld script tag to DOM with the schema data secured by encoding html tags (aka escaping)
     */
    protected generateJsonLdScript(schema: string | {}): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<JsonLdDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<JsonLdDirective, "[cxJsonLd]", never, { "cxJsonLd": "cxJsonLd"; }, {}, never, never, false, never>;
}
