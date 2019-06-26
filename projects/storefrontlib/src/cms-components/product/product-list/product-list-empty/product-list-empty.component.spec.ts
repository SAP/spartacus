import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListEmptyComponent } from './product-list-empty.component';

describe('ProductListEmptyComponent', () => {
  let component: ProductListEmptyComponent;
  let fixture: ComponentFixture<ProductListEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
