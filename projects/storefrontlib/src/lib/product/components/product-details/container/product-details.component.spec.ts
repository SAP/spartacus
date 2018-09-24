import { ComponentsModule } from './../../../../ui/components/components.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { combineReducers, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';

import { ComponentMapperService } from '../../../../cms/services/component-mapper.service';
import { ProductService } from '../../../services/product.service';

import * as fromRoot from '../../../../routing/store';
import * as fromProduct from '../../../store/reducers';
import { BootstrapModule } from '../../../../bootstrap.module';
import { ProductDetailsComponent } from './product-details.component';

class MockComponentMapperService {}
describe('ProductDetailsComponent in product', () => {
  let service: ProductService;
  let productDetailsComponent: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  const mockProduct = 'mockProduct';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BootstrapModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromProduct.getReducers())
        }),
        ComponentsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ProductDetailsComponent],
      providers: [
        ProductService,
        {
          provide: ComponentMapperService,
          useClass: MockComponentMapperService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    fixture.detectChanges();
    productDetailsComponent = fixture.componentInstance;
    service = TestBed.get(ProductService);
    fixture.detectChanges();

    spyOn(service, 'get').and.returnValue(of(mockProduct));
  });

  it('should be created', () => {
    expect(productDetailsComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    productDetailsComponent.product$.subscribe(product =>
      expect(product).toEqual(mockProduct)
    );
  });

  it('should go to reviews tab', () => {
    productDetailsComponent.productCode = '123456';
    productDetailsComponent.ngOnChanges();
    productDetailsComponent.product$.subscribe(() => {
      fixture.detectChanges();
      productDetailsComponent.goToReviews();
      expect(productDetailsComponent.tabSet.activeId).toEqual('reviews');
    });
  });
});
