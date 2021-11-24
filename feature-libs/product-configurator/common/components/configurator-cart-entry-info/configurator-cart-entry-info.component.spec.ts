import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ControlContainer,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
  PromotionLocation,
} from '@spartacus/core';
import { CartItemContext } from '@spartacus/storefront';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { CommonConfiguratorTestUtilsService } from '../../testing/common-configurator-test-utils.service';
import { ConfiguratorType } from './../../core/model/common-configurator.model';
import { ConfiguratorCartEntryInfoComponent } from './configurator-cart-entry-info.component';

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
  readonly$ = new ReplaySubject<boolean>(1);
  quantityControl$ = new ReplaySubject<FormControl>(1);
  location$ = new BehaviorSubject<PromotionLocation>(
    PromotionLocation.SaveForLater
  );
}

@Component({
  selector: 'cx-configure-cart-entry',
  template: '',
})
class MockConfigureCartEntryComponent {
  @Input() cartEntry: OrderEntry;
  @Input() readOnly: boolean;
  @Input() msgBanner: boolean;
  @Input() disabled: boolean;
}
describe('ConfiguratorCartEntryInfoComponent', () => {
  let component: ConfiguratorCartEntryInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCartEntryInfoComponent>;
  let htmlElem: HTMLElement;
  let mockCartItemContext: MockCartItemContext;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          ReactiveFormsModule,
          I18nTestingModule,
          FeaturesConfigModule,
        ],
        declarations: [
          ConfiguratorCartEntryInfoComponent,
          MockConfigureCartEntryComponent,
        ],
        providers: [
          { provide: CartItemContext, useClass: MockCartItemContext },
          {
            provide: ControlContainer,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorCartEntryInfoComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    mockCartItemContext = TestBed.inject(CartItemContext) as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose orderEntry$', (done) => {
    const orderEntry: OrderEntry = { orderCode: '123' };
    component.orderEntry$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(orderEntry);
      done();
    });

    mockCartItemContext.item$.next(orderEntry);
  });

  it('should expose quantityControl$', (done) => {
    const quantityControl = new FormControl();
    component.quantityControl$.pipe(take(1)).subscribe((value) => {
      expect(value).toBe(quantityControl);
      done();
    });

    mockCartItemContext.quantityControl$.next(quantityControl);
  });

  it('should expose readonly$', (done) => {
    component.readonly$.pipe(take(2), toArray()).subscribe((values) => {
      expect(values).toEqual([true, false]);
      done();
    });

    mockCartItemContext.readonly$.next(true);
    mockCartItemContext.readonly$.next(false);
  });

  describe('configuration infos', () => {
    it('should not be displayed if model provides empty array', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: undefined,
        configurationInfos: undefined,
      });
      mockCartItemContext.readonly$.next(false);

      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        0
      );
    });

    it('should be displayed if model provides a success entry', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: undefined,
        configurationInfos: [
          {
            configurationLabel: 'Color',
            configurationValue: 'Blue',
            configuratorType: ConfiguratorType.VARIANT,
            status: 'SUCCESS',
          },
        ],
      });
      mockCartItemContext.readonly$.next(false);

      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        1
      );
    });

    it('should be displayed if model provides a warning entry', () => {
      mockCartItemContext.item$.next({
        statusSummaryList: undefined,
        configurationInfos: [
          {
            configurationLabel: 'Pricing',
            configurationValue: 'could not be carried out',
            configuratorType: ConfiguratorType.VARIANT,
            status: 'WARNING',
          },
        ],
      });
      mockCartItemContext.readonly$.next(false);

      fixture.detectChanges();
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        1
      );
    });

    describe('hasStatus', () => {
      it('should be true if first entry of status summary is in error status and has a definition of the configurator type', () => {
        const entry: OrderEntry = {
          configurationInfos: [
            { status: 'ERROR', configuratorType: ConfiguratorType.VARIANT },
          ],
        };
        expect(component.hasStatus(entry)).toBe(true);
      });

      it('should be false if first entry of status summary carries no status', () => {
        const entry: OrderEntry = { configurationInfos: [{ status: 'NONE' }] };
        expect(component.hasStatus(entry)).toBe(false);
      });

      it('should be false if no configuration infos are present', () => {
        const entry: OrderEntry = {};
        expect(component.hasStatus(entry)).toBe(false);
      });

      it('should be false if configuration infos are empty', () => {
        const entry: OrderEntry = { configurationInfos: [] };
        expect(component.hasStatus(entry)).toBe(false);
      });
    });

    describe('isAttributeBasedConfigurator', () => {
      it('should return true if for CCP based configurator', () => {
        const entry: OrderEntry = {
          configurationInfos: [
            { status: 'ERROR', configuratorType: ConfiguratorType.VARIANT },
          ],
        };
        expect(component.isAttributeBasedConfigurator(entry)).toBe(true);
      });
      it('should return false if no configurationInfos are provided', () => {
        const entry: OrderEntry = {};
        expect(component.isAttributeBasedConfigurator(entry)).toBe(false);
      });
    });

    describe('shouldShowButton', () => {
      beforeEach(() => {
        const quantityControl = new FormControl();

        mockCartItemContext.quantityControl$.next(quantityControl);
        mockCartItemContext.item$.next({
          statusSummaryList: undefined,
          product: { configurable: true },
          configurationInfos: [
            {
              configuratorType: ConfiguratorType.VARIANT,
            },
          ],
        });
      });
      it('should prevent the rendering of "edit configuration" if context is SaveForLater', () => {
        mockCartItemContext.location$.next(PromotionLocation.SaveForLater);
        fixture.detectChanges();

        const htmlElem = fixture.nativeElement;
        expect(
          htmlElem.querySelectorAll('.cx-configure-cart-entry').length
        ).toBe(0);
      });

      it('should allow the rendering of "edit configuration" if context is active cart', () => {
        mockCartItemContext.location$.next(PromotionLocation.ActiveCart);
        fixture.detectChanges();

        const htmlElem = fixture.nativeElement;
        expect(
          htmlElem.querySelectorAll('cx-configure-cart-entry').length
        ).toBe(1);
      });
    });

    describe('Accessibility', () => {
      beforeEach(() => {
        mockCartItemContext.item$.next({
          statusSummaryList: undefined,
          configurationInfos: [
            {
              configurationLabel: 'Color',
              configurationValue: 'Blue',
              configuratorType: ConfiguratorType.VARIANT,
              status: 'WARNING',
            },
          ],
        });
        mockCartItemContext.readonly$.next(false);

        fixture.detectChanges();
      });

      it("should contain span element with class name 'cx-visually-hidden' that contains a hidden introduction", function () {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'span',
          'cx-visually-hidden',
          0,
          undefined,
          undefined,
          'configurator.a11y.cartEntryInfoIntro'
        );
      });

      it("should contain div element with 'cx-configuration-info' and aria-describedby attribute that refers to a corresponding attribute-value pair", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-configuration-info',
          undefined,
          'aria-describedby',
          'cx-configuration-hidden-info-0'
        );
      });

      it("should contain span element with class name 'cx-visually-hidden' that refers to a corresponding attribute-value pair", () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'span',
          'cx-visually-hidden',
          1,
          undefined,
          undefined,
          'configurator.a11y.cartEntryInfo'
        );
      });

      it('should contain div elements for label and value with corresponding content', () => {
        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-label',
          undefined,
          'aria-hidden',
          'true',
          'Color'
        );

        CommonConfiguratorTestUtilsService.expectElementContainsA11y(
          expect,
          htmlElem,
          'div',
          'cx-value',
          undefined,
          'aria-hidden',
          'true',
          'Blue'
        );
      });
    });
  });
});
