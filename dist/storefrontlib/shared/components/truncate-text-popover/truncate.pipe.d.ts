import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
export declare class TruncatePipe implements PipeTransform {
    /**
     * example usage {{ exampleString | cxTruncate: [1, ''] }}
     */
    transform(value: string, args?: [number, string?]): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<TruncatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TruncatePipe, "cxTruncate", false>;
}
