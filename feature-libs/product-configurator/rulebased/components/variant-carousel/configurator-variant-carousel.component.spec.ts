import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  ProductService,
  TranslatePipe,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { CarouselComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { Configurator } from '../../core/model/configurator.model';
import {
  MockConfiguratorProviderService,
  provideConfiguratorMockCommonsService,
} from '../../testing';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorVariantCarouselComponent } from './configurator-variant-carousel.component';

const PRODUCT_CODE = 'CONF_LAPTOP';

@Component({
  selector: 'cx-carousel',
  template: '',
})
class MockCarouselComponent {
  @Input() items;
  @Input() template;
  @Input() itemWidth;
  @Input() hideIndicators;
}

class MockConfigRouterExtractorService {
  extractRouterData() {
    return of(router);
  }
}

let configurationWithoutVariants: Configurator.Configuration =
  ConfiguratorTestUtils.createConfiguration(
    'a',
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    )
  );

let configurationWithVariants: Configurator.Configuration =
  ConfiguratorTestUtils.createConfigurationWithVariants(
    'a',
    ConfiguratorModelUtils.createOwner(
      CommonConfigurator.OwnerType.PRODUCT,
      PRODUCT_CODE
    )
  );

let configurationObs: any;
let component: ConfiguratorVariantCarouselComponent;
let fixture: ComponentFixture<ConfiguratorVariantCarouselComponent>;
let htmlElem: HTMLElement;

function initialize(configuration: Configurator.Configuration) {
  configurationObs = of(configuration);
  fixture = TestBed.createComponent(ConfiguratorVariantCarouselComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
  fixture.detectChanges();
}

const router: ConfiguratorRouter.Data = {
  pageType: ConfiguratorRouter.PageType.CONFIGURATION,
  isOwnerCartEntry: true,
  owner: ConfiguratorModelUtils.createOwner(
    CommonConfigurator.OwnerType.PRODUCT,
    '3',
    ConfiguratorType.VARIANT
  ),
};

describe('ConfiguratorVariantCarouselComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfiguratorVariantCarouselComponent],
      providers: [
        {
          provide: ProductService,
          useClass: MockConfiguratorProviderService.MockProductService,
        },
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfigRouterExtractorService,
        },
        provideConfiguratorMockCommonsService({
          configurationSource: () => configurationObs,
        }),
      ],
    })
      .overrideComponent(ConfiguratorVariantCarouselComponent, {
        remove: {
          imports: [TranslatePipe, CarouselComponent],
        },
        add: {
          imports: [I18nTestingModule, MockCarouselComponent],
        },
      })
      .compileComponents();
  });

  it('should create a component without variants', () => {
    initialize(configurationWithoutVariants);
    expect(component).toBeTruthy();
    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      '.cx-variant-carousel-container'
    );

    CommonConfiguratorTestUtilsService.expectElementNotPresent(
      expect,
      htmlElem,
      'cx-carousel'
    );
  });

  it('should create a component with variants', () => {
    initialize(configurationWithVariants);
    expect(component).toBeTruthy();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.cx-variant-carousel-container'
    );

    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      'cx-carousel'
    );
  });
});
