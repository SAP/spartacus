import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitLevelOrderDetailShippingComponent } from './unit-level-order-detail-shipping.component';

describe('UnitLevelOrderDetailShippingComponent', () => {
  let component: UnitLevelOrderDetailShippingComponent;
  let fixture: ComponentFixture<UnitLevelOrderDetailShippingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitLevelOrderDetailShippingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitLevelOrderDetailShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
