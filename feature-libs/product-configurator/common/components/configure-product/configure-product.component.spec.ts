import { Pipe, PipeTransform, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import {
  CurrentProductService,
  ProductListItemContext,
  ProductListItemContextOwner,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ConfiguratorProductScope } from '../../core/model/configurator-product-scope';
import { CommonConfiguratorTestUtilsService } from '../../shared/testing/common-configurator-test-utils.service';
import { ConfigureProductComponent } from './configure-product.component';

const productCode = 'CONF_LAPTOP';
const configuratorType = 'CPQCONFIGURATOR';
const mockProduct: Product = {
  code: productCode,
  configurable: true,
  configuratorType: configuratorType,
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

let component: ConfigureProductComponent;
let currentProductService: CurrentProductService;
let productListItemContext: ProductListItemContext;
let fixture: ComponentFixture<ConfigureProductComponent>;
let htmlElem: HTMLElement;

function setupWithCurrentProductService(useCurrentProductServiceOnly: boolean) {
  if (useCurrentProductServiceOnly) {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
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
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [ConfigureProductComponent, MockUrlPipe],
      providers: [
        {
          provide: ProductListItemContext,
          useClass: ProductListItemContextOwner,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
    productListItemContext = TestBed.inject(
      ProductListItemContext as Type<ProductListItemContext>
    );
    if (productListItemContext) {
      (productListItemContext as ProductListItemContextOwner).setProduct(
        mockProduct
      );
    }
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
});
