import { MaterialModule } from 'app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAttributesComponent } from './product-attributes.component';
import * as fromRoot from '../../../routing/store';
import * as fromStore from './../../store';
import { StoreModule, combineReducers } from '@ngrx/store';

fdescribe('ProductAttributesComponent in product', () => {
  let productAttributesComponent: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            products: combineReducers(fromStore.reducers)
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
  });

  it('should create', () => {
    expect(productAttributesComponent).toBeTruthy();
  });
});
