import { vi } from 'vitest';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockTranslatePipe, TranslatePipe } from '@spartacus/core';
import { FeatureDirective } from '@spartacus/core';
import { CurrentLocationService } from '../../services/current-location.service';
import { MockCurrentLocationService } from '../../services/current-location.service.spec';

import { MockFeatureDirective } from 'core-libs/storefront/shared/test/mock-feature-directive';
import { StoreSearchComponent } from './store-search.component';

describe('StoreSearchComponent', () => {
  let component: StoreSearchComponent;
  let fixture: ComponentFixture<StoreSearchComponent>;
  let currentLocationService: CurrentLocationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreSearchComponent],
      providers: [
        {
          provide: CurrentLocationService,
          useClass: MockCurrentLocationService,
        },
      ],
    })
      .overrideComponent(StoreSearchComponent, {
        remove: { imports: [TranslatePipe, FeatureDirective] },
        add: { imports: [MockTranslatePipe, MockFeatureDirective] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSearchComponent);
    currentLocationService = TestBed.inject(CurrentLocationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('onFindStores emits a location and returns false', () => {
    const location = 'a location';
    vi.spyOn(component, 'onFindStores');
    vi.spyOn(component.findStores, 'emit');
    const RESULT = component.onFindStores(location);
    expect(component.onFindStores).toHaveBeenCalledWith(location);
    expect(component.findStores.emit).toHaveBeenCalledWith({ location });
    expect(RESULT).toEqual(false);
  });

  it('onHideOutOfStock emits eventHideOutOfStock', () => {
    vi.spyOn(component.eventHideOutOfStock, 'emit');
    expect(component.hideOutOfStock).toEqual(false);
    component.onHideOutOfStock();
    expect(component.eventHideOutOfStock.emit).toHaveBeenCalledWith(true);
    component.hideOutOfStock = !component.hideOutOfStock;
    fixture.detectChanges();
    component.onHideOutOfStock();
    expect(component.eventHideOutOfStock.emit).toHaveBeenCalledWith(false);
  });

  it('useMyLocation makes findStores emit a location', () => {
    vi.spyOn(currentLocationService, 'getCurrentLocation');
    vi.spyOn(component.showSpinner, 'emit');
    vi.spyOn(component.findStores, 'emit');

    component.useMyLocation();

    expect(currentLocationService.getCurrentLocation).toHaveBeenCalled();
    expect(component.showSpinner.emit).toHaveBeenCalledWith(true);
    expect(component.findStores.emit).toHaveBeenCalledWith({
      latitude: 0,
      longitude: 0,
    });
    expect(component.showSpinner.emit).toHaveBeenCalledWith(false);
  });
});

/**
 * This is a stub of the StoreSearchComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-store-search',
  template: '',
})
export class StoreSearchStubComponent {
  @Input() hideOutOfStock = false;
}
