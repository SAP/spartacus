/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./json-ld-script.factory";
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
export class JsonLdDirective {
    /**
     * Writes the schema data to a json-ld script element.
     */
    set cxJsonLd(schema) {
        this.generateJsonLdScript(schema);
    }
    constructor(renderer, jsonLdScriptFactory, element) {
        this.renderer = renderer;
        this.jsonLdScriptFactory = jsonLdScriptFactory;
        this.element = element;
    }
    /**
     * attach the json-ld script tag to DOM with the schema data secured by encoding html tags (aka escaping)
     */
    generateJsonLdScript(schema) {
        if (schema && this.jsonLdScriptFactory.isJsonLdRequired()) {
            const script = this.renderer.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = this.jsonLdScriptFactory.escapeHtml(schema);
            this.renderer.appendChild(this.element.nativeElement, script);
        }
    }
}
JsonLdDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdDirective, deps: [{ token: i0.Renderer2 }, { token: i1.JsonLdScriptFactory }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
JsonLdDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.2.9", type: JsonLdDirective, selector: "[cxJsonLd]", inputs: { cxJsonLd: "cxJsonLd" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: JsonLdDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[cxJsonLd]',
                }]
        }], ctorParameters: function () { return [{ type: i0.Renderer2 }, { type: i1.JsonLdScriptFactory }, { type: i0.ElementRef }]; }, propDecorators: { cxJsonLd: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1sZC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2Ntcy1zdHJ1Y3R1cmUvc2VvL3N0cnVjdHVyZWQtZGF0YS9qc29uLWxkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFNBQVMsRUFBYyxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7OztBQUd4RTs7Ozs7Ozs7OztHQVVHO0FBSUgsTUFBTSxPQUFPLGVBQWU7SUFDMUI7O09BRUc7SUFDSCxJQUFhLFFBQVEsQ0FBQyxNQUFtQjtRQUN2QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELFlBQ1ksUUFBbUIsRUFDbkIsbUJBQXdDLEVBQ3hDLE9BQW1CO1FBRm5CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFxQjtRQUN4QyxZQUFPLEdBQVAsT0FBTyxDQUFZO0lBQzVCLENBQUM7SUFFSjs7T0FFRztJQUNPLG9CQUFvQixDQUFDLE1BQW1CO1FBQ2hELElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO1lBQ3pELE1BQU0sTUFBTSxHQUFzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN4RSxNQUFNLENBQUMsSUFBSSxHQUFHLHFCQUFxQixDQUFDO1lBQ3BDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMvRDtJQUNILENBQUM7OzRHQXhCVSxlQUFlO2dHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsWUFBWTtpQkFDdkI7MkpBS2MsUUFBUTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSnNvbkxkU2NyaXB0RmFjdG9yeSB9IGZyb20gJy4vanNvbi1sZC1zY3JpcHQuZmFjdG9yeSc7XG5cbi8qKlxuICogTG93IGxldmVsIGRpcmVjdGl2ZSB0aGF0IGFkZHMgYSBqc29uLWxkIHNjcmlwdCB0YWcgdG8gdGhlIGNvbXBvbmVudC5cbiAqIFRoaXMgY29kZSBieXBhc3NlcyB0aGUgc3RyaWN0IFhTUyBzZWN1cml0eSwgYXMgb3RoZXJ3aXNlIHdlJ3JlIG5vdCBhYmxlXG4gKiB0byBhcHBlbmQgYSBzY3JpcHQgdGFnIHdpdGggSlMgaW5zaWRlLlxuICpcbiAqIFRoaXMgaGVscGVyIGRpcmVjdGl2ZSBpcyBhY3R1YWxseSBub3QgdXNlZCBpbiBTcGFydGFjdXMsIGFzIFNwYXJ0YWN1c1xuICogYXBwZW5kcyBqc29uLWxkIHRoZSBkYXRhIHRvIHRoZSBkb2N1bWVudCBib2R5LlxuICpcbiAqIFRoaXMgZGlyZWN0aXZlIGNhbiBob3dldmVyIGJlIHVzZWQgYnkgbWVyY2hhbnRzIHRvIHdyaXRlIHN0YXRpYyBzY2hlbWEgZGF0YVxuICogdG8gdGhlIERPTSBpbiBhIHNhdmUgd2F5LlxuICovXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbY3hKc29uTGRdJyxcbn0pXG5leHBvcnQgY2xhc3MgSnNvbkxkRGlyZWN0aXZlIHtcbiAgLyoqXG4gICAqIFdyaXRlcyB0aGUgc2NoZW1hIGRhdGEgdG8gYSBqc29uLWxkIHNjcmlwdCBlbGVtZW50LlxuICAgKi9cbiAgQElucHV0KCkgc2V0IGN4SnNvbkxkKHNjaGVtYTogc3RyaW5nIHwge30pIHtcbiAgICB0aGlzLmdlbmVyYXRlSnNvbkxkU2NyaXB0KHNjaGVtYSk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcm90ZWN0ZWQganNvbkxkU2NyaXB0RmFjdG9yeTogSnNvbkxkU2NyaXB0RmFjdG9yeSxcbiAgICBwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZlxuICApIHt9XG5cbiAgLyoqXG4gICAqIGF0dGFjaCB0aGUganNvbi1sZCBzY3JpcHQgdGFnIHRvIERPTSB3aXRoIHRoZSBzY2hlbWEgZGF0YSBzZWN1cmVkIGJ5IGVuY29kaW5nIGh0bWwgdGFncyAoYWthIGVzY2FwaW5nKVxuICAgKi9cbiAgcHJvdGVjdGVkIGdlbmVyYXRlSnNvbkxkU2NyaXB0KHNjaGVtYTogc3RyaW5nIHwge30pOiB2b2lkIHtcbiAgICBpZiAoc2NoZW1hICYmIHRoaXMuanNvbkxkU2NyaXB0RmFjdG9yeS5pc0pzb25MZFJlcXVpcmVkKCkpIHtcbiAgICAgIGNvbnN0IHNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgc2NyaXB0LnR5cGUgPSAnYXBwbGljYXRpb24vbGQranNvbic7XG4gICAgICBzY3JpcHQudGV4dENvbnRlbnQgPSB0aGlzLmpzb25MZFNjcmlwdEZhY3RvcnkuZXNjYXBlSHRtbChzY2hlbWEpO1xuICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgc2NyaXB0KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==