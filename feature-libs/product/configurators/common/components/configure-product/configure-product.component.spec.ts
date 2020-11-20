import { Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Product } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { CommonConfiguratorTestUtilsService } from '../../shared/testing/common-configurator-test-utils.service';
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
  let htmlElem: HTMLElement;

  beforeEach(
    waitForAsync(() => {
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
      fixture = TestBed.createComponent(ConfigureProductComponent);
      component = fixture.componentInstance;
      htmlElem = fixture.nativeElement;
    })
  );

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should show button', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementPresent(
      expect,
      htmlElem,
      '.btn'
    );
  });

  it('should display configure button text', () => {
    fixture.detectChanges();
    CommonConfiguratorTestUtilsService.expectElementToContainText(
      expect,
      htmlElem,
      '.btn',
      'configurator.header.toconfig'
    );
  });
});
