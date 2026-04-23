/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, UserPaymentService } from '@spartacus/core';
import { of } from 'rxjs';
import { OpfTokenisationNewPaymentsHeadingComponent } from './opf-tokenisation-new-payments-heading.component';

describe('OpfTokenisationNewPaymentsHeadingComponent', () => {
  let component: OpfTokenisationNewPaymentsHeadingComponent;
  let fixture: ComponentFixture<OpfTokenisationNewPaymentsHeadingComponent>;

  beforeEach(async () => {
    const mockUserPaymentService = jasmine.createSpyObj('UserPaymentService', [
      'getPaymentMethods',
      'loadPaymentMethods',
    ]);
    mockUserPaymentService.getPaymentMethods.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [OpfTokenisationNewPaymentsHeadingComponent, I18nTestingModule],
      providers: [
        { provide: UserPaymentService, useValue: mockUserPaymentService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      OpfTokenisationNewPaymentsHeadingComponent
    );
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the heading with translation', () => {
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector(
      '.cx-payment-section-heading'
    );
    expect(heading).toBeTruthy();
  });

  it('should render div with aria-label for accessibility', () => {
    fixture.detectChanges();
    const div = fixture.nativeElement.querySelector(
      '.cx-payment-options-section'
    );
    expect(div).toBeTruthy();
    expect(div.getAttribute('aria-label')).toBeDefined();
  });

  it('should have cx-payment-options-section class', () => {
    fixture.detectChanges();
    const container = fixture.nativeElement.querySelector(
      '.cx-payment-options-section'
    );
    expect(container.classList.contains('cx-payment-options-section')).toBe(
      true
    );
  });

  it('should have cx-payment-section-heading class', () => {
    fixture.detectChanges();
    const heading = fixture.nativeElement.querySelector(
      '.cx-payment-section-heading'
    );
    expect(heading.classList.contains('cx-payment-section-heading')).toBe(true);
  });

  it('should be a standalone component', () => {
    const metadata = (component.constructor as any).ɵcmp;
    expect(metadata).toBeDefined();
    expect(metadata.standalone).toBe(true);
  });
});
