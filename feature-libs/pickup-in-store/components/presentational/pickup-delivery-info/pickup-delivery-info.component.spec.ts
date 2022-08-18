import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { PickupDeliveryInfoComponent } from './pickup-delivery-info.component';

describe('PickupDeliveryInfoComponent', () => {
  let component: PickupDeliveryInfoComponent;
  let fixture: ComponentFixture<PickupDeliveryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PickupDeliveryInfoComponent],
      imports: [I18nTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDeliveryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
