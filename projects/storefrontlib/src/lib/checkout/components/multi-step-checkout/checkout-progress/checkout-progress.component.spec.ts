import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutProgressComponent } from './checkout-progress.component';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { CheckoutConfig } from '../../../config/checkout-config';
import { defaultCheckoutConfig } from '../../../config/default-checkout-config';
import { StoreModule } from '@ngrx/store';
import { UrlTranslationService } from '@spartacus/core';

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

fdescribe('CheckoutProgressComponent', () => {
  let component: CheckoutProgressComponent;
  let fixture: ComponentFixture<CheckoutProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), RouterTestingModule],
      declarations: [
        CheckoutProgressComponent,
        MockTranslatePipe,
        MockTranslateUrlPipe,
      ],
      providers: [
        { provide: CheckoutConfig, useValue: MockCheckoutConfig },
        { provide: UrlTranslationService, useValue: { translate: () => {} } },
      ],
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
