import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CmsParagraphComponent } from '@spartacus/core';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import * as i0 from "@angular/core";
export declare class ParagraphComponent {
    component: CmsComponentData<CmsParagraphComponent>;
    protected router: Router;
    protected sanitizer: DomSanitizer;
    handleClick(event: Event): void;
    constructor(component: CmsComponentData<CmsParagraphComponent>, router: Router);
    bypassSecurityTrustHtml(html?: string): SafeHtml;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParagraphComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ParagraphComponent, "cx-paragraph", never, {}, {}, never, never, false, never>;
}
