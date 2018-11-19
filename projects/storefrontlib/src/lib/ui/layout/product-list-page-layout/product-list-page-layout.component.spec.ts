import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageLayoutComponent } from './product-list-page-layout.component';

@Component({
  selector: 'cx-product-list',
  template: ''
})
class MockProductListComponent {
  @Input()
  gridMode: String;
  @Input()
  query;
  @Input()
  categoryCode;
  @Input()
  brandCode;
}

describe('ProductListPageLayoutComponent', () => {
  let component: ProductListPageLayoutComponent;
  let fixture: ComponentFixture<ProductListPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListPageLayoutComponent, MockProductListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListPageLayoutComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
