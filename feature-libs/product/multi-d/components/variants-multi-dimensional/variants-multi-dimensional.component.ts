import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CurrentProductService } from '@spartacus/storefront';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cx-variants-multi-dimensional',
  templateUrl: './variants-multi-dimensional.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsMultiDimensionalComponent implements OnInit {
  product$: Observable<Product | null>;

  constructor(private currentProductService: CurrentProductService) {}

  ngOnInit(): void {
    this.product$ = this.currentProductService.getProduct().pipe(
      filter((product) => {

        return !!(
          product &&
          product?.multidimensional &&
          product?.variantMatrix
        );
      }),
      distinctUntilChanged()
    );
  }
}
