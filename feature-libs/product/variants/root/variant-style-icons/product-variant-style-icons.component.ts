import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  Optional,
} from '@angular/core';

import {
  OccConfig,
  VariantOption,
  VariantOptionQualifier,
  VariantQualifier,
  Product,
} from '@spartacus/core';
import {
  ProductListItemContextSource,
  ProductListOutlets,
} from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'cx-variant-style-icons',
  templateUrl: './product-variant-style-icons.component.html',
  styleUrls: ['./product-variant-style-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantStyleIconsComponent implements OnInit {
  constructor(
    private config: OccConfig,
    @Optional()
    protected productListItemContextSource?: ProductListItemContextSource
  ) {}

  readonly ProductListOutlets = ProductListOutlets;
  readonly product$: Observable<Product> =
    this.productListItemContextSource?.product$ ?? EMPTY;

  @Input()
  variants: VariantOption[];

  variantNames: { [key: string]: string } = {};

  ngOnInit() {
    this.variants?.forEach((variant) => {
      if (variant.code && variant.variantOptionQualifiers) {
        this.variantNames[variant.code] =
          this.getVariantName(variant.variantOptionQualifiers) || '';
      }
    });

    this.product$.subscribe((product: Product) => {
      if (product.variantOptions && product.variantOptions.length) {
        this.variants = product.variantOptions;
      }
    });
  }

  getVariantThumbnailUrl(
    variantOptionQualifiers: VariantOptionQualifier[]
  ): string {
    const thumbnail = variantOptionQualifiers.find(
      (item) => item.qualifier === VariantQualifier.THUMBNAIL
    );
    return thumbnail
      ? `${this.config?.backend?.occ?.baseUrl}${thumbnail.image?.url}`
      : '';
  }

  private getVariantName(
    variantOptionQualifiers: VariantOptionQualifier[]
  ): string | undefined {
    const rollupProperty = variantOptionQualifiers.find(
      (item) => item.qualifier === VariantQualifier.ROLLUP_PROPERTY
    );
    const property = rollupProperty
      ? variantOptionQualifiers.find(
          (item) => item.qualifier === rollupProperty.value
        )
      : null;
    return property ? property.value : '';
  }
}
