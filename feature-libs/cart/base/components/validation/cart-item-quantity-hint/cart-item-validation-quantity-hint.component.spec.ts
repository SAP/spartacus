/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemValidationService } from '@spartacus/cart/base/core';
import { CartItemContext, OrderEntry } from '@spartacus/cart/base/root';
import { TranslatePipe } from '@spartacus/core';
import { ReplaySubject } from 'rxjs';
import { CartItemValidationQuantityHintComponent } from './cart-item-validation-quantity-hint.component';

@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(key: string, params?: object): string {
    return params ? `${key} ${JSON.stringify(params)}` : key;
  }
}

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
}

const quantityInfo$ = new ReplaySubject<{ min?: number; max?: number }>(1);
class MockCartItemValidationService {
  getQuantityInfo$() {
    return quantityInfo$.asObservable();
  }
}

describe('CartItemValidationQuantityHintComponent', () => {
  let component: CartItemValidationQuantityHintComponent;
  let fixture: ComponentFixture<CartItemValidationQuantityHintComponent>;
  let cartItemContext: MockCartItemContext;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CartItemValidationQuantityHintComponent],
      providers: [
        { provide: CartItemContext, useClass: MockCartItemContext },
        {
          provide: CartItemValidationService,
          useClass: MockCartItemValidationService,
        },
      ],
    })
      .overrideComponent(CartItemValidationQuantityHintComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CartItemValidationQuantityHintComponent);
    component = fixture.componentInstance;
    cartItemContext = TestBed.inject(
      CartItemContext
    ) as unknown as MockCartItemContext;
    cartItemContext.item$.next({ product: { code: 'PR0000' } });
  });

  it('should render the Min qty hint', () => {
    quantityInfo$.next({ min: 5 });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(
      'validation.minQuantity'
    );
    expect(fixture.nativeElement.textContent).not.toContain(
      'validation.maxQuantity'
    );
  });

  it('should render the Max qty hint', () => {
    quantityInfo$.next({ max: 10 });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain(
      'validation.maxQuantity'
    );
  });

  it('should render nothing when there is no min/max', () => {
    quantityInfo$.next({});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.cx-qty-hint')).toBeNull();
  });

  it('should expose a stable id derived from the product code for aria-describedby', () => {
    cartItemContext.item$.next({
      product: { code: 'PR0000', name: 'Test Camera' },
    });
    quantityInfo$.next({ max: 10 });
    fixture.detectChanges();

    const hint = fixture.nativeElement.querySelector('.cx-qty-hint');
    expect(hint?.getAttribute('id')).toBe('cx-qty-hint-PR0000');
  });
});
