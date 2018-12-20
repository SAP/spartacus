import { DebugElement, Pipe, PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductService, Product, Component } from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { BootstrapModule } from '../../bootstrap.module';
import { PictureComponent } from '../../ui/components/media/picture/picture.component';

import { ProductCarouselComponent } from './product-carousel.component';
import { CmsComponentData } from '../../cms';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

const productCodeArray: string[] = ['111111', '222222', '333333', '444444'];

const mockComponentData: any = {
  uid: '001',
  typeCode: 'ProductCarouselComponent',
  modifiedTime: '2017-12-21T18:15:15+0000',
  popup: 'false',
  productCodes: productCodeArray.join(' '),
  scroll: 'ALLVISIBLE',
  title: 'Mock Title',
  name: 'Mock Product Carousel',
  type: 'Product Carousel',
  container: 'false'
};

const mockProduct: Product = {
  code: 'C001',
  name: 'Camera',
  price: {
    formattedValue: '$100.00'
  }
};

const MockCmsComponentData = <CmsComponentData<Component>>{
  data$: of(mockComponentData)
};

class MockProductService {
  get(): Observable<any> {
    return of(mockProduct);
  }

  isProductLoaded(): Observable<boolean> {
    return of(true);
  }
}

describe('ProductCarouselComponent', () => {
  let productCarouselComponent: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BootstrapModule],
      declarations: [
        ProductCarouselComponent,
        PictureComponent,
        MockTranslateUrlPipe
      ],
      providers: [
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: ProductService, useClass: MockProductService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselComponent);
    productCarouselComponent = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should be created', () => {
    expect(productCarouselComponent).toBeTruthy();
  });

  it('should have productCodes', () => {
    expect(productCarouselComponent.productCodes).toEqual(productCodeArray);
  });

  it('should have 1 group', () => {
    spyOn<any>(productCarouselComponent, 'getItemsPerPage').and.returnValue(4);
    expect(productCarouselComponent.productGroups.length).toBe(1);
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(
      el.query(By.css('.cx-carousel__header')).nativeElement.textContent
    ).toContain(mockComponentData.title);
  });
});
