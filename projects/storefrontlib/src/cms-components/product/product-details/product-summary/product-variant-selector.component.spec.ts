import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVariantSelectorComponent } from './product-variant-selector.component';

describe('ProductVariantSelectorComponent', () => {
  let component: ProductVariantSelectorComponent;
  let fixture: ComponentFixture<ProductVariantSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVariantSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVariantSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
