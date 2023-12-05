import { ProductData } from '@spartacus/cart/base/root';
import * as i0 from "@angular/core";
export declare class ImportProductsFromCsvService {
    constructor();
    csvDataToProduct(csvData: string[][]): ProductData[];
    isDataParsableToProducts(data: string[][]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ImportProductsFromCsvService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ImportProductsFromCsvService>;
}
