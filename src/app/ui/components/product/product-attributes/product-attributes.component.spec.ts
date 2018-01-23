import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { fromReducer } from ''
import { ProductAttributesComponent } from './product-attributes.component';
import { DebugElement } from '@angular/core';

fdescribe('ProductAttributesComponent', () => {
  // let store: Store<>
  let component: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;
  let el: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ProductAttributesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributesComponent);
    component = fixture.componentInstance;

    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
