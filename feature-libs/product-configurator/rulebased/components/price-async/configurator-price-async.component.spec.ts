import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';
import { DirectionMode, DirectionService } from '@spartacus/storefront';
import { CommonConfiguratorTestUtilsService } from 'feature-libs/product-configurator/common/testing/common-configurator-test-utils.service';
import { EMPTY, Observable, Subject, of } from 'rxjs';
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
    fixture.detectChanges();
    configSubject.next(mockConfig);
    fixture.detectChanges();
  }

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  it('should not display anything if there are no price supplements', () => {
    mockConfig = structuredClone(mockConfigTemplate); // copy so we can manipulate
    mockConfig.priceSupplements = undefined;
    initComponent({
      attributeKey: 'group1@attribute_1_2',
      valueName: 'value_2_3',
    });
    expect(htmlElem.textContent).toBe('');
  });

  it('should not display zero value price ', () => {
    initComponent({
      attributeKey: 'group1@attribute_1_1',
      valueName: 'value_1_2',
    });

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-price'
    );
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

  it('should display formatted value price when it is greater than zero', () => {
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

  it('should display formatted value price when it is smaller than zero', () => {
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

  it('should display formatted value price when it is greater than zero with RTL direction', () => {
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

  it('should display formatted value price when it is smaller than zero with RTL direction', () => {
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
});
