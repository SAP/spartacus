import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  Product,
  ProductService,
  ProductTestingModule,
  TranslatePipe,
} from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorRouterExtractorTestingModule,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { CarouselComponent } from '@spartacus/storefront';
import { of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorCommonsTestingModule } from '../../core/facade/testing/index';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { ConfiguratorVariantCarouselComponent } from './configurator-variant-carousel.component';

const PRODUCT_DESCRIPTION = 'Here is a product description';
const PRODUCT_CODE = 'CONF_LAPTOP';
const PRODUCT_NAME = 'productName';
const imageURL = 'some URL';
const altText = 'some text';

const product: Product = {
  name: PRODUCT_NAME,
  code: PRODUCT_CODE,
  description: PRODUCT_DESCRIPTION,
  images: {
    PRIMARY: {
      thumbnail: {
        url: imageURL,
        altText: altText,
      },
    },
  },
  price: {
    formattedValue: '$1.500',
  },
  priceRange: {
    maxPrice: {
      formattedValue: '$1.500',
    },
    minPrice: {
      formattedValue: '$1.000',
    },
  },
};

@Component({
  selector: 'cx-carousel',
  template: '',
})
class MockCarouselComponent {
  @Input() items: any;
  @Input() template: any;
  @Input() itemWidth: any;
  @Input() hideIndicators: any;
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

let component: ConfiguratorVariantCarouselComponent;
let fixture: ComponentFixture<ConfiguratorVariantCarouselComponent>;
let htmlElem: HTMLElement;

function initialize(configuration: Configurator.Configuration) {
  vi.spyOn(
    TestBed.inject(ConfiguratorRouterExtractorService),
    'extractRouterData'
  ).mockReturnValue(of(router));
  vi.spyOn(
    TestBed.inject(ConfiguratorCommonsService),
    'getConfiguration'
  ).mockReturnValue(of(configuration));
  vi.spyOn(TestBed.inject(ProductService), 'get').mockReturnValue(of(product));
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
      imports: [
        ConfiguratorVariantCarouselComponent,
        ProductTestingModule,
        I18nTestingModule,
        ConfiguratorRouterExtractorTestingModule,
        ConfiguratorCommonsTestingModule,
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
