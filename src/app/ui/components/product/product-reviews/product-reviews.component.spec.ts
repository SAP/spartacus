import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReviewsComponent } from './product-reviews.component';

describe('ProductReviewsComponent', () => {
  let component: ProductReviewsComponent;
  let fixture: ComponentFixture<ProductReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
