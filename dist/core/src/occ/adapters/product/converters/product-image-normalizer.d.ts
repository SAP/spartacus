import { ImageGroup, Images } from '../../../../model/image.model';
import { Product } from '../../../../model/product.model';
import { Converter } from '../../../../util/converter.service';
import { OccConfig } from '../../../config/occ-config';
import { Occ } from '../../../occ-models/occ.models';
import * as i0 from "@angular/core";
export declare class ProductImageNormalizer implements Converter<Occ.Product, Product> {
    protected config: OccConfig;
    constructor(config: OccConfig);
    convert(source: Occ.Product, target?: Product): Product;
    /**
     * @desc
     * Creates the image structure we'd like to have. Instead of
     * having a single list with all images despite type and format
     * we create a proper structure. With that we can do:
     * - images.primary.thumnail.url
     * - images.GALLERY[0].thumnail.url
     */
    normalize(source: Occ.Image[]): Images;
    protected getImageContainer(isList: boolean, images: Images, image: Occ.Image | any): ImageGroup;
    protected getImageGroups(images: Images, image: Occ.Image | any): ImageGroup[];
    /**
     * Traditionally, in an on-prem world, medias and other backend related calls
     * are hosted at the same platform, but in a cloud setup, applications are are
     * typically distributed cross different environments. For media, we use the
     * `backend.media.baseUrl` by default, but fallback to `backend.occ.baseUrl`
     * if none provided.
     */
    private normalizeImageUrl;
    private hasGalleryIndex;
    static ɵfac: i0.ɵɵFactoryDeclaration<ProductImageNormalizer, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ProductImageNormalizer>;
}
