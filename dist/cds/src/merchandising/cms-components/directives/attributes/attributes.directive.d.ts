import { ElementRef, OnChanges, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AttributesDirective implements OnChanges {
    private renderer;
    private elementRef;
    cxAttributes: {
        [attribute: string]: any;
    };
    private _attributesNamePrefix;
    set cxAttributesNamePrefix(attributesNamePrefix: string);
    constructor(renderer: Renderer2, elementRef: ElementRef);
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AttributesDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AttributesDirective, "[cxAttributes]", never, { "cxAttributes": "cxAttributes"; "cxAttributesNamePrefix": "cxAttributesNamePrefix"; }, {}, never, never, false, never>;
}
