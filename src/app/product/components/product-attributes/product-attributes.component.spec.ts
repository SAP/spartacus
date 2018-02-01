import { of } from 'rxjs/observable/of';
import { ProductModule } from './../../product.module';
import { MaterialModule } from 'app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAttributesComponent } from './product-attributes.component';
import * as fromRoot from '../../../routing/store';
import * as fromProduct from '../../store/reducers/product.reducer';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

const id = '1641905';
const mockProduct = 'mockProduct';

fdescribe('ProductAttributesComponent in product', () => {
  let store: Store<fromProduct.ProductState>;
  let productAttributesComponent: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;

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
        declarations: [ProductAttributesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributesComponent);
    productAttributesComponent = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(mockProduct));
  });

  it('should create', () => {
    expect(productAttributesComponent).toBeTruthy();
  });

  it('should load specified data', () => {
    productAttributesComponent.productCode = id;
    productAttributesComponent.ngOnChanges();
    expect(productAttributesComponent.model).toEqual(mockProduct);
  });
});
