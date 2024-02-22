import { Pipe, PipeTransform, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule, Product, RoutingService } from '@spartacus/core';
import {
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorProductScope } from '../../core/model/configurator-product-scope';
import { CommonConfiguratorTestUtilsService } from '../../testing/common-configurator-test-utils.service';
import {
  ConfiguratorType,
  ReadOnlyPostfix,
} from './../../core/model/common-configurator.model';
import { ConfigureProductComponent } from './configure-product.component';

const productCode = 'CONF_LAPTOP';
const configuratorType = ConfiguratorType.VARIANT;
const mockProduct: Product = {
  code: productCode,
  configurable: true,
  configuratorType: configuratorType,
};

const mockProductNotConfigurable: Product = {
  configurable: false,
};

class MockCurrentProductService implements Partial<CurrentProductService> {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

class MockCurrentProductServiceReturnsNull
  implements Partial<CurrentProductService>
{
  getProduct(): Observable<Product | null> {
    return of(null);
  }
}

class MockProductListItemContext implements Partial<ProductListItemContext> {
  product$ = of(mockProduct);
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

let component: ConfigureProductComponent;
let currentProductService: CurrentProductService;
let fixture: ComponentFixture<ConfigureProductComponent>;
let htmlElem: HTMLElement;

function setupWithCurrentProductService(
  useCurrentProductServiceOnly: boolean,
  currenProductServiceReturnsNull: boolean = false
) {
  if (useCurrentProductServiceOnly && currenProductServiceReturnsNull) {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterModule],
      declarations: [ConfigureProductComponent, MockUrlPipe],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductServiceReturnsNull,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    }).compileComponents();
  } else if (useCurrentProductServiceOnly) {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [ConfigureProductComponent, MockUrlPipe],
      providers: [
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
  } else {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
      ],
      declarations: [ConfigureProductComponent, MockUrlPipe],
      providers: [
        {
          provide: ProductListItemContext,
          useClass: MockProductListItemContext,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
  }

  currentProductService = TestBed.inject(
    CurrentProductService as Type<CurrentProductService>
  );

  spyOn(currentProductService, 'getProduct').and.callThrough();

  fixture = TestBed.createComponent(ConfigureProductComponent);
  component = fixture.componentInstance;
  htmlElem = fixture.nativeElement;
}

describe('ConfigureProductComponent', () => {
  it('should create component', () => {
    setupWithCurrentProductService(true);
    expect(component).toBeDefined();
  });

  it('should call currentProductService with configurator scope only as we do not need more scopes', () => {
    setupWithCurrentProductService(true);
    expect(currentProductService.getProduct).toHaveBeenCalledWith(
      ConfiguratorProductScope.CONFIGURATOR
    );
  });

  it('should show button', () => {
    setupWithCurrentProductService(true);
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn'
    );
  });

  it('should display configure button text', () => {
    setupWithCurrentProductService(true);
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.btn',
      'configurator.header.toconfig'
    );
  });

  it('should emit product in case it was launched with current product service', (done) => {
    setupWithCurrentProductService(true);
    component.product$.subscribe((product) => {
      expect(product).toBe(mockProduct);
      done();
    });
  });

  it('should emit non-configurable dummy in case it was launched with product service which emits null', (done) => {
    setupWithCurrentProductService(true, true);
    component.product$.subscribe((product) => {
      expect(product).toEqual(mockProductNotConfigurable);
      done();
    });
  });

  it('should show button in case it was launched with product item context', () => {
    setupWithCurrentProductService(false);
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn'
    );
  });

  it('should emit product in case it was launched with product item context', (done) => {
    setupWithCurrentProductService(false);
    component.product$.subscribe((product) => {
      expect(product).toBe(mockProduct);
      done();
    });
  });

  describe('getAriaLabelTranslationKey', () => {
    beforeEach(() => {
      setupWithCurrentProductService(true);
    });

    it('should return configurator.a11y.configureProduct in case configurator type is undefined', () => {
      expect(component.getAriaLabelTranslationKey(undefined)).toEqual(
        'configurator.a11y.configureProduct'
      );
    });

    it('should return configurator.a11y.configureProduct in case configurator type is CPQCONFIGURATOR', () => {
      expect(
        component.getAriaLabelTranslationKey(ConfiguratorType.VARIANT)
      ).toEqual('configurator.a11y.configureProduct');
    });

    it('should return configurator.a11y.showDetailsProduct in case configurator type has postfix read only', () => {
      expect(
        component.getAriaLabelTranslationKey(
          ConfiguratorType.VARIANT + ReadOnlyPostfix
        )
      ).toEqual('configurator.a11y.showDetailsProduct');
    });
  });

  describe('getTranslationKey', () => {
    beforeEach(() => {
      setupWithCurrentProductService(true);
    });

    it('should return configurator.header.toconfig in case configurator type is undefined', () => {
      expect(component.getTranslationKey(undefined)).toEqual(
        'configurator.header.toconfig'
      );
    });

    it('should return configurator.header.toconfig in case configurator type is CPQCONFIGURATOR', () => {
      expect(component.getTranslationKey(ConfiguratorType.VARIANT)).toEqual(
        'configurator.header.toconfig'
      );
    });

    it('should return configurator.header.toConfigReadOnly in case configurator type has postfix read only', () => {
      expect(
        component.getTranslationKey(ConfiguratorType.VARIANT + ReadOnlyPostfix)
      ).toEqual('configurator.header.toConfigReadOnly');
    });
  });

  describe('isDisplayRestartDialog', () => {
    beforeEach(() => {
      setupWithCurrentProductService(true);
    });

    it('should return true in case configurator type is CPQCONFIGURATOR', () => {
      expect(
        component.isDisplayRestartDialog(ConfiguratorType.VARIANT)
      ).toEqual('true');
    });

    it('should return false in case configurator type has postfix readOnly', () => {
      expect(
        component.isDisplayRestartDialog(
          ConfiguratorType.VARIANT + ReadOnlyPostfix
        )
      ).toEqual('false');
    });
  });

  describe('isConfiguratorTypeReadOnly', () => {
    beforeEach(() => {
      setupWithCurrentProductService(true);
    });

    it('should return false in case configurator type is undefined', () => {
      expect(component['isConfiguratorTypeReadOnly'](undefined)).toBe(false);
    });

    it('should return false in case configurator type is null', () => {
      expect(component['isConfiguratorTypeReadOnly'](null)).toBe(false);
    });

    it('should return false in case configurator type is empty string', () => {
      expect(component['isConfiguratorTypeReadOnly']('')).toBe(false);
    });

    it('should return false in case configurator type is string with whitespace', () => {
      expect(component['isConfiguratorTypeReadOnly']('   ')).toBe(false);
    });

    it('should return false in case configurator type is CPQCONFIGURATOR', () => {
      expect(
        component['isConfiguratorTypeReadOnly'](ConfiguratorType.VARIANT)
      ).toBe(false);
    });

    it('should return false in case configurator type has prefix _READ_ONLY', () => {
      expect(
        component['isConfiguratorTypeReadOnly'](
          ReadOnlyPostfix + ConfiguratorType.VARIANT
        )
      ).toBe(false);
    });

    it('should return true in case configurator type has postfix _READ_ONLY', () => {
      expect(
        component['isConfiguratorTypeReadOnly'](
          ConfiguratorType.VARIANT + ReadOnlyPostfix
        )
      ).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('should contain a link element with aria-label attribute that contains a hidden link content', function () {
      setupWithCurrentProductService(true);
      fixture.detectChanges();

      CommonConfiguratorTestUtilsService.expectElementContainsA11y(
        expect,
        htmlElem,
        'a',
        'btn',
        undefined,
        'aria-label',
        'configurator.a11y.configureProduct',
        'configurator.header.toconfig'
      );
    });
  });
});
