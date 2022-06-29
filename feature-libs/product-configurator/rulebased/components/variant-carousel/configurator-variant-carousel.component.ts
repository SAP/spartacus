import {
  CmsProductCarouselComponent,
  ProductService,
  TranslationService,
} from '@spartacus/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'cx-configurator-variant-carousel',
  templateUrl: './configurator-variant-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorVariantCarouselComponent implements OnInit {
  constructor(
    protected component: CmsComponentData<CmsProductCarouselComponent>,
    protected productService: ProductService,
    protected translation: TranslationService
  ) {}

  protected setProductCodes(data: CmsProductCarouselComponent) {
    data.productCodes = 'CONF_CAMERA_SL';
  }

  ngOnInit(): void {
    this.component.data$.pipe(
      tap((data) => {
        data.title = 'TEST';
        this.setProductCodes(data);
      })
    );
  }
}
