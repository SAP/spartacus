import { ProductReference } from '../../../../model/product.model';
import { Converter, ConverterService } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class OccProductReferencesListNormalizer implements Converter<Occ.ProductReferenceList, ProductReference[]> {
    private converter;
    constructor(converter: ConverterService);
    convert(source: Occ.ProductReferenceList, target?: ProductReference[]): ProductReference[];
    static ɵfac: i0.ɵɵFactoryDeclaration<OccProductReferencesListNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccProductReferencesListNormalizer>;
}
