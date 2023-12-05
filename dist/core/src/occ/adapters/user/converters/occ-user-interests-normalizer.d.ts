import { ProductInterestSearchResult } from '../../../../model/product-interest.model';
import { Converter, ConverterService } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class OccUserInterestsNormalizer implements Converter<Occ.ProductInterestSearchResult, ProductInterestSearchResult> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.ProductInterestSearchResult, target?: ProductInterestSearchResult): ProductInterestSearchResult;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccUserInterestsNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccUserInterestsNormalizer>;
}
