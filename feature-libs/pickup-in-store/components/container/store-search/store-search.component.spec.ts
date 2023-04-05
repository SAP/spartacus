import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { CurrentLocationService } from '../../services/current-location.service';
import { MockCurrentLocationService } from '../../services/current-location.service.spec';

import { StoreSearchComponent } from './store-search.component';

describe('StoreSearchComponent', () => {
  let component: StoreSearchComponent;
  let fixture: ComponentFixture<StoreSearchComponent>;
  let currentLocationService: CurrentLocationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoreSearchComponent],
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentLocationService,
          useClass: MockCurrentLocationService,
        },
      ],
    }).compileComponents();
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
    spyOn(component, 'onFindStores').and.callThrough();
    spyOn(component.findStores, 'emit').and.callThrough();
    const RESULT = component.onFindStores(location);
    expect(component.onFindStores).toHaveBeenCalledWith(location);
    expect(component.findStores.emit).toHaveBeenCalledWith({ location });
    expect(RESULT).toEqual(false);
  });

  it('onHideOutOfStock emits eventHideOutOfStock', () => {
    spyOn(component.eventHideOutOfStock, 'emit');
    expect(component.hideOutOfStock).toEqual(false);
    component.onHideOutOfStock();
    expect(component.eventHideOutOfStock.emit).toHaveBeenCalledWith(true);
    component.hideOutOfStock = !component.hideOutOfStock;
    fixture.detectChanges();
    component.onHideOutOfStock();
    expect(component.eventHideOutOfStock.emit).toHaveBeenCalledWith(false);
  });

  it('useMyLocation makes findStores emit a location', () => {
    spyOn(currentLocationService, 'getCurrentLocation').and.callThrough();
    spyOn(component.showSpinner, 'emit').and.callThrough();
    spyOn(component.findStores, 'emit').and.callThrough();

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
