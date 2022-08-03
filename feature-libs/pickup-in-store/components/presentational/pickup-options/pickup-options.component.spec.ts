import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { PickupOptionsComponent } from './pickup-options.component';
describe('PickupOptionsComponent', () => {
  let component: PickupOptionsComponent;
  let fixture: ComponentFixture<PickupOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
      declarations: [PickupOptionsComponent],
    });
    fixture = TestBed.createComponent(PickupOptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set value on Form when ngOnChanges is called', () => {
    component.selectedOption = 'delivery';
    component.ngOnChanges();
    expect(component.deliveryOptionsForm.get('deliveryOption')?.value).toBe(
      'delivery'
    );
  });

  it('should emit pickup option on onPickupOptionChange', () => {
    spyOn(component.pickupOptionChange, 'emit');
    component.onPickupOptionChange('delivery');

    expect(component.pickupOptionChange.emit).toHaveBeenCalledWith('delivery');
  });

  it('should emit on onPickupLocationChange', () => {
    spyOn(component.pickupLocationChange, 'emit');
    component.onPickupLocationChange();

    expect(component.pickupLocationChange.emit).toHaveBeenCalled();
  });
});
