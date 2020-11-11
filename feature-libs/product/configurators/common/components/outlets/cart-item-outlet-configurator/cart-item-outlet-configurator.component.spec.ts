import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeaturesConfigModule,
  I18nTestingModule,
  OrderEntry,
} from '@spartacus/core';
import { GenericConfiguratorModule } from '@spartacus/storefront';
import { CartItemOutletConfiguratorComponent } from './cart-item-outlet-configurator.component';

describe('CartItemOutletConfiguratorComponent', () => {
  let cartItemComponent: CartItemOutletConfiguratorComponent;
  let fixture: ComponentFixture<CartItemOutletConfiguratorComponent>;
  let el: DebugElement;

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
        {
          provide: ControlContainer,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemOutletConfiguratorComponent);
    cartItemComponent = fixture.componentInstance;

    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create CartItemComponent', () => {
    expect(cartItemComponent).toBeTruthy();
  });

  describe('Depicting configurable products in the cart', () => {
    it('should not display resolve errors message if array of statusSummary is empty', () => {
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-error-container').length).toBe(
        0,
        "expected resolve errors message identified by selector '.cx-error-container' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should not display resolve errors message if number of issues is 0', () => {
      //cartItemComponent.cartItem.statusSummaryList = [{ numberOfIssues: 0 }];
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-error-container').length).toBe(
        0,
        "expected resolve errors message identified by selector '.cx-error-container' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should not display resolve errors message if number of issues is greater than 0 and readOnly is true', () => {
      //cartItemComponent.item.statusSummaryList = [
      //  { numberOfIssues: 1, status: OrderEntryStatus.Error },
      //];
      //cartItemComponent.readonly = true;
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-error-container').length).toBe(
        0,
        "expected resolve errors message identified by selector '.cx-error-container' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should display resolve errors message if number of issues is greater than 0 and read only is false', () => {
      //cartItemComponent.item.statusSummaryList = [
      //  { numberOfIssues: 1, status: OrderEntryStatus.Error },
      //];
      //cartItemComponent.readonly = false;
      fixture.detectChanges();
      const htmlElem = fixture.nativeElement;
      expect(
        htmlElem.querySelectorAll('.cx-error-container').length
      ).toBeGreaterThan(
        0,
        "expected resolve errors message identified by selector '.cx-error-container' to be present, but it is NOT! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should not display configuration info if array of configurationInfo is empty', () => {
      const htmlElem = fixture.nativeElement;
      expect(htmlElem.querySelectorAll('.cx-configuration-info').length).toBe(
        0,
        "expected configuration info identified by selector '.cx-configuration-info' not to be present, but it is! innerHtml: " +
          htmlElem.innerHTML
      );
    });

    it('should display configuration info if array of configurationInfo is not empty', () => {
      const configurationInfo = {
        configurationLabel: 'Color',
        configurationValue: 'Blue',
        configuratorType: 'CPQCONFIGURATOR',
        status: 'SUCCESS',
      };
      console.log('CHHI: ' + configurationInfo);
      //cartItemComponent.item.configurationInfos = [configurationInfo];
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
      //cartItemComponent.item.configurationInfos = [{ status: 'ERROR' }];
      const entry: OrderEntry = { configurationInfos: [{ status: 'ERROR' }] };
      expect(cartItemComponent.hasStatus(entry)).toBe(true);
    });

    it('should return true if first entry of configuration infos does not have NONE status', () => {
      //cartItemComponent.item.configurationInfos = [{ status: 'NONE' }];
      const entry: OrderEntry = { configurationInfos: [{ status: 'NONE' }] };
      expect(cartItemComponent.hasStatus(entry)).toBe(false);
    });
  });
});
