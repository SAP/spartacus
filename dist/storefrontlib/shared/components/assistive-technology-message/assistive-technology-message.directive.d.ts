import { ElementRef, TemplateRef } from '@angular/core';
import { GlobalMessageService } from '@spartacus/core';
import * as i0 from "@angular/core";
export declare class AtMessageDirective {
    protected elementRef: ElementRef<HTMLElement>;
    protected templateRef: TemplateRef<HTMLElement>;
    protected globalMessageService: GlobalMessageService;
    /**
     * Usage [cxAtMessage]="'translatableKey' | cxTranslate"
     */
    cxAtMessage: string | string[] | undefined;
    constructor(elementRef: ElementRef<HTMLElement>, templateRef: TemplateRef<HTMLElement>, globalMessageService: GlobalMessageService);
    protected get host(): HTMLElement;
    /**
     * Emit assistive global meesage to improve screen reader vocalization.
     * @param event
     */
    handleClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AtMessageDirective, [null, { optional: true; }, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AtMessageDirective, "[cxAtMessage]", never, { "cxAtMessage": "cxAtMessage"; }, {}, never, never, false, never>;
}
