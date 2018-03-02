import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsPageLayoutComponent } from './product-details-page-layout.component';

xdescribe('ProductDetailsPageLayoutComponent', () => {
  let component: ProductDetailsPageLayoutComponent;
  let fixture: ComponentFixture<ProductDetailsPageLayoutComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProductDetailsPageLayoutComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
