import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnInit,
} from '@angular/core';
import {
  Config,
  Image,
  ImageType,
  OccConfig,
  Product,
  ProductScope,
  ProductService,
  RoutingService,
  VariantOptionQualifier,
} from '@spartacus/core';
import { StorefrontConfig } from 'projects/storefrontlib/src/storefront-config';
import { filter, take } from 'rxjs/operators';
import { VariantsMultiDimensionalService } from '../../core/services/variants-multi-dimensional.service';

@Component({
  selector: 'cx-variants-multi-dimensional-selector',
  templateUrl: './variants-multi-dimensional-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsMultiDimensionalSelectorComponent implements OnInit {
  @Input()
  product: Product;

  constructor(
    @Inject(Config) protected config: StorefrontConfig,
    public multiDimensionalService: VariantsMultiDimensionalService,
    private productService: ProductService,
    private routingService: RoutingService
  ) {}

  ngOnInit() {
    this.multiDimensionalService.setVariantsGroups(this.product);
  }

  changeVariant(code: string): void {
    if (code) {
      this.productService
        .get(code, ProductScope.VARIANTS_MULTIDIMENSIONAL)
        .pipe(filter(Boolean), take(1))
        .subscribe((product) => {
          this.routingService.go({
            cxRoute: 'product',
            params: product,
          });
          this.product = product;
          this.multiDimensionalService.setVariantsGroups(this.product);
        });
    }
    return;
  }

  getVariantOptionImages(variantOptionQualifier: VariantOptionQualifier[]) {
    const elements = JSON.parse(JSON.stringify(variantOptionQualifier));
    const images = {};

    const defaultImageObject = {
      imageType: ImageType.PRIMARY,
      altText: this.product.name || '',
    } as Image;

    elements.forEach((element: any) => {
      const imageObject = {
        [element.image?.format as any]: Object.assign(defaultImageObject, {
          format: element.image?.format,
          url: this.getBaseUrl() + element.image?.url,
        }),
      } as Image;

      Object.assign(images, imageObject);
    });

    return images;
  }

  protected getBaseUrl(): string {
    return (
      (this.config as OccConfig).backend?.media?.baseUrl ??
      (this.config as OccConfig).backend?.occ?.baseUrl ??
      ''
    );
  }
}
