import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLineItemComponent } from './product-line-item.component';

xdescribe('ProductLineItemComponent', () => {
  let component: ProductLineItemComponent;
  let fixture: ComponentFixture<ProductLineItemComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProductLineItemComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
