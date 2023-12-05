import { OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { OutletPosition } from '../outlet.model';
import { OutletService } from '../outlet.service';
import * as i0 from "@angular/core";
export declare class OutletRefDirective implements OnInit, OnDestroy {
    private tpl;
    private outletService;
    cxOutletRef: string;
    cxOutletPos: OutletPosition;
    constructor(tpl: TemplateRef<any>, outletService: OutletService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OutletRefDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<OutletRefDirective, "[cxOutletRef]", never, { "cxOutletRef": "cxOutletRef"; "cxOutletPos": "cxOutletPos"; }, {}, never, never, false, never>;
}
