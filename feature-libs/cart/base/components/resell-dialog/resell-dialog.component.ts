/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Product, ProductService } from '@spartacus/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { filter, map, startWith, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-resell-dialog',
  templateUrl: './resell-dialog.component.html',
})
export class ResellDialogComponent implements OnInit {
  readonly focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'input',
    focusOnEscape: true,
  };

  readonly ICON_TYPE = ICON_TYPE;
  /** The reason given closing the dialog window without selecting a location */
  readonly CLOSE_WITHOUT_SELECTION = 'CLOSE_WITHOUT_SELECTION';
  /** The reason given closing the dialog window after selecting a location */
  readonly LOCATION_SELECTED = 'LOCATION_SELECTED';

  stage = 'marketplaces';

  orderCode: string;
  orderEntry: number;
  product: Product;
  itemId: string;

  get title() {
    switch (this.stage) {
      case 'marketplaces':
        return 'Select a Market';
      case 'login':
        return 'Log in to eBay';
      case 'details':
        return 'Item details';
      case 'listing':
        return 'Link to your listing';
      default:
        return '';
    }
  }

  constructor(
    protected elementRef: ElementRef,
    protected launchDialogService: LaunchDialogService,
    protected productService: ProductService
  ) {
    // Intentional empty constructor
  }

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    if (
      (event.target as any).tagName === this.elementRef.nativeElement.tagName
    ) {
      this.close(this.CLOSE_WITHOUT_SELECTION);
    }
  }

  ngOnInit() {
    this.launchDialogService.data$
      .pipe(
        tap(({ orderCode, orderEntry }) => {
          this.orderCode = orderCode;
          this.orderEntry = orderEntry;
        }),
        switchMap(({ product }) =>
          this.productService.get(product.code).pipe(
            filter(
              (enrichedProduct): enrichedProduct is Product => !!enrichedProduct
            ),
            map(
              (enrichedProduct) =>
                ({ ...enrichedProduct, ...product } as Product)
            ),
            startWith(product)
          )
        )
      )
      .subscribe((product) => {
        console.log('product :>> ', product);
        this.product = product;
      });
  }

  next(reference: string) {
    if (reference.startsWith('login')) {
      this.stage = 'login';
    } else if (reference === 'details') {
      this.stage = 'details';
    } else {
      this.itemId = reference;
      this.stage = 'listing';
    }
  }

  /**
   * Close the dialog window. This has additional side effects based upon whether
   * we are making a selection on the PDP or in the cart/during checkout.
   *
   * On the PDP:
   *
   * If the dialog is closed without making a selection, then the radio buttons
   * are left on pickup if there already exists an intended pickup location or
   * to delivery if not.
   *
   * Not on the PDP:
   *
   * If the window is closed after making a selection, then the cart is updated
   * to the the new selection.
   *
   * @param reason The reason the dialog window was closed
   */
  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }
}
