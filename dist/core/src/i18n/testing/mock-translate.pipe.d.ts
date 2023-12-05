import { PipeTransform } from '@angular/core';
import { Translatable } from '../translatable';
import * as i0 from "@angular/core";
export declare class MockTranslatePipe implements PipeTransform {
    transform(input: Translatable | string, options?: object): string | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<MockTranslatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<MockTranslatePipe, "cxTranslate", false>;
}
