import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsProductReferencesComponent, Product } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';
import { CarouselItem } from '../../../../shared/components/carousel/carousel.model';
import { CurrentProductService } from '../../current-product.service';
import { ProductCarouselService } from '../product-carousel.service';
import { ProductReferencesComponent } from './product-references.component';

@Component({
  selector: 'cx-carousel',
  template: '',
})
class MockCarouselComponent {
  @Input() items: CarouselItem[];
  @Input() title: string;
}

const productCode = 'productCode';
const product = {
  code: productCode,
  name: 'testProduct',
};

const mockComponentData: CmsProductReferencesComponent = {
  uid: '001',
  typeCode: 'ProductReferencesComponent',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  productReferenceTypes: 'SIMILAR',
  title: 'Mock Title',
  name: 'Mock UIProduct References',
  container: 'false',
  displayProductTitles: 'true',
  displayProductPrices: 'true',
};

const MockCmsProductReferencesComponent = <CmsComponentData<any>>{
  data$: of(mockComponentData),
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(product);
  }
}

class MockProductCarouselService {
  getProductReferences() {
    return of([]);
  }
}

describe('ProductReferencesComponent', () => {
  let productReferencesComponent: ProductReferencesComponent;
  let fixture: ComponentFixture<ProductReferencesComponent>;
  //   let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductReferencesComponent, MockCarouselComponent],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsProductReferencesComponent,
        },
        {
          provide: ProductCarouselService,
          useClass: MockProductCarouselService,
        },
        {
          provide: CurrentProductService,
          useClass: MockCurrentProductService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReferencesComponent);
    productReferencesComponent = fixture.componentInstance;
    fixture.detectChanges();
    // el = fixture.debugElement;
  });

  it('should be created', async(() => {
    expect(productReferencesComponent).toBeTruthy();
  }));
});
