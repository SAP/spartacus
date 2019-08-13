import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, CartService } from '@spartacus/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckoutLoginComponent } from './checkout-login.component';

class MockCartService {
  addEmail() {}
}
describe('CheckoutLoginComponent', () => {
  let component: CheckoutLoginComponent;
  let fixture: ComponentFixture<CheckoutLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      declarations: [CheckoutLoginComponent],
      providers: [{ provide: CartService, useClass: MockCartService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutLoginComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
