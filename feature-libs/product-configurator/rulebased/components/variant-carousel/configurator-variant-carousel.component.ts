import {
  CmsProductCarouselComponent,
  Product,
  ProductService,
  TranslationService,
} from '@spartacus/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-variant-carousel',
  templateUrl: './configurator-variant-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorVariantCarouselComponent {
  constructor(
    protected productService: ProductService,
    protected translation: TranslationService
  ) {}

  data: CmsProductCarouselComponent = {
    productCodes:
      'CONF_CAMERA_SL-PROF-BLACK CONF_CAMERA_SL-PROF-METALLIC CONF_CAMERA_SL-STD-BLACK CONF_CAMERA_SL-STD-METALLIC CONF_CAMERA_SL-PROF-BLACK CONF_CAMERA_SL-PROF-METALLIC CONF_CAMERA_SL-STD-BLACK CONF_CAMERA_SL-STD-METALLIC CONF_CAMERA_SL-PROF-BLACK CONF_CAMERA_SL-PROF-METALLIC CONF_CAMERA_SL-STD-BLACK CONF_CAMERA_SL-STD-METALLIC ',
  };

  private componentData$: Observable<CmsProductCarouselComponent> =
    new Observable((observer) => {
      observer.next(this.data);
    });

  title$: Observable<string | undefined> = this.translation
    .translate('configurator.variantCarousel.title')
    .pipe(take(1));

  items$: Observable<Observable<Product | undefined>[]> =
    this.componentData$.pipe(
      map((data) => data.productCodes?.trim().split(' ') ?? []),
      map((codes) => codes.map((code) => this.productService.get(code)))
    );
}
