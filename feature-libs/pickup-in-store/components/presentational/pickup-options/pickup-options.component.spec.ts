import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { PickupOptionsComponent } from './pickup-options.component';

describe('PickupOptionsComponent', () => {
  let component: PickupOptionsComponent;
  let fixture: ComponentFixture<PickupOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PickupOptionsComponent],
      imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(PickupOptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should set value of the form to the selected option whenever it changes', () => {
    component.selectedOption = 'delivery';
    component.ngOnChanges();
    expect(component.pickupOptionsForm.get('pickupOption')?.value).toBe(
      'delivery'
    );

    component.selectedOption = 'pickup';
    component.ngOnChanges();
    expect(component.pickupOptionsForm.get('pickupOption')?.value).toBe(
      'pickup'
    );
  });

  it('should emit the new pickup option on onPickupOptionChange', () => {
    spyOn(component.pickupOptionChange, 'emit');
    component.onPickupOptionChange('delivery');

    expect(component.pickupOptionChange.emit).toHaveBeenCalledWith('delivery');
  });

  it('should emit on onPickupLocationChange', () => {
    spyOn(component.pickupLocationChange, 'emit');
    component.onPickupLocationChange();

    expect(component.pickupLocationChange.emit).toHaveBeenCalled();
  });

  it('should call disable on pickupOption', () => {
    component.disableControls = true;
    fixture.detectChanges();
    component.ngOnChanges();
    expect(component.pickupOptionsForm.get('pickupOption')?.disabled).toBe(
      true
    );
  });

  describe('template', () => {
    it('should show delivery option', () => {
      fixture.detectChanges();

      const label = fixture.debugElement.nativeElement.querySelector(
        '[data-pickup="delivery"] + label'
      );
      expect(label.textContent).toContain('pickupOptions.delivery');
    });

    it('should show pickup option and select store when no display location is set', () => {
      fixture.detectChanges();

      const label = fixture.debugElement.nativeElement.querySelector(
        '[data-pickup="pickup"] + label'
      );
      expect(label.textContent).toContain('pickupOptions.pickup');
      expect(label.textContent).toContain('pickupOptions.selectStore');
    });

    it('should show pickup option and change store when no display location is set', () => {
      component.displayPickupLocation = 'Test location';
      fixture.detectChanges();

      const label = fixture.debugElement.nativeElement.querySelector(
        '[data-pickup="pickup"] + label'
      );
      expect(label.textContent).toContain('pickupOptions.pickup');
      expect(label.textContent).toContain('pickupOptions.changeStore');
      expect(label.textContent).toContain('Test location');
    });

    it('should call onPickupOptionChange when the radio buttons are clicked', () => {
      spyOn(component, 'onPickupOptionChange');
      fixture.detectChanges();

      // for delivery
      let radioButton = fixture.debugElement.nativeElement.querySelector(
        '[data-pickup="delivery"]'
      );
      radioButton.click();

      expect(component.onPickupOptionChange).toHaveBeenCalledWith('delivery');

      // for pickup
      radioButton = fixture.debugElement.nativeElement.querySelector(
        '[data-pickup="pickup"]'
      );
      radioButton.click();

      expect(component.onPickupOptionChange).toHaveBeenCalledWith('pickup');
    });

    it('should call onPickupLocationChange when the select store button is clicked', () => {
      spyOn(component, 'onPickupLocationChange');
      fixture.detectChanges();

      const selectStoreButton =
        fixture.debugElement.nativeElement.querySelector('a[role="button"]');
      selectStoreButton.click();

      expect(component.onPickupLocationChange).toHaveBeenCalled();
    });

    it('should call onPickupLocationChange when the change store button is clicked', () => {
      spyOn(component, 'onPickupLocationChange');
      component.displayPickupLocation = 'Test location';
      fixture.detectChanges();

      const changeStoreButton =
        fixture.debugElement.nativeElement.querySelector('a[role="button"]');
      changeStoreButton.click();

      expect(component.onPickupLocationChange).toHaveBeenCalled();
    });
  });
});

/**
 * This is a stub of the PickupOptionsComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-pickup-options',
  template: '',
})
export class PickupOptionsStubComponent {
  @Input() selectedOption: PickupOption;
  @Input() displayPickupLocation: string | undefined;
  @Input() disableControls: Observable<boolean>;
}
