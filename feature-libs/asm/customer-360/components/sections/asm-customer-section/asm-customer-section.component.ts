/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  Type,
} from '@angular/core';
import { Customer360SectionConfig } from '@spartacus/asm/customer-360/root';
import { UrlCommand, User } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';

import { Customer360SectionContextSource } from '../customer-360-section-context-source.model';
import { Customer360SectionContext } from '../customer-360-section-context.model';
import { AsmCustomerActiveCartComponent } from '../asm-customer-active-cart/asm-customer-active-cart.component';
import { AsmCustomerSavedCartComponent } from '../asm-customer-saved-cart/asm-customer-saved-cart.component';
import { AsmCustomerProductInterestsComponent } from '../asm-customer-product-interests/asm-customer-product-interests.component';
import { AsmCustomerProfileComponent } from '../asm-customer-profile/asm-customer-profile.component';
import { AsmCustomerActivityComponent } from '../asm-customer-activity/asm-customer-activity.component';
import { AsmCustomerSupportTicketsComponent } from '../asm-customer-support-tickets/asm-customer-support-tickets.component';
import { AsmCustomerProductReviewsComponent } from '../asm-customer-product-reviews/asm-customer-product-reviews.component';
import { AsmCustomerCouponComponent } from '../asm-customer-coupon/asm-customer-coupon.component';
import { AsmCustomerPromotionComponent } from '../asm-customer-promotion/asm-customer-promotion.component';
import { AsmCustomerCustomerCouponComponent } from '../asm-customer-customer-coupon/asm-customer-customer-coupon.component';
import { AsmCustomerMapComponent } from '../asm-customer-map/asm-customer-map.component';

@Component({
  selector: 'cx-asm-customer-section',
  templateUrl: './asm-customer-section.component.html',
  providers: [
    Customer360SectionContextSource,
    {
      provide: Customer360SectionContext,
      useExisting: Customer360SectionContextSource,
    },
  ],
})
export class AsmCustomerSectionComponent implements OnChanges, OnDestroy {
  @Input()
  component: any; // Type<unknown>;

  @Input()
  set customer(customer: User) {
    this.source.customer$.next(customer);
  }

  @Input()
  set config(config: Customer360SectionConfig) {
    this.source.config$.next(config);
  }

  @Input()
  set data(data: Observable<unknown>) {
    this.source.data$.next(data);
  }

  @Output()
  navigate: EventEmitter<UrlCommand> = new EventEmitter();

  componentClass: Type<any>;

  componentMapping: Record<string, Type<any>> = {
    AsmCustomerActiveCartComponent: AsmCustomerActiveCartComponent,
    AsmCustomerSavedCartComponent: AsmCustomerSavedCartComponent,
    AsmCustomerProductInterestsComponent: AsmCustomerProductInterestsComponent,
    AsmCustomerProfileComponent: AsmCustomerProfileComponent,
    AsmCustomerActivityComponent: AsmCustomerActivityComponent,
    AsmCustomerSupportTicketsComponent: AsmCustomerSupportTicketsComponent,
    AsmCustomerProductReviewsComponent: AsmCustomerProductReviewsComponent,
    AsmCustomerCouponComponent: AsmCustomerCouponComponent,
    AsmCustomerPromotionComponent: AsmCustomerPromotionComponent,
    AsmCustomerCustomerCouponComponent: AsmCustomerCustomerCouponComponent,
    AsmCustomerMapComponent: AsmCustomerMapComponent,
  };

  protected subscription = new Subscription();

  constructor(protected source: Customer360SectionContextSource<unknown>) {
    this.subscription.add(
      source.navigate$.subscribe((urlCommand) => this.navigate.emit(urlCommand))
    );

    this.subscription.add(() => {
      this.source.config$.complete();
      this.source.customer$.complete();
      this.source.data$.complete();
      this.source.navigate$.complete();
    });
  }

  ngOnChanges(changes?: SimpleChanges): void {
    if (changes?.component) {
      this.componentClass = this.componentMapping[this.component];
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
