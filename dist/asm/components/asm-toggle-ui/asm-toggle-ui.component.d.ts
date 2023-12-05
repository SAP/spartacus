import { OnDestroy, OnInit } from '@angular/core';
import { AsmService } from '@spartacus/asm/core';
import { Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AsmToggleUiComponent implements OnInit, OnDestroy {
    protected asmService: AsmService;
    protected subscription: Subscription;
    isCollapsed: boolean;
    constructor(asmService: AsmService);
    ngOnInit(): void;
    toggleUi(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmToggleUiComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmToggleUiComponent, "cx-asm-toggle-ui", never, {}, {}, never, never, false, never>;
}
