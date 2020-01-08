import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../../../product';
import { ConfigureProductComponent } from './configure-product.component';

const productCode = 'CONF_LAPTOP';
const otherProductCode = 'CAR';
const configuratorType = 'CPQCONFIGURATOR';

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of({
      code: productCode,
      configurable: true,
      configuratorType: configuratorType,
    });
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

function checkAttributesFromCurrentProductService(
  component: ConfigureProductComponent
) {
  expect(component.productCode).toBe(productCode);
  expect(component.configuratorType).toBe(configuratorType);
}

describe('ConfigureProductComponent', () => {
  let component: ConfigureProductComponent;
  let fixture: ComponentFixture<ConfigureProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [ConfigureProductComponent, MockUrlPipe],
      providers: [
        { provide: CurrentProductService, useClass: MockCurrentProductService },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureProductComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should be aware of configurability and configurator type in case they are not provided as input', () => {
    component.product$.subscribe(product => {
      expect(product.code).toBe(productCode);
      expect(product.configurable).toBe(true);
      expect(product.configuratorType).toBe(configuratorType);
    });
  });

  it('should take over product attributes from current product service in case they have not been provided as input', () => {
    component.ngOnInit();
    checkAttributesFromCurrentProductService(component);
  });

  it('should not take over product attributes from current product service in case input is provided', () => {
    component.productCode = otherProductCode;
    component.ngOnInit();
    expect(component.productCode).toBe(otherProductCode);
    expect(component.configuratorType).toBeFalsy();
  });

  it('should not take configurator type into consideration for taking over attributes from product service', () => {
    component.configuratorType = 'A type';
    component.ngOnInit();
    checkAttributesFromCurrentProductService(component);
  });
});
