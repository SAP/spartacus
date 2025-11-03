/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsmCustomer360ProductInterestList } from '@spartacus/asm/customer-360/root';
import { Product, ProductScope, ProductService } from '@spartacus/core';
import { forkJoin, Observable, of } from 'rxjs';
import { concatMap, filter, take } from 'rxjs/operators';

import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-product-interests',
  templateUrl: './asm-customer-360-product-interests.component.html',
  standalone: false,
})
export class AsmCustomer360ProductInterestsComponent {
  sectionContext = inject<AsmCustomer360SectionContext<AsmCustomer360ProductInterestList>>(AsmCustomer360SectionContext);
  protected productService = inject(ProductService);

  products$: Observable<Array<Product>>;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    this.products$ = this.sectionContext.data$.pipe(
      concatMap((interestList) => {
        if (!interestList?.customerProductInterests?.length) {
          return of([]);
        } else {
          return forkJoin(
            interestList.customerProductInterests.map((interest) => {
              return this.productService
                .get(interest.product.code, ProductScope.DETAILS)
                .pipe(
                  filter((product): product is Product => Boolean(product)),
                  take(1)
                ) as Product;
            })
          );
        }
      })
    );
  }
}
