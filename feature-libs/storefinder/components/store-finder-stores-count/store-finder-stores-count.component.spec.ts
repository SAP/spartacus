import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { StoreFinderService } from '@spartacus/storefinder/core';
import { SpinnerModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import createSpy = jasmine.createSpy;

const mockLocation = {
  isoCode: 'US',
  name: 'United States',
  count: 50,
};
class MockStoreFinderService implements Partial<StoreFinderService> {
  viewAllStores = createSpy('viewAllStores');
  getViewAllStoresEntities = createSpy(
    'getViewAllStoresEntities'
  ).and.returnValue(of([mockLocation]));
  getViewAllStoresLoading = createSpy('getViewAllStoresLoading');
}

class MockRoutingService implements Partial<RoutingService> {
  go = () => Promise.resolve(true);
}

describe('StoreFinderStoresCountComponent', () => {
  let component: StoreFinderStoresCountComponent;
  let fixture: ComponentFixture<StoreFinderStoresCountComponent>;
  let el: DebugElement;
  let routingService: RoutingService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SpinnerModule, I18nTestingModule, RouterTestingModule],
        declarations: [StoreFinderStoresCountComponent],
        providers: [
          {
            provide: StoreFinderService,
            useClass: MockStoreFinderService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderStoresCountComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    routingService = TestBed.inject(RoutingService);
    fixture.detectChanges();

    spyOn(routingService, 'go').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to country when navigateToLocation is called', () => {
    component.navigateToLocation('US');
    expect(routingService.go).toHaveBeenCalledWith([
      '/store-finder/country',
      'US',
    ]);
  });

  it('should handle space key to navigate to country from keyboard', () => {
    spyOn(component, 'navigateToLocation').and.callThrough();
    const countryBtn = el.query(
      By.css('.btn-link[aria-label="United States(50)"]')
    );
    expect(countryBtn).toBeTruthy();
    const event = new KeyboardEvent('keydown', {
      key: ' ',
    });
    spyOn(event, 'preventDefault');
    countryBtn.nativeElement.dispatchEvent(event);
    expect(component.navigateToLocation).toHaveBeenCalledWith('US', event);
    expect(routingService.go).toHaveBeenCalledWith([
      '/store-finder/country',
      'US',
    ]);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
