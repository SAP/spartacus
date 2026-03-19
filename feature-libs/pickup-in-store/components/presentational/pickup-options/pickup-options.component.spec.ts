import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  FeatureConfigService,
  MockTranslatePipe,
  MockTranslationService,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import { TAB_MODE, TabModule } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { PickupOptionsComponent } from './pickup-options.component';
import { PickupOptionsTabs } from './pickup-options.model';

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('PickupOptionsComponent', () => {
  let component: PickupOptionsComponent;
  let fixture: ComponentFixture<PickupOptionsComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        PickupOptionsComponent,
        CommonModule,
        ReactiveFormsModule,
        TabModule,
      ],
      providers: [
        { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    })
      .overrideComponent(PickupOptionsComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] },
      })
      .compileComponents();
    fixture = TestBed.createComponent(PickupOptionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should select tab to the selected option whenever it changes', () => {
    component.selectedOption = 'delivery';
    component.ngOnChanges();
    fixture.detectChanges();
    let activeTab = fixture.debugElement.queryAll(
      By.css('cx-tab button[role="tab"]')
    )[PickupOptionsTabs.DELIVERY].nativeElement;
    expect(activeTab.classList.contains('active')).toBeTruthy();

    spyOn(<any>component.tabComponent, 'select').and.callThrough();
    component.selectedOption = 'pickup';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.tabComponent?.select).toHaveBeenCalledWith(
      PickupOptionsTabs.PICKUP,
      TAB_MODE.TAB
    );
  });

  it('should emit the new pickup option on onPickupOptionChange', () => {
    spyOn(component.pickupOptionChange, 'emit');
    component.onPickupOptionChange('delivery');

    expect(component.pickupOptionChange.emit).toHaveBeenCalledWith({
      option: 'delivery',
      triggerElement: component.triggerElement,
    });
  });

  it('should emit on onPickupLocationChange', () => {
    spyOn(component.pickupLocationChange, 'emit');
    component.onPickupLocationChange();

    expect(component.pickupLocationChange.emit).toHaveBeenCalled();
  });

  it('should disable tabs if disabledControls is true', () => {
    component.disableControls = true;
    fixture.detectChanges();
    component.ngOnChanges();
    const tabs = fixture.debugElement.queryAll(
      By.css('cx-tab button[role="tab"]')
    );
    tabs.forEach((tab) => expect(tab.nativeElement.disabled).toBeTruthy());
  });

  describe('template', () => {
    it('should show delivery option', () => {
      component.selectedOption = 'delivery';
      fixture.detectChanges();

      const panel = fixture.debugElement.query(
        By.css('cx-tab-panel')
      ).nativeElement;
      expect(panel.textContent).toContain('pickupOptions.freeReturn');
    });

    it('should show pickup option and select store when no display location is set', () => {
      component.selectedOption = 'pickup';
      fixture.detectChanges();

      const panel = fixture.debugElement.query(
        By.css('cx-tab-panel')
      ).nativeElement;
      expect(panel.textContent).toContain('pickupOptions.selectStore');
    });

    it('should show pickup option and change store when display location is set', () => {
      component.selectedOption = 'pickup';
      component.displayPickupLocation = 'Test location';
      fixture.detectChanges();

      const panel = fixture.debugElement.query(
        By.css('cx-tab-panel')
      ).nativeElement;
      expect(panel.textContent).toContain('pickupOptions.changeStore');
      expect(panel.textContent).toContain('Test location');
    });

    it('should call onPickupOptionChange when the tab is changed', () => {
      spyOn(component, 'onPickupOptionChange');
      fixture.detectChanges();

      // for delivery
      let tabButton = fixture.debugElement.queryAll(By.css('button'))[
        PickupOptionsTabs.DELIVERY
      ].nativeElement;
      tabButton.click();

      expect(component.onPickupOptionChange).toHaveBeenCalledWith('delivery');

      // for pickup
      tabButton = fixture.debugElement.queryAll(By.css('button'))[
        PickupOptionsTabs.PICKUP
      ].nativeElement;
      tabButton.click();

      expect(component.onPickupOptionChange).toHaveBeenCalledWith('pickup');
    });

    it('should call onPickupLocationChange when the select store button is clicked', () => {
      spyOn(component, 'onPickupLocationChange');
      fixture.detectChanges();

      const selectStoreButton = fixture.debugElement.query(
        By.css('button[data-store-location-link]')
      ).nativeElement;
      selectStoreButton.click();

      expect(component.onPickupLocationChange).toHaveBeenCalled();
    });

    it('should call onPickupLocationChange when the change store button is clicked', () => {
      fixture.detectChanges();
      spyOn(component, 'onPickupLocationChange');
      component.selectedOption = 'pickup';
      component.displayPickupLocation = 'Test location';
      component.ngOnChanges();
      fixture.detectChanges();

      const changeStoreButton = fixture.debugElement.query(
        By.css('button[data-store-location-link]')
      ).nativeElement;
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
