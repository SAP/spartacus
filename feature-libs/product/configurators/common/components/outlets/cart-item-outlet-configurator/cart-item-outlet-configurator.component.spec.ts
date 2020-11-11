import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ConfigurationInfo,
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
  StatusSummary,
} from '@spartacus/core';
import {
  CartItemContext,
  CartItemContextModel,
  GenericConfiguratorModule,
} from '@spartacus/storefront';
import { CartItemOutletConfiguratorComponent } from './cart-item-outlet-configurator.component';

function setContext(
  cartItemOutletConfiguratorComponent: CartItemOutletConfiguratorComponent,
  statusSummary: StatusSummary[],
  configurationInfos: ConfigurationInfo[],
  readOnly: boolean
) {
  const newChunk: CartItemContextModel = {
    item: {
      statusSummaryList: statusSummary,
      configurationInfos: configurationInfos,
    },
    readonly: readOnly,
  };
  let oldChunk: CartItemContextModel;
  cartItemOutletConfiguratorComponent.cartItem.context$
    .subscribe((val) => (oldChunk = val ?? {}))
    .unsubscribe();

  cartItemOutletConfiguratorComponent.cartItem['context$$'].next({
    ...oldChunk,
    ...newChunk,
  });
}

describe('CartItemOutletConfiguratorComponent', () => {
  let cartItemOutletConfiguratorComponent: CartItemOutletConfiguratorComponent;
  let fixture: ComponentFixture<CartItemOutletConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        GenericConfiguratorModule,
        RouterTestingModule,
        ReactiveFormsModule,
        I18nTestingModule,

        FeaturesConfigModule,
      ],
      declarations: [CartItemOutletConfiguratorComponent],
      providers: [
        CartItemContext,
        {
          provide: ControlContainer,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemOutletConfiguratorComponent);

    cartItemOutletConfiguratorComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create CartItemOutletConfiguratorComponent', () => {
    expect(cartItemOutletConfiguratorComponent).toBeTruthy();
  });

  it('should know cart item context', () => {
    expect(cartItemOutletConfiguratorComponent.cartItem).toBeTruthy();
  });

  describe('Depicting configurable products in the cart', () => {
    it('should not display configuration info if array of configurationInfo is empty', () => {
      setContext(cartItemOutletConfiguratorComponent, null, null, false);
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        0,
        "expected configuration info identified by selector '.cx-configuration-info' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should display configuration info if array of configurationInfo is not empty and of status success', () => {
      setContext(
        cartItemOutletConfiguratorComponent,
        null,
        [
          {
            configurationLabel: 'Color',
            configurationValue: 'Blue',
            configuratorType: 'CPQCONFIGURATOR',
            status: 'SUCCESS',
          },
        ],
        false
      );

      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        1,
        "expected configuration info identified by selector '.cx-configuration-info' to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
      expect(
        htmlElem.querySelectorAll('.cx-configuration-info-error').length
      ).toBe(
        0,
        "expected configuration info identified by selector '.cx-configuration-info-error' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should return false if first entry of configuration infos does not have NONE status', () => {
      const entry: OrderEntry = { configurationInfos: [{ status: 'ERROR' }] };
      expect(cartItemOutletConfiguratorComponent.hasStatus(entry)).toBe(true);
    });

    it('should return true if first entry of configuration infos does not have NONE status', () => {
      const entry: OrderEntry = { configurationInfos: [{ status: 'NONE' }] };
      expect(cartItemOutletConfiguratorComponent.hasStatus(entry)).toBe(false);
    });
  });
});
