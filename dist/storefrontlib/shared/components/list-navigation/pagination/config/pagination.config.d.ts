import { PaginationOptions } from '../pagination.model';
import * as i0 from "@angular/core";
export declare abstract class PaginationConfig {
    pagination?: PaginationOptions;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PaginationConfig>;
}
declare module '@spartacus/core' {
    interface Config extends PaginationConfig {
    }
}
