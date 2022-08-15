import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupDeliveryInfoContainerComponent } from './pickup-delivery-info-container.component';

describe('PickupDeliveryInfoContainerComponent', () => {
  let component: PickupDeliveryInfoContainerComponent;
  let fixture: ComponentFixture<PickupDeliveryInfoContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupDeliveryInfoContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDeliveryInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
