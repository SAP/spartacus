import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService, GlobalMessageService, I18nTestingModule, UserToken } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CartCouponComponent } from './cart-coupon.component';

import createSpy = jasmine.createSpy;
class MockAuthService {
  authorize = createSpy();
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockGlobalMessageService {
  add = createSpy();
}

describe('CartCouponComponent', () => {
  let component: CartCouponComponent;
  let fixture: ComponentFixture<CartCouponComponent>;
  let mockGlobalMessageService: MockGlobalMessageService;
  
  beforeEach(async(() => {
    mockGlobalMessageService = new MockGlobalMessageService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, AuthService, GlobalMessageService],
      declarations: [CartCouponComponent],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: GlobalMessageService, useValue: mockGlobalMessageService },
      ],
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