import { DatePipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class MockDatePipe extends DatePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockDatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<MockDatePipe, "cxDate", false>;
}
