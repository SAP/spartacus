import { EventEmitter, OnDestroy, Type } from '@angular/core';
import { AsmCustomer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { UrlCommand, User } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { AsmCustomer360SectionContextSource } from '../asm-customer-360-section-context-source.model';
import * as i0 from "@angular/core";
export declare class AsmCustomer360SectionComponent implements OnDestroy {
    protected source: AsmCustomer360SectionContextSource<unknown>;
    component: Type<unknown>;
    set customer(customer: User);
    set config(config: AsmCustomer360SectionConfig);
    set data(data: Observable<unknown>);
    navigate: EventEmitter<UrlCommand>;
    protected subscription: Subscription;
    constructor(source: AsmCustomer360SectionContextSource<unknown>);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AsmCustomer360SectionComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AsmCustomer360SectionComponent, "cx-asm-customer-360-section", never, { "component": "component"; "customer": "customer"; "config": "config"; "data": "data"; }, { "navigate": "navigate"; }, never, never, false, never>;
}
