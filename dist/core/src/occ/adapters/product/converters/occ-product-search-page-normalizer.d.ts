import { ProductSearchPage } from '../../../../model/product-search.model';
import { Converter, ConverterService } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class OccProductSearchPageNormalizer implements Converter<Occ.ProductSearchPage, ProductSearchPage> {
    private converterService;
    constructor(converterService: ConverterService);
    /**
     * Specifies the minimal number of top values in case
     * non have been setup by the business.
     */
    protected DEFAULT_TOP_VALUES: number;
    convert(source: Occ.ProductSearchPage, target?: ProductSearchPage): ProductSearchPage;
    protected normalizeFacets(target: ProductSearchPage): void;
    /**
     * The (current) backend returns facets with values that do not contribute
     * to the facet navigation much, as the number in the result list will not get
     * behavior, see https://jira.hybris.com/browse/CS-427.
     *
     * As long as this is not in place, we manually filter the facet from the list;
     * any facet that does not have a count < the total results will be dropped from
     * the facets.
     */
    protected normalizeUselessFacets(target: ProductSearchPage): void;
    protected normalizeFacetValues(target: ProductSearchPage): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<OccProductSearchPageNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<OccProductSearchPageNormalizer>;
}
