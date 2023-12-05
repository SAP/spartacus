import { ElementRef, OnDestroy, OnInit } from '@angular/core';
import { SkipLinkService } from '../service/skip-link.service';
import * as i0 from "@angular/core";
export declare class SkipLinkDirective implements OnInit, OnDestroy {
    protected elementRef: ElementRef<HTMLElement>;
    protected skipLinkService: SkipLinkService;
    cxSkipLink: string;
    constructor(elementRef: ElementRef<HTMLElement>, skipLinkService: SkipLinkService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SkipLinkDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<SkipLinkDirective, "[cxSkipLink]", never, { "cxSkipLink": "cxSkipLink"; }, {}, never, never, false, never>;
}
