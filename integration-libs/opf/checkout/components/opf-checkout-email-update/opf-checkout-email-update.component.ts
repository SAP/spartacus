/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, inject } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ActiveCartFacade,
  CartGuestUserFacade,
  MultiCartFacade,
} from '@spartacus/cart/base/root';
import {
  RoutingService,
  SemanticPathService,
  UserIdService,
} from '@spartacus/core';
import { CustomFormValidators } from '@spartacus/storefront';
import { combineLatest, switchMap, take, tap } from 'rxjs';
import { NgTemplateOutlet } from '@angular/common';
import { FormErrorsComponent } from '@spartacus/storefront';
import { TranslatePipe } from '@spartacus/core';

@Component({
  selector: 'cx-opf-checkout-email-update',
  templateUrl: './opf-checkout-email-update.component.html',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgTemplateOutlet,
    FormErrorsComponent,
    TranslatePipe,
    TranslatePipe,
  ],
})
export class OpfCheckoutEmailUpdateComponent {
  protected cartGuestUserFacade = inject(CartGuestUserFacade);
  protected multiCartFacade = inject(MultiCartFacade);
  protected userIdService = inject(UserIdService);
  protected router = inject(RoutingService);
  protected semanticPathService = inject(SemanticPathService);
  protected activeCartFacade = inject(ActiveCartFacade);

  checkoutLoginForm: UntypedFormGroup = new UntypedFormGroup(
    {
      email: new UntypedFormControl('', [
        Validators.required,
        CustomFormValidators.emailValidator,
      ]),
      emailConfirmation: new UntypedFormControl('', [Validators.required]),
    },
    {
      validators: CustomFormValidators.emailsMustMatch(
        'email',
        'emailConfirmation'
      ),
    }
  );

  onSubmit(): void {
    const email: string = this.checkoutLoginForm.get('email')?.value;

    this.updateCartGuestUserEmail(email);
  }

  protected updateCartGuestUserEmail(email: string): void {
    combineLatest([
      this.userIdService.takeUserId(),
      this.activeCartFacade.takeActiveCartId(),
    ])
      .pipe(
        switchMap(([userId, cartId]) => {
          return this.cartGuestUserFacade
            .updateCartGuestUser(userId, cartId, { email })
            .pipe(tap(() => this.multiCartFacade.reloadCart(cartId)));
        }),
        take(1)
      )
      .subscribe(() =>
        this.router.go(this.semanticPathService.get('checkoutDeliveryAddress'))
      );
  }
}
