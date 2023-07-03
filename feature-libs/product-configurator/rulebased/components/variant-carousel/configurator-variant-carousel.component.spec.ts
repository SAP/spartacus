import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorVariantCarouselComponent } from './configurator-variant-carousel.component';
import { Observable, of } from 'rxjs';
import { Product, ProductService, TranslationService } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorModelUtils,
  ConfiguratorRouter,
  ConfiguratorRouterExtractorService,
  ConfiguratorType,
} from '@spartacus/product-configurator/common';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorCommonsService } from '../../core/facade/configurator-commons.service';
import { ConfiguratorTestUtils } from '../../testing/configurator-test-utils';
import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { CommonConfiguratorTestUtilsService } from '../../../common/testing/common-configurator-test-utils.service';

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
  @Input() items;
  @Input() template;
  @Input() itemWidth;
  @Input() hideIndicators;
}

@Pipe({
  name: 'cxTranslate',
})
class MockTranslatePipe implements PipeTransform {
  transform(): any {}
}

class MockTranslationService {
  translate(): Observable<string> {
    return of('Pre-configured Versions');
  }
}

class MockProductService {
  get(): Observable<Product> {
    return of(product);
  }
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
class MockConfiguratorCommonsService {
  getConfiguration(): Observable<Configurator.Configuration> {
    return configurationObs;
  }
}

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
      declarations: [
        ConfiguratorVariantCarouselComponent,
        MockTranslatePipe,
        MockCarouselComponent,
      ],
      providers: [
        {
          provide: ProductService,
          useClass: MockProductService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: ConfiguratorRouterExtractorService,
          useClass: MockConfigRouterExtractorService,
        },
        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    }).compileComponents();
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
