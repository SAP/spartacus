import { PipeTransform } from '@angular/core';
import { SemanticPathService } from './semantic-path.service';
import { Product } from '../../../model/product.model';
import * as i0 from "@angular/core";
export declare class ProductURLPipe implements PipeTransform {
    private semanticPath;
    constructor(semanticPath: SemanticPathService);
    transform(product: Product): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductURLPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<ProductURLPipe, "cxProductUrl", false>;
}
