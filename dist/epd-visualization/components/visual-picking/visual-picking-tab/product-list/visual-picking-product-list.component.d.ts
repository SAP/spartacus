import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VisualPickingProductListItem } from './model/visual-picking-product-list-item.model';
import { VisualPickingProductListService } from './visual-picking-product-list.service';
import * as i0 from "@angular/core";
export declare class VisualPickingProductListComponent implements OnInit {
    protected visualPickingProductListService: VisualPickingProductListService;
    constructor(visualPickingProductListService: VisualPickingProductListService);
    title: string;
    singleSelection: boolean;
    set selectedProductCodes(selectedProductCodes: string[]);
    get selectedProductCodes(): string[];
    selectedProductCodesChange: import("@angular/core").EventEmitter<string[]>;
    get itemsPerSlide(): number;
    set itemsPerSlide(itemsPerSlide: number);
    get activeSlideStartIndex(): number;
    set activeSlideStartIndex(activeSlideStartIndex: number);
    get filteredItems$(): Observable<VisualPickingProductListItem[]>;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<VisualPickingProductListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<VisualPickingProductListComponent, "cx-epd-visualization-product-list", never, { "title": "title"; "singleSelection": "singleSelection"; "selectedProductCodes": "selectedProductCodes"; }, { "selectedProductCodesChange": "selectedProductCodesChange"; }, never, never, false, never>;
}
