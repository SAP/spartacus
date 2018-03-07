import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageLayoutComponent } from './product-list-page-layout.component';

xdescribe('ProductListPageComponent', () => {
  let component: ProductListPageLayoutComponent;
  let fixture: ComponentFixture<ProductListPageLayoutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProductListPageLayoutComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
