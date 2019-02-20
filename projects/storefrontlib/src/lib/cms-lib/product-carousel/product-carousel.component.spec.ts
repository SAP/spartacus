import { ProductCarouselService } from './product-carousel.service';
import { Pipe, PipeTransform, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import {
  ProductService,
  Product,
  Component,
  CmsProductCarouselComponent
} from '@spartacus/core';

import { of, Observable } from 'rxjs';

import { PictureComponent } from '../../ui/components/media/picture/picture.component';

import { ProductCarouselComponent } from './product-carousel.component';
import { CmsComponentData } from '../../cms/components/cms-component-data';
import { By } from '@angular/platform-browser';

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform(): any {}
}

const productCodeArray: string[] = ['111111', '222222', '333333', '444444'];

const mockComponentData: CmsProductCarouselComponent = {
  uid: '001',
  typeCode: 'ProductCarouselComponent',
  modifiedtime: new Date('2017-12-21T18:15:15+0000'),
  popup: 'false',
  productCodes: productCodeArray.join(' '),
  scroll: 'ALLVISIBLE',
  title: 'Mock Title',
  name: 'Mock Product Carousel',
  container: 'false'
};

const mockProduct: Product = {
  code: '111111',
  name: 'Camera',
  price: {
    formattedValue: '$100.00'
  }
};

const MockCmsComponentData = <CmsComponentData<Component>>{
  data$: of(mockComponentData)
};

class MockProductService {
  get(): Observable<Product> {
    return of(mockProduct);
  }

  isProductLoaded(): Observable<boolean> {
    return of(true);
  }
}

class MockProductCarouselService {
  items$ = of([
    of(mockProduct),
    of(mockProduct),
    of(mockProduct),
    of(mockProduct)
  ]);
  itemSize$ = of(4);
  activeItem$ = of(0);
  title$ = of('Mock Title');

  setTitle = jasmine.createSpy('setTitle').and.callFake(() => of('Mock Title'));
  setItems = jasmine
    .createSpy('setItems')
    .and.callFake(() =>
      of([of(mockProduct), of(mockProduct), of(mockProduct), of(mockProduct)])
    );

  setItemSize = jasmine.createSpy('setItemSize');
  setItemAsActive = jasmine
    .createSpy('setItemAsActive')
    .and.callFake(() => of(1));
  setPreviousItemAsActive = jasmine.createSpy('setPreviousItemAsActive');
  setNextItemAsActive = jasmine.createSpy('setNextItemAsActive');
  getDelayValue = jasmine.createSpy('getDelayValue').and.callThrough();
}

describe('ProductCarouselComponent', () => {
  let productCarouselComponent: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        ProductCarouselComponent,
        PictureComponent,
        MockTranslateUrlPipe
      ],
      providers: [
        { provide: CmsComponentData, useValue: MockCmsComponentData },
        { provide: ProductService, useClass: MockProductService }
      ]
    })
      .overrideComponent(ProductCarouselComponent, {
        set: {
          providers: [
            {
              provide: ProductCarouselService,
              useClass: MockProductCarouselService
            }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselComponent);
    productCarouselComponent = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should be created', async(() => {
    productCarouselComponent.ngOnInit();
    expect(productCarouselComponent).toBeTruthy();
  }));

  it('should have products', async(() => {
    expect(productCarouselComponent.service.items$);

    let products$: Observable<Product>[];
    productCarouselComponent.service.setItems();
    productCarouselComponent.service.items$
      .subscribe(productData$ => {
        products$ = productData$;
      })
      .unsubscribe();
    expect(products$.length).toBe(productCodeArray.length);
  }));

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(el.query(By.css('h3')).nativeElement.textContent).toContain(
      mockComponentData.title
    );
  });
});
