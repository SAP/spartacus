import { Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CartService, I18nTestingModule } from '@spartacus/core';
import { CartCouponComponent } from './cart-coupon.component';
import createSpy = jasmine.createSpy;

class MockCartCouponComponent {
  @Input() cart;
  @Input() cartIsLoading;
}

describe('CartCouponComponent', () => {
  let component: CartCouponComponent;
  let fixture: ComponentFixture<CartCouponComponent>;
  let mockCartService: any;

  beforeEach(async(() => {
    mockCartService = {
      applyVoucher: createSpy(),
      removeVoucher: createSpy(),
    };

    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [CartCouponComponent, MockCartCouponComponent],
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
