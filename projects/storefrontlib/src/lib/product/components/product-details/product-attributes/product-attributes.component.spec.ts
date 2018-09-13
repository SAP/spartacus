import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAttributesComponent } from './product-attributes.component';

describe('ProductAttributesComponent in product', () => {
  let productAttributesComponent: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAttributesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributesComponent);
    productAttributesComponent = fixture.componentInstance;
  });

  it('should create', () => {
    expect(productAttributesComponent).toBeTruthy();
  });
});
