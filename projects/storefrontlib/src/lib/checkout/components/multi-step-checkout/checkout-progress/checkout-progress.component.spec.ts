import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutProgressComponent } from './checkout-progress.component';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutConfig } from '../../../config/checkout-config';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { I18nTestingModule } from '@spartacus/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';

const MockCheckoutConfig: CheckoutConfig = defaultCheckoutConfig;
@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}
@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

describe('CheckoutProgressComponent', () => {
  let component: CheckoutProgressComponent;
  let fixture: ComponentFixture<CheckoutProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [
        CheckoutProgressComponent,
        MockTranslatePipe,
        MockTranslateUrlPipe,
      ],
      providers: [{ provide: CheckoutConfig, useValue: MockCheckoutConfig }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
