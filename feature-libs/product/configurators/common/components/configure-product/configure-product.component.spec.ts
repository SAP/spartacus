import { Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CurrentProductService } from '../../../../../../projects/storefrontlib/src/cms-components/product';
import { OutletContextData } from '../../../../../../projects/storefrontlib/src/cms-structure/outlet/outlet.model';
import { ConfigureProductComponent } from './configure-product.component';

const productCode = 'CONF_LAPTOP';
const productCodeFromOutletContext = 'CONF_MACHINE';

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

  it('should create component', () => {
    fixture = TestBed.createComponent(ConfigureProductComponent);
    component = fixture.componentInstance;
    expect(component).toBeDefined();
  });

  it('should create product context from currentProductService if not provided via outlet context', (done) => {
    fixture = TestBed.createComponent(ConfigureProductComponent);
    component = fixture.componentInstance;
    expect(component.productContext).toBeDefined();
    component.productContext.context$
      .subscribe((ctx) => expect(ctx.product.code).toBe(productCode))
      .unsubscribe();
    done();
  });

  it('should create product context from outlet context if available', (done) => {
    const outletContext: OutletContextData = {
      reference: undefined,
      position: undefined,
      context: undefined,
      context$: of({
        code: productCodeFromOutletContext,
        configurable: true,
        configuratorType: configuratorType,
      }).pipe(map((pr) => ({ product: pr }))),
    };

    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      declarations: [ConfigureProductComponent, MockUrlPipe],
      providers: [
        { provide: OutletContextData, useValue: outletContext },
        { provide: CurrentProductService, useClass: MockCurrentProductService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ConfigureProductComponent);
    component = fixture.componentInstance;
    expect(component.productContext).toBeDefined();
    component.productContext.context$
      .subscribe((ctx) =>
        expect(ctx.product.code).toBe(productCodeFromOutletContext)
      )
      .unsubscribe();
    done();
  });
});
