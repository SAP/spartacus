import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  I18nTestingModule,
  ImageType,
  Product,
  ProductService,
} from '@spartacus/core';
import { MediaModule } from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';
import { ConfiguratorPriceComponentOptions } from '../price/configurator-price.component';
import { ConfiguratorOverviewBundleAttributeComponent } from './configurator-overview-bundle-attribute.component';

@Pipe({
  name: 'cxNumeric',
})
class MockNumericPipe implements PipeTransform {
  transform(): any {}
}

const mockAttributeOverviewInput: Configurator.AttributeOverview = {
  attribute: 'testAttribute',
  value: 'testValue',
  productCode: 'testProductCode',
  type: Configurator.AttributeOverviewType.BUNDLE,
};

const mockProductImageUrl = 'testUrl';

const mockProduct: Product = {
  code: 'testCode',
  name: 'testName',
  images: {
    [ImageType.PRIMARY]: {
      product: {
        url: mockProductImageUrl,
      },
    },
  },
};

const noCommerceProduct = { images: {} };

const product$: BehaviorSubject<Product> = new BehaviorSubject(null);

class MockProductService {
  get = () => product$.asObservable();
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'cx-configurator-price',
  template: '',
})
class MockConfiguratorPriceComponent {
  @Input() formula: ConfiguratorPriceComponentOptions;
}

describe('ConfiguratorOverviewBundleAttributeComponent', () => {
  let component: ConfiguratorOverviewBundleAttributeComponent;
  let fixture: ComponentFixture<ConfiguratorOverviewBundleAttributeComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MediaModule, I18nTestingModule],
        declarations: [
          ConfiguratorOverviewBundleAttributeComponent,
          MockConfiguratorPriceComponent,
          MockNumericPipe,
        ],
        providers: [{ provide: ProductService, useClass: MockProductService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(
      ConfiguratorOverviewBundleAttributeComponent
    );
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    component.attributeOverview = mockAttributeOverviewInput;
    component.ngOnInit();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('product', () => {
    it('should use dummy product if no product code exists', (done: DoneFn) => {
      product$.next(null);

      fixture.detectChanges();

      component.product$.pipe(take(1)).subscribe((product: Product) => {
        expect(product).toEqual(noCommerceProduct);

        done();
      });
    });

    it('should exist with product code', (done: DoneFn) => {
      product$.next(mockProduct);

      fixture.detectChanges();

      component.product$.pipe(take(1)).subscribe((product: Product) => {
        expect(product).toEqual(mockProduct);

        done();
      });
    });
  });

  describe('getProductPrimaryImage()', () => {
    it('should return primary image', () => {
      const image = component.getProductPrimaryImage(mockProduct);

      expect(image).toEqual(mockProduct.images[ImageType.PRIMARY]);
    });

    it('should not return image if no primary image', () => {
      const noImageProduct: Product = { ...mockProduct, images: {} };

      const image = component.getProductPrimaryImage(noImageProduct);

      expect(image).toBeFalsy();
    });
  });

  describe('UI', () => {
    const getProductImage = () =>
      fixture.debugElement.queryAll(By.css('.cx-thumbnail img'))[0];

    describe('product image', () => {
      it('should be visible if primary', () => {
        product$.next(mockProduct);

        fixture.detectChanges();

        expect(getProductImage().attributes['src']).toEqual(
          mockProductImageUrl
        );
      });

      it('should not be visible if not existing or not primary', () => {
        product$.next(null);

        fixture.detectChanges();

        expect(getProductImage()).toBeUndefined();
      });
    });
  });
});
