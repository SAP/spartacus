import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { EMPTY, Observable, Subject, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import {
  ConfiguratorPriceAsyncComponent,
  ConfiguratorPriceAsyncComponentOptions,
} from './configurator-price-async.component';

/**
 * group1@attribute_1_1
 * - value_1_1: -$100
 * - value_1_2: $0
 * - value_1_3: $200
 *
 * group1@attribute_1_2
 * - value_1_1: -$100
 * - value_1_2: $100
 * - value_1_3: $300
 */
const mockConfigTemplate: Configurator.Configuration = {
  ...ConfiguratorTestUtils.createConfiguration('c123'),
  pricingEnabled: true,
  priceSupplements: ConfiguratorTestUtils.createListOfAttributeSupplements(
    false,
    1,
    0,
    2,
    3
  ),
};

const price1: Configurator.PriceDetails = {
  value: 10,
  formattedValue: '$10.00',
  currencyIso: 'USD',
};

let direction = DirectionMode.LTR;
class MockDirectionService {
  getDirection(): DirectionMode {
    return direction;
  }
}

const configSubject = new Subject<Configurator.Configuration>();
class MockConfiguratorCommonsService {
  getConfiguration(
    owner: CommonConfigurator.Owner
  ): Observable<Configurator.Configuration> {
    return owner === mockConfigTemplate.owner ? configSubject : EMPTY;
  }
}

class MockConfiguratorRouterExtractorService {
  extractRouterData() {
    return of({ owner: mockConfigTemplate.owner });
  }
}

describe('ConfiguratorPriceAsyncComponent', () => {
  let component: ConfiguratorPriceAsyncComponent;
  let fixture: ComponentFixture<ConfiguratorPriceAsyncComponent>;
  let htmlElem: HTMLElement;
  let mockConfig: Configurator.Configuration;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguratorPriceAsyncComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: DirectionService,
          useClass: MockDirectionService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfiguratorRouterExtractorService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    direction = DirectionMode.LTR;
    mockConfig = mockConfigTemplate;

    fixture = TestBed.createComponent(ConfiguratorPriceAsyncComponent);
    component = fixture.componentInstance;
    htmlElem = fixture.nativeElement;
    fixture.detectChanges();
  });

  function initComponent(options: ConfiguratorPriceAsyncComponentOptions) {
    component.options = options;
    spyOn(component.priceChanged, 'emit');
    fixture.detectChanges();
    configSubject.next(mockConfig);
    fixture.detectChanges();
  }

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should not display anything and not emit events if there are no price supplements', () => {
    mockConfig = structuredClone(mockConfigTemplate); // copy so we can manipulate
    mockConfig.priceSupplements = undefined;
    initComponent({
      attributeKey: 'group1@attribute_1_2',
      valueName: 'value_2_3',
    });
    expect(htmlElem.textContent).toBe('');
    expect(component.priceChanged.emit).not.toHaveBeenCalled();
  });

  it('should not display zero value price but emit price changed event', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_1',
      valueName: 'value_1_2',
    });

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-price'
    );
    expect(component.priceChanged.emit).toHaveBeenCalled();
  });

  it('should handle missing attribute price supplement', () => {
    initComponent({
      attributeKey: 'NOT_EXISTING',
      valueName: 'value_1_2',
    });

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-price'
    );
  });

  it('should handle missing value price supplement', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_1',
      valueName: 'NOT_EXISTING',
    });

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-price'
    );
  });

  it('should display formatted value price if it is greater than zero', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_2',
      valueName: 'value_2_3',
    });

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price',
      '+$300'
    );
  });

  it('should display formatted value price if it is smaller than zero', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_1',
      valueName: 'value_1_1',
    });

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price',
      '-$100'
    );
  });

  it('should display formatted value price if it is greater than zero with RTL direction', () => {
    direction = DirectionMode.RTL;
    initComponent({
      attributeKey: 'group1@attribute_1_2',
      valueName: 'value_2_3',
    });

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price',
      '$300+'
    );
  });

  it('should display formatted value price if it is smaller than zero with RTL direction', () => {
    direction = DirectionMode.RTL;
    initComponent({
      attributeKey: 'group1@attribute_1_1',
      valueName: 'value_1_1',
    });

    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.cx-price',
      '$100-'
    );
  });

  it('should light up value price when requested', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_2',
      valueName: 'value_2_3',
      isLightedUp: true,
    });

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-price'
    );
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-price.cx-greyed-out'
    );
  });

  it('should NOT light up value price when requested', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_2',
      valueName: 'value_2_3',
      isLightedUp: false,
    });

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-price.cx-greyed-out'
    );
  });

  it('should not emit price changed event when price is the same', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_2',
      valueName: 'value_2_3',
      isLightedUp: false,
    });
    expect(component.priceChanged.emit).toHaveBeenCalledTimes(1);
    configSubject.next(mockConfig); //send same prices
    expect(component.priceChanged.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit price changed event when price changes', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_2',
      valueName: 'value_2_3',
      isLightedUp: false,
    });
    expect(component.priceChanged.emit).toHaveBeenCalledTimes(1);
    mockConfig = structuredClone(mockConfig);
    const priceValue = (mockConfig.priceSupplements ?? [])[1]
      .valueSupplements[2].priceValue;
    priceValue.value = 1000;
    configSubject.next(mockConfig); //send modified prices
    expect(component.priceChanged.emit).toHaveBeenCalledTimes(2);
    expect(component.priceChanged.emit).toHaveBeenCalledWith({
      source: component.options,
      valuePrice: priceValue,
    });
  });

  describe('valuePriceChanged in unit test environment', () => {
    it('should return false for objects with same content', () => {
      const price2 = structuredClone(price1);
      expect(component['isValuePriceChanged'](price1, price2)).toBeFalsy();
    });

    it('should return true if value differs', () => {
      const price2 = structuredClone(price1);
      price2.value = 100;
      expect(component['isValuePriceChanged'](price1, price2)).toBeTruthy();
    });

    it('should return true if formatted value differs', () => {
      const price2 = structuredClone(price1);
      price2.formattedValue = '$100.00';
      expect(component['isValuePriceChanged'](price1, price2)).toBeTruthy();
    });

    it('should return true if currency  differs', () => {
      const price2 = structuredClone(price1);
      price2.currencyIso = 'EUR';
      expect(component['isValuePriceChanged'](price1, price2)).toBeTruthy();
    });
  });
});
