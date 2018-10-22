import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import * as NgrxStore from '@ngrx/store';
import { of } from 'rxjs';

import { BootstrapModule } from '../../bootstrap.module';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import * as fromProductStore from '../../product/store';
import * as fromRoot from '../../routing/store';
import { CmsService } from '../../cms/facade/cms.service';
import * as fromCmsReducer from '../../cms/store/reducers';
import { PictureComponent } from '../../ui/components/media/picture/picture.component';

import { ProductCarouselComponent } from './product-carousel.component';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    ProductCarouselComponent: 'ProductCarouselComponent'
  }
};

describe('ProductCarouselComponent in CmsLib', () => {
  let productCarouselComponent: ProductCarouselComponent;
  let fixture: ComponentFixture<ProductCarouselComponent>;
  let el: DebugElement;

  const mockComponentData = {
    uid: '001',
    typeCode: 'ProductCarouselComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    popup: 'false',
    productCodes: '111111 222222 333333 444444',
    scroll: 'ALLVISIBLE',
    title: 'Mock Title',
    name: 'Mock Product Carousel',
    type: 'Product Carousel',
    container: 'false'
  };

  const mockProducts = [
    {
      uid: '001',
      code: 'C001',
      name: 'Camera',
      price: {
        formattedValue: '$100.00'
      }
    }
  ];

  const MockCmsService = {
    getComponentData: () => of(mockComponentData)
  };

  const productCodeArray = ['111111', '222222', '333333', '444444'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgrxStore.StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: NgrxStore.combineReducers(fromCmsReducer.getReducers())
        }),
        BootstrapModule
      ],
      declarations: [ProductCarouselComponent, PictureComponent],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselComponent);
    productCarouselComponent = fixture.componentInstance;

    el = fixture.debugElement;

    spyOnProperty(NgrxStore, 'select').and.returnValue(realSelector => {
      if (realSelector === fromProductStore.getAllProductCodes) {
        return () => of(productCodeArray);
      }
      return () => of(mockProducts);
    });
  });

  it('should be created', () => {
    expect(productCarouselComponent).toBeTruthy();
  });

  it('should call getProductCodes()', () => {
    spyOn(productCarouselComponent, 'getProductCodes').and.returnValue(
      productCodeArray
    );
    const codes = productCarouselComponent.getProductCodes();
    expect(productCarouselComponent.getProductCodes).toHaveBeenCalled();
    expect(codes).toBe(productCodeArray);
  });

  it('should contain cms content in the html rendering after bootstrap', () => {
    expect(productCarouselComponent.component).toBeNull();

    productCarouselComponent.onCmsComponentInit(mockComponentData.uid);
    fixture.detectChanges();
    expect(productCarouselComponent.component).toBe(mockComponentData);
    expect(
      el.query(By.css('.y-carousel__header')).nativeElement.textContent
    ).toEqual(productCarouselComponent.component.title);
  });
});
