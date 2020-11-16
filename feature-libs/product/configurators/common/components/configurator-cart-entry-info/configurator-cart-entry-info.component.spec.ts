import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
} from '@spartacus/core';
import { CartItemContext, CartItemContextModel } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import {
  ConfigurationInfo,
  StatusSummary,
} from './../../core/model/common-configurator.model';
import { ConfiguratorCartEntryInfoComponent } from './configurator-cart-entry-info.component';

function setContext(
  cartItemOutletConfiguratorComponent: ConfiguratorCartEntryInfoComponent,
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
  const context$ = cartItemOutletConfiguratorComponent.cartItemContext
    .context$ as BehaviorSubject<CartItemContextModel>;
  context$.next({ ...context$.value, ...newChunk });
}

describe('ConfiguratorCartEntryInfoComponent', () => {
  let configuratorCartEntryInfoComponent: ConfiguratorCartEntryInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCartEntryInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        I18nTestingModule,

        FeaturesConfigModule,
      ],
      declarations: [ConfiguratorCartEntryInfoComponent],
      providers: [
        CartItemContext,
        {
          provide: ControlContainer,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorCartEntryInfoComponent);

    configuratorCartEntryInfoComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create CartItemOutletConfiguratorComponent', () => {
    expect(configuratorCartEntryInfoComponent).toBeTruthy();
  });

  it('should know cart item context', () => {
    expect(configuratorCartEntryInfoComponent.cartItemContext).toBeTruthy();
  });

  describe('Depicting configurable products in the cart', () => {
    it('should not display configuration info if array of configurationInfo is empty', () => {
      setContext(configuratorCartEntryInfoComponent, null, null, false);
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        0,
        "expected configuration info identified by selector '.cx-configuration-info' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should display configuration info if array of configurationInfo is not empty and of status success', () => {
      setContext(
        configuratorCartEntryInfoComponent,
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
      expect(configuratorCartEntryInfoComponent.hasStatus(entry)).toBe(true);
    });

    it('should return true if first entry of configuration infos does not have NONE status', () => {
      const entry: OrderEntry = { configurationInfos: [{ status: 'NONE' }] };
      expect(configuratorCartEntryInfoComponent.hasStatus(entry)).toBe(false);
    });
  });
});
