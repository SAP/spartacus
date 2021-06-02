import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
} from '@angular/core';
import {
  OccConfig,
  Product,
  VariantOption,
  VariantOptionQualifier,
  VariantQualifier,
} from '@spartacus/core';
import {
  ProductListItemContextSource,
  ProductListOutlets,
} from '@spartacus/storefront';
import { EMPTY, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cx-variant-style-icons',
  templateUrl: './product-variant-style-icons.component.html',
  styleUrls: ['./product-variant-style-icons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductVariantStyleIconsComponent implements OnInit, OnDestroy {
  constructor(
    private config: OccConfig,
    @Optional()
    protected productListItemContextSource?: ProductListItemContextSource
  ) {}

  protected subscriptions = new Subscription();
  readonly ProductListOutlets = ProductListOutlets;
  readonly product$: Observable<Product> =
    this.productListItemContextSource?.product$ ?? EMPTY;

  @Input()
  variants: VariantOption[];

  variantNames: { [key: string]: string } = {};

  ngOnInit() {
    this.setVariantsNames();

    this.subscriptions.add(
      this.product$.subscribe((product: Product) => {
        if (product.variantOptions && product.variantOptions.length) {
          this.variants = product.variantOptions;
          this.setVariantsNames();
        }
      })
    );
  }

  private setVariantsNames() {
    this.variants?.forEach((variant) => {
      if (variant.code && variant.variantOptionQualifiers) {
        this.variantNames[variant.code] =
          this.getVariantName(variant.variantOptionQualifiers) || '';
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
