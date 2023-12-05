import { AfterViewInit, ChangeDetectorRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ConfiguratorShowMoreComponent implements AfterViewInit {
    protected cdRef: ChangeDetectorRef;
    showMore: boolean;
    showHiddenText: boolean;
    textToShow: string;
    textNormalized: string;
    text: string;
    textSize: number;
    productName: string;
    constructor(cdRef: ChangeDetectorRef);
    ngAfterViewInit(): void;
    toggleShowMore(): void;
    protected normalize(text?: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConfiguratorShowMoreComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ConfiguratorShowMoreComponent, "cx-configurator-show-more", never, { "text": "text"; "textSize": "textSize"; "productName": "productName"; }, {}, never, never, false, never>;
}
