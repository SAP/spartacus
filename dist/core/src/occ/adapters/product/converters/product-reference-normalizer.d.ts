import { Product, ProductReferences } from '../../../../model/product.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class ProductReferenceNormalizer implements Converter<Occ.Product, Product> {
    convert(source: Occ.Product, target?: Product): Product;
    /**
     * @desc
     * Creates the reference structure we'd like to have. Instead of
     * having a single list with all references we create a proper structure.
     * With that we have a semantic API for the clients
     * - product.references.SIMILAR[0].code
     */
    protected normalize(source: Occ.ProductReference[]): ProductReferences;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductReferenceNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductReferenceNormalizer>;
}
