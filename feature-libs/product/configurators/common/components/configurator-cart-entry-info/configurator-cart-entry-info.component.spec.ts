import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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

function emitNewContextValue(
  cartItemOutletConfiguratorComponent: ConfiguratorCartEntryInfoComponent,
  statusSummary: StatusSummary[],
  configurationInfos: ConfigurationInfo[],
  readOnly: boolean
) {
  const cartItemContext: CartItemContextModel = {
    item: {
      statusSummaryList: statusSummary,
      configurationInfos: configurationInfos,
    },
    readonly: readOnly,
  };
  const context$ = cartItemOutletConfiguratorComponent.cartItemContext
    .context$ as BehaviorSubject<CartItemContextModel>;
  context$.next(cartItemContext);
}

describe('ConfiguratorCartEntryInfoComponent', () => {
  let configuratorCartEntryInfoComponent: ConfiguratorCartEntryInfoComponent;
  let fixture: ComponentFixture<ConfiguratorCartEntryInfoComponent>;

  beforeEach(
    waitForAsync(() => {
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
    })
  );

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

  describe('configuration infos', () => {
    it('should not be displayed if model provides empty array', () => {
      emitNewContextValue(
        configuratorCartEntryInfoComponent,
        null,
        null,
        false
      );
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        0,
        "expected configuration info identified by selector '.cx-configuration-info' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should be displayed if model provides a success entry', () => {
      emitNewContextValue(
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
        "expected configuration info identified by selector '.cx-configuration-info' to be present, but it is not! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should be displayed if model provides a warning entry', () => {
      emitNewContextValue(
        configuratorCartEntryInfoComponent,
        null,
        [
          {
            configurationLabel: 'Pricing',
            configurationValue: 'could not be carried out',
            configuratorType: 'CPQCONFIGURATOR',
            status: 'WARNING',
          },
        ],
        false
      );

      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        1,
        "expected configuration info identified by selector '.cx-configuration-info' to be present, but it is not! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    describe('hasStatus', () => {
      it('should be true if first entry of status summary is in error status', () => {
        const entry: OrderEntry = { configurationInfos: [{ status: 'ERROR' }] };
        expect(configuratorCartEntryInfoComponent.hasStatus(entry)).toBe(true);
      });

      it('should be false if first entry of status summary carries no status', () => {
        const entry: OrderEntry = { configurationInfos: [{ status: 'NONE' }] };
        expect(configuratorCartEntryInfoComponent.hasStatus(entry)).toBe(false);
      });
    });
  });
});
