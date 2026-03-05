import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActiveCartFacade, Cart } from '@spartacus/cart/base/root';
import {
  FeatureLevelDirective,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { MockFeatureLevelDirective } from 'projects/storefrontlib/shared/test/mock-feature-level-directive';
import { of } from 'rxjs';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';
import createSpy = jasmine.createSpy;

class MockActiveCartService implements Partial<ActiveCartFacade> {
  getActive = createSpy().and.returnValue(
    of(<Partial<Cart>>{
      totalItems: 5141,
      subTotal: { formattedValue: '11119' },
    })
  );
}

describe('CheckoutOrderSummaryComponent', () => {
  let component: CheckoutOrderSummaryComponent;
  let fixture: ComponentFixture<CheckoutOrderSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutOrderSummaryComponent],
      providers: [
        { provide: ActiveCartFacade, useClass: MockActiveCartService },
      ],
    })
      .overrideComponent(CheckoutOrderSummaryComponent, {
        remove: {
          imports: [TranslatePipe, FeatureLevelDirective],
        },
        add: {
          imports: [MockTranslatePipe, MockFeatureLevelDirective],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutOrderSummaryComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
