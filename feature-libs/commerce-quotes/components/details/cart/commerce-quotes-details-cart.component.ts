/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CartOutlets, OrderEntry } from '@spartacus/cart/base/root';
import { CommerceQuotesFacade } from '@spartacus/commerce-quotes/root';
import { Product, ProductService } from '@spartacus/core';
import { ConfigurationInfo } from '@spartacus/product-configurator/common';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable, combineLatest, of } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';

interface IQuoteDetailsItem {
  product: Product | undefined;
  orderEntry: OrderEntry;
}

interface IQuoteDetailsItems extends Array<IQuoteDetailsItem> {}

@Component({
  selector: 'cx-commerce-quotes-details-cart',
  templateUrl: './commerce-quotes-details-cart.component.html',
})
export class CommerceQuotesDetailsCartComponent {
  quoteDetailsForm: FormGroup;
  quoteDetails$ = this.commerceQuotesService.getQuoteDetails();
  // crib from feature-libs/pickup-in-store/components/services/delivery-points.service.ts
  quoteDetailsData$ = this.commerceQuotesService.getQuoteDetails().pipe(
    filter((quoteDetails) => !!quoteDetails.data?.entries),
    map(
      (quoteDetails): Array<OrderEntry> =>
        quoteDetails.data?.entries as Array<OrderEntry>
    ),
    tap((orderEntries) => {
      this.quoteDetailsForm = this.formBuilder.group({
        quantities: this.formBuilder.array(
          orderEntries.map((entry) =>
            this.formBuilder.group({ itemQuantity: [entry.quantity] })
          )
        ),
      });
    }),
    switchMap(
      (orderEntries: Array<OrderEntry>): Observable<IQuoteDetailsItems> =>
        of(
          orderEntries.map((orderEntry) => orderEntry.product?.code as string)
        ).pipe(
          mergeMap(
            (codes): Observable<IQuoteDetailsItems> =>
              combineLatest(
                codes.map((code: string) => this.productService.get(code))
              ).pipe(
                map(
                  (data: Array<Product | undefined>): IQuoteDetailsItems =>
                    data.map(
                      (value, index): IQuoteDetailsItem => ({
                        product: value,
                        orderEntry: orderEntries[index],
                      })
                    )
                )
              )
          )
        )
    ),

    map((data: IQuoteDetailsItems) =>
      (data as Array<IQuoteDetailsItem>).map((entry) => ({
        totalPrice: entry.orderEntry.totalPrice,
        quantity: entry.orderEntry.quantity,
        productUrl: entry.orderEntry.product?.url,
        configurationInfos: entry.orderEntry?.configurationInfos?.map(
          (configuration: ConfigurationInfo) => ({
            label: configuration.configurationLabel,
            value: configuration.configurationValue,
          })
        ),
        description: entry.product?.description,
        code: entry.product?.code,
        name: entry.product?.name,
        price: entry.product?.price?.formattedValue,
        images: entry.product?.images,
      }))
    ),

    tap((data) => console.log('data END :>> ', data))
  );

  iconTypes = ICON_TYPE;
  showCart = true;
  readonly cartOutlets = CartOutlets;

  constructor(
    protected commerceQuotesService: CommerceQuotesFacade,
    protected productService: ProductService,
    protected formBuilder: FormBuilder
  ) {
    this.quoteDetailsForm = this.formBuilder.group({
      quantities: this.formBuilder.array([]),
    });

    console.log('constructor', this.quoteDetailsForm.getRawValue());
  }

  get quantities(): FormArray {
    return this.quoteDetailsForm.get('quantities') as FormArray;
  }
}
