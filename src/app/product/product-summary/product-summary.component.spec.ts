import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'app/material.module';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import * as fromRoot from '../../routing/store';
import * as fromProduct from '../store/reducers/product.reducer';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';

fdescribe('ProductSummaryComponent in product', () => {
  let store: Store<fromProduct.ProductState>;
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  const mockProduct = ['mockProduct'];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers
          }),
          RouterTestingModule
        ],
        declarations: [ProductSummaryComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSummaryComponent);
    productSummaryComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(mockProduct));
  });

  it('should be created', () => {
    expect(productSummaryComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    productSummaryComponent.productCode = '123456';
    productSummaryComponent.ngOnChanges();
    expect(productSummaryComponent.model).toEqual(mockProduct[0]);
  });
});
