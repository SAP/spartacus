import { BaseSite } from '../../../../model/misc.model';
import { Converter } from '../../../../util/converter.service';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class BaseSiteNormalizer implements Converter<Occ.BaseSite, BaseSite> {
    constructor();
    convert(source: Occ.BaseSite, target?: BaseSite): BaseSite;
    static ɵfac: i0.ɵɵFactoryDeclaration<BaseSiteNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BaseSiteNormalizer>;
}
