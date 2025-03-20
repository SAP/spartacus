/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CardModule, IconModule, ICON_TYPE, Card } from '@spartacus/storefront';
import { OpfCheckoutReviewCardComponent } from './opf-checkout-review-card.component';
import { OpfCheckoutReviewCardEditConfig } from './opf-checkout-review-card.model';
import { BehaviorSubject } from 'rxjs';

describe('OpfCheckoutReviewCardComponent', () => {
  let component: OpfCheckoutReviewCardComponent;
  let fixture: ComponentFixture<OpfCheckoutReviewCardComponent>;
  const mockCardContent$ = new BehaviorSubject<Card>({
    title: 'Review',
    textBold: 'Order Summary',
    text: ['Total Items: 5', 'Total Price: $100.00'],
  });
  const mockEditConfig: OpfCheckoutReviewCardEditConfig = {
    route: 'test-route',
    ariaLabelKey: 'checkoutReview.editReview',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule, CardModule, IconModule],
      declarations: [OpfCheckoutReviewCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfCheckoutReviewCardComponent);
    component = fixture.componentInstance;
    component.cardContent$ = mockCardContent$;
    component.editConfig = mockEditConfig;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display review card content when provided', () => {
    const cardElement = fixture.nativeElement.querySelector('cx-card');
    expect(cardElement).toBeTruthy();
  });

  it('should have edit button with correct route', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.getAttribute('ng-reflect-router-link')).toContain(
      mockEditConfig.route
    );
  });

  it('should have pencil icon in edit button', () => {
    const icon = fixture.nativeElement.querySelector('cx-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('ng-reflect-type')).toBe(ICON_TYPE.PENCIL);
  });

  it('should have correct aria-label on edit button', () => {
    const button = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe(mockEditConfig.ariaLabelKey);
  });

  it('should not display card when no content is provided', () => {
    component.cardContent$ = new BehaviorSubject<Card | null>(null);
    fixture.detectChanges();
    const cardElement = fixture.nativeElement.querySelector('cx-card');
    expect(cardElement).toBeFalsy();
  });
});
