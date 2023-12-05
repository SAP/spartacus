import { Product } from '../../../../model/product.model';
import { Converter } from '../../../../util/converter.service';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class ProductNameNormalizer implements Converter<Occ.Product, Product> {
    protected config: OccConfig;
    constructor(config: OccConfig);
    convert(source: Occ.Product, target?: Product): Product;
    /**
     * Sanitizes the name so that the name doesn't contain html elements.
     */
    protected normalize(name: string): string;
    /**
     * A pretty url should not have any encoded characters, which is why we replace
     * the following character in the product title.
     *
     * See https://developers.google.com/maps/documentation/urls/url-encoding for more
     * information on the characters.
     */
    protected reservedSlugCharacters: string;
    protected slugChar: string;
    private slugRegex;
    private sanitizeMultipleSlugChars;
    /**
     * Provides a title slug for the pretty URL.
     *
     * The name is sanitized from html, trimmed, converted to lowercase and special characters
     * which are encoded are replaced by the slug char (dash by default).
     */
    protected normalizeSlug(name: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductNameNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductNameNormalizer>;
}
