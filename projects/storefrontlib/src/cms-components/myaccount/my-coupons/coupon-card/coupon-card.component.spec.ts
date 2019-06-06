import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCardComponent } from './coupon-card.component';
import { of } from 'rxjs';
import { UserToken, I18nTestingModule, AuthService } from '@spartacus/core';

describe('CouponCardComponent', () => {
  let component: CouponCardComponent;
  let fixture: ComponentFixture<CouponCardComponent>;

  const authService = jasmine.createSpyObj('AuthService', ['getUserToken']);
  authService.getUserToken.and.returnValue(of({ userId: 'test' } as UserToken));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CouponCardComponent],
      imports: [I18nTestingModule],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
