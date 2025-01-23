import { CommonModule } from '@angular/common';
import {
  Component,
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FeatureConfigService, I18nTestingModule } from '@spartacus/core';
import { PickupOption } from '@spartacus/pickup-in-store/root';
import { Observable } from 'rxjs';
import { PickupOptionsComponent } from './pickup-options.component';
import { TAB_MODE, Tab, TabConfig, TabModule } from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { By } from '@angular/platform-browser';
import { PickupOptionsTabs } from './pickup-options.model';

@Component({
  selector: 'cx-tab',
  template: `<div></div>`,
  standalone: false,
})
class MockTabComponent {
  @Input() disabled: boolean;
  @Input() tabs: Tab[];
  @Input() config: TabConfig;
}

// Reverted mock directive used to check whether all parts of the component works properly
// if the feature flag is disabled.
@Directive({
  selector: '[cxFeature]',
  standalone: false,
})
export class MockRevertedFeatureDirective {
  constructor(
    protected templateRef: TemplateRef<any>,
    protected viewContainer: ViewContainerRef
  ) {}

  @Input() set cxFeature(_feature: string) {
    // ensure the deprecated DOM changes are not rendered during tests

    if (_feature.toString().includes('!')) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
class MockRevertedFeatureConfigService {
  isEnabled() {
    return false;
  }
}

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
}

describe('PickupOptionsComponent', () => {
  let component: PickupOptionsComponent;
  let fixture: ComponentFixture<PickupOptionsComponent>;

  describe('with feature flags disabled', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          PickupOptionsComponent,
          MockRevertedFeatureDirective,
          MockTabComponent,
        ],
        imports: [CommonModule, I18nTestingModule, ReactiveFormsModule],
        providers: [
          {
            provide: FeatureConfigService,
            useClass: MockRevertedFeatureConfigService,
          },
        ],
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

      expect(component.pickupOptionChange.emit).toHaveBeenCalledWith(
        'delivery'
      );
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

  describe('with feature flags enabled', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PickupOptionsComponent, MockFeatureDirective],
        imports: [
          CommonModule,
          I18nTestingModule,
          ReactiveFormsModule,
          TabModule,
        ],
        providers: [
          { provide: FeatureConfigService, useClass: MockFeatureConfigService },
        ],
      });
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
});

/**
 * This is a stub of the PickupOptionsComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-pickup-options',
  template: '',
  standalone: false,
})
export class PickupOptionsStubComponent {
  @Input() selectedOption: PickupOption;
  @Input() displayPickupLocation: string | undefined;
  @Input() disableControls: Observable<boolean>;
}
