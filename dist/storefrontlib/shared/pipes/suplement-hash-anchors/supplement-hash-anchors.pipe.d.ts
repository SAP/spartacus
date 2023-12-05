import { PipeTransform, Renderer2 } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class SupplementHashAnchorsPipe implements PipeTransform {
    protected renderer: Renderer2;
    protected winRef: WindowRef;
    constructor(renderer: Renderer2, winRef: WindowRef);
    protected getPath(anchorId: string): string;
    transform(html?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<SupplementHashAnchorsPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<SupplementHashAnchorsPipe, "cxSupplementHashAnchors", false>;
}
