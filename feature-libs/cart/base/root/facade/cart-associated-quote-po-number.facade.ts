/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// import { Observable } from 'rxjs';
// import { facadeFactory } from '@spartacus/core';
// import { Injectable } from '@angular/core';
// import { CART_BASE_CORE_FEATURE } from '../feature-name';

// @Injectable({
//   providedIn: 'root',
//   useFactory: () =>
//     facadeFactory({
//       facade: CartAssociatedQuotePurchaseOrderNumberFacade,
//       feature: CART_BASE_CORE_FEATURE,
//       methods: ['isPurchaseOrderNumberNonEditable'],
//     }),
// })
// export abstract class CartAssociatedQuotePurchaseOrderNumberFacade {
//   /**
//    *
//    * @param quoteCode The quote code associated with the cart (can be undefined if the
//    *  cart is not created from the quote accept and checkout action)
//    * @returns Whether the purchase order number is coming from the quote and thus non-editable
//    */
//   abstract isPurchaseOrderNumberNonEditable(
//     quoteCode: string
//   ): Observable<boolean>;
// }
