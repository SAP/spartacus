/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit } from '@angular/core';
import { Cart } from '@spartacus/cart/base/root';
import {
  Product,
  ProductInterestEntryRelation,
  ProductScope,
  ProductService,
  UrlCommand,
  UserInterestsService,
} from '@spartacus/core';
import { BREAKPOINT, BreakpointService } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Customer360SectionContext } from '../customer-360-section-context.model';
import {
  AsmInterestProductEntry,
  OverviewSection,
} from './asm-customer-overview.model';

@Component({
  selector: 'cx-asm-customer-overview',
  templateUrl: './asm-customer-overview.component.html',
})
export class AsmCustomerOverviewComponent implements OnInit {
  PAGE_SIZE = 100;

  OverviewSection = OverviewSection;

  activeCart$: Observable<Cart | undefined>;

  savedCart$: Observable<Cart | undefined>;

  interestProducts$: Observable<AsmInterestProductEntry | undefined>;

  numberofColumns$: Observable<number>;

  showMoreActiveCart = false;

  showMoreSavedCart = false;

  showMoreInterests = false;

  constructor(
    protected breakpointService: BreakpointService,
    protected interestsService: UserInterestsService,
    protected productService: ProductService,
    protected sectionContext: Customer360SectionContext<void>
  ) {}

  ngOnInit(): void {
    this.numberofColumns$ = this.getNumberofColumns();
    // getting Active Cart
    this.activeCart$ = this.sectionContext.activeCart$.pipe(
      map((carts) => (carts?.entries?.length ? carts : undefined))
    );

    this.savedCart$ = this.sectionContext.savedCarts$.pipe(
      map((carts) => carts?.[0])
    );

    // getting Interests
    this.interestProducts$ = this.interestsService
      .getAndLoadProductInterests(this.PAGE_SIZE)
      .pipe(
        map((interest) =>
          interest?.results?.length
            ? {
                products: interest.results.map((result) =>
                  this.getProduct(result)
                ),
              }
            : undefined
        )
      );
  }

  navigateTo(urlCommand: UrlCommand): void {
    this.sectionContext.navigate$.next(urlCommand);
  }

  showMoreBySectionIndex(section: OverviewSection): void {
    if (section === OverviewSection.ACTIVE_CART) {
      this.showMoreActiveCart = !this.showMoreActiveCart;
    } else if (section === OverviewSection.SAVED_CART) {
      this.showMoreSavedCart = !this.showMoreSavedCart;
    } else {
      this.showMoreInterests = !this.showMoreInterests;
    }
  }

  getNumberofColumns(): Observable<number> {
    return this.breakpointService.breakpoint$.pipe(
      map((breakpoint) => {
        if (breakpoint === BREAKPOINT.xl) {
          return 3;
        } else if (breakpoint === BREAKPOINT.lg) {
          return 2;
        } else {
          return 1;
        }
      })
    );
  }

  private getProduct(
    interest: ProductInterestEntryRelation
  ): Observable<Product | undefined> {
    return this.productService.get(
      interest.product?.code ?? '',
      ProductScope.DETAILS
    );
  }
}
