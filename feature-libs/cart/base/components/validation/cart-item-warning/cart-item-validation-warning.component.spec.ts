import {
  Component,
  DebugElement,
  Input,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  CartModification,
  CartValidationFacade,
  CartValidationStatusCode,
} from '@spartacus/cart/base/root';
import { CartConfigService } from '@spartacus/cart/base/core';
import { FeatureToggles, TranslatePipe, UrlPipe } from '@spartacus/core';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from '@spartacus/core/testing/mock-feature-toggles';
import { ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { ReplaySubject } from 'rxjs';
import { CartItemValidationWarningComponent } from './cart-item-validation-warning.component';

const mockCode = 'productCode1';
const mockData = [
  {
    statusCode: CartValidationStatusCode.LOW_STOCK,
    entry: {
      product: {
        code: mockCode,
      },
    },
  },
  {
    statusCode: CartValidationStatusCode.LOW_STOCK,
    entry: {
      product: {
        code: 'productCode2',
      },
    },
  },
];

const dataReplaySubject = new ReplaySubject<CartModification[]>();

class MockCartValidationFacade {
  getValidationResults() {
    return dataReplaySubject;
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type: ICON_TYPE;
}

@Pipe({ name: 'cxTranslate' })
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

@Pipe({ name: 'cxUrl' })
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('CartItemValidationWarningComponent', () => {
  let component: CartItemValidationWarningComponent;
  let fixture: ComponentFixture<CartItemValidationWarningComponent>;
  let cartValidationFacade: CartValidationFacade;
  let el: DebugElement;

  /**
   * Configures the testing module with the given feature toggle value.
   * `displayBackendMessages` is resolved on construction, so the toggle must be
   * set before `createComponent()`.
   */
  function setup(
    displayBackendMessages = false,
    cartValidationEnabled = true
  ): void {
    TestBed.configureTestingModule({
      imports: [CartItemValidationWarningComponent],
      providers: [
        {
          provide: CartValidationFacade,
          useClass: MockCartValidationFacade,
        },
        {
          provide: CartConfigService,
          useValue: {
            isCartValidationEnabled: () => cartValidationEnabled,
          },
        },
        provideMockFeatureToggles({
          cartValidationDisplayBackendMessages: displayBackendMessages,
        }),
        // Bind the `FeatureToggles` identity used by this lib to the mock's
        // controller. The component imports `FeatureToggles` via the
        // `@spartacus/core` barrel, which under the vitest test aliases is a
        // different class instance than the one `provideMockFeatureToggles`
        // registers internally; `useExisting` bridges the two so the component
        // reads the mocked toggle value.
        {
          provide: FeatureToggles,
          useExisting: MockFeatureTogglesController,
        },
      ],
    })
      .overrideComponent(CartItemValidationWarningComponent, {
        remove: {
          imports: [IconComponent, TranslatePipe, UrlPipe],
        },
        add: {
          imports: [MockCxIconComponent, MockTranslatePipe, MockUrlPipe],
        },
      })
      .compileComponents();

    cartValidationFacade = TestBed.inject(CartValidationFacade);
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(CartItemValidationWarningComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;

    (
      cartValidationFacade.getValidationResults() as ReplaySubject<
        CartModification[]
      >
    ).next([]);
    component.code = mockCode;

    fixture.detectChanges();
  }

  it('should create', () => {
    setup();
    createComponent();
    expect(component).toBeTruthy();
  });

  it('should find proper cart modification object', () => {
    setup();
    createComponent();
    (
      cartValidationFacade.getValidationResults() as ReplaySubject<
        CartModification[]
      >
    ).next(mockData);
    let result;

    component.cartModification$.subscribe((value) => (result = value));

    expect(result.entry.product.code).toEqual(mockCode);
  });

  it('should close / hide warning when clicked icon', () => {
    setup();
    createComponent();
    let button = el.query(By.css('.close')) as any;
    expect(button).toBeNull();

    (
      cartValidationFacade.getValidationResults() as ReplaySubject<
        CartModification[]
      >
    ).next(mockData);
    fixture.detectChanges();

    button = el.query(By.css('.close')).nativeElement;
    expect(button).toBeDefined();
    button.click();

    fixture.detectChanges();

    expect(component.isVisible).toEqual(false);
    const alert = el.query(By.css('.alert'));
    expect(alert).toBeNull();
  });

  describe('with cartValidationDisplayBackendMessages toggle enabled', () => {
    const belowMinMessage =
      'The minimum required quantity for product code productCode1 has not been met. Min=5, Actual=1.';
    const aboveMaxMessage =
      'The maximum allowed quantity for product code productCode1 has been exceeded. Max=5, Actual=6.';

    beforeEach(() => {
      setup(true);
    });

    it('should match an entry-less modification by product code in statusMessage', () => {
      createComponent();
      (
        cartValidationFacade.getValidationResults() as ReplaySubject<
          CartModification[]
        >
      ).next([
        {
          statusCode: CartValidationStatusCode.BELOW_MIN_QUANTITY,
          statusMessage: belowMinMessage,
        },
      ]);
      let result;

      component.cartModification$.subscribe((value) => (result = value));

      expect(result?.statusMessage).toEqual(belowMinMessage);
    });

    it('should match an entry-less modification when the product code is all zeros', () => {
      const zeroCode = '00000';
      const zeroCodeMessage = `The minimum required quantity for product code ${zeroCode} has not been met. Min=5, Actual=1.`;
      createComponent();
      component.code = zeroCode;
      (
        cartValidationFacade.getValidationResults() as ReplaySubject<
          CartModification[]
        >
      ).next([
        {
          statusCode: CartValidationStatusCode.BELOW_MIN_QUANTITY,
          statusMessage: zeroCodeMessage,
        },
      ]);
      let result;

      component.cartModification$.subscribe((value) => (result = value));

      expect(result?.statusMessage).toEqual(zeroCodeMessage);
    });

    it('should NOT match an entry-less modification when the code is empty', () => {
      createComponent();
      component.code = '';
      (
        cartValidationFacade.getValidationResults() as ReplaySubject<
          CartModification[]
        >
      ).next([
        {
          statusCode: CartValidationStatusCode.BELOW_MIN_QUANTITY,
          statusMessage: belowMinMessage,
        },
      ]);
      let result;

      component.cartModification$.subscribe((value) => (result = value));

      expect(result).toBeUndefined();
    });

    it('should NOT render the raw statusMessage alert for a min/max violation', () => {
      createComponent();
      (
        cartValidationFacade.getValidationResults() as ReplaySubject<
          CartModification[]
        >
      ).next([
        {
          statusCode: CartValidationStatusCode.BELOW_MIN_QUANTITY,
          statusMessage: belowMinMessage,
        },
      ]);
      fixture.detectChanges();

      const alert = el.query(By.css('.alert'));
      expect(alert).toBeNull();
    });

    it('should NOT render the raw statusMessage alert for an above-max violation', () => {
      createComponent();
      (
        cartValidationFacade.getValidationResults() as ReplaySubject<
          CartModification[]
        >
      ).next([
        {
          statusCode: CartValidationStatusCode.ABOVE_MAX_QUANTITY,
          statusMessage: aboveMaxMessage,
        },
      ]);
      fixture.detectChanges();

      const alert = el.query(By.css('.alert'));
      expect(alert).toBeNull();
    });

    it('should render the raw statusMessage for a non min/max backend message', () => {
      const genericMessage = 'A backend problem for product productCode1.';
      createComponent();
      (
        cartValidationFacade.getValidationResults() as ReplaySubject<
          CartModification[]
        >
      ).next([
        {
          statusCode: CartValidationStatusCode.LOW_STOCK,
          entry: { product: { code: mockCode } },
          statusMessage: genericMessage,
        },
      ]);
      fixture.detectChanges();

      const alert = el.query(By.css('.alert'));
      expect(alert.nativeElement.textContent).toContain(genericMessage);
    });
  });

  describe('with cartValidationDisplayBackendMessages toggle disabled', () => {
    it('should NOT match an entry-less modification', () => {
      setup(false);
      createComponent();
      (
        cartValidationFacade.getValidationResults() as ReplaySubject<
          CartModification[]
        >
      ).next([
        {
          statusCode: CartValidationStatusCode.BELOW_MIN_QUANTITY,
          statusMessage:
            'The minimum required quantity for product code productCode1 has not been met.',
        },
      ]);
      let result;

      component.cartModification$.subscribe((value) => (result = value));

      expect(result).toBeUndefined();
    });
  });

  describe('with cart.validation.enabled config disabled', () => {
    it('should NOT match an entry-less modification even when the toggle is on', () => {
      setup(true, false);
      createComponent();
      (
        cartValidationFacade.getValidationResults() as ReplaySubject<
          CartModification[]
        >
      ).next([
        {
          statusCode: CartValidationStatusCode.BELOW_MIN_QUANTITY,
          statusMessage:
            'The minimum required quantity for product code productCode1 has not been met. Min=5, Actual=1.',
        },
      ]);
      let result;

      component.cartModification$.subscribe((value) => (result = value));

      expect(result).toBeUndefined();
    });
  });
});
