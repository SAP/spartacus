import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CurrentProductService } from '../../../product';
import { ConfigureProductComponent } from './configure-product.component';

const productCode = 'CONF_LAPTOP';
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

  it('should get product from currentProductService', () => {
    component.product$.subscribe(product =>
      expect(product.code).toBe(productCode)
    );
  });

  it('should be aware of configurability and configurator type', () => {
    component.product$.subscribe(product => {
      expect(product.configurable).toBe(true);
      expect(product.configuratorType).toBe(configuratorType);
    });
  });
});
