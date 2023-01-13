import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsmCustomer360ProductInterestList } from '@spartacus/asm/root';
import { Product, ProductScope, ProductService } from '@spartacus/core';
import { forkJoin, Observable } from 'rxjs';
import { concatMap, filter, take } from 'rxjs/operators';

import { Customer360SectionContext } from '../customer-360-section-context.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-product-interests',
  templateUrl: './asm-customer-product-interests.component.html',
})
export class AsmCustomerProductInterestsComponent {
  products$: Observable<Array<Product>>;

  constructor(
    public sectionContext: Customer360SectionContext<AsmCustomer360ProductInterestList>,
    protected productService: ProductService
  ) {
    this.products$ = this.sectionContext.data$.pipe(
      concatMap((interestList) => {
        return forkJoin(
          interestList.customerProductInterests.map((interest) => {
            return this.productService
              .get(interest.product.code, ProductScope.DETAILS)
              .pipe(
                filter((product) => Boolean(product)),
                take(1)
              );
          })
        ) as Observable<Array<Product>>;
      })
    );
  }
}
