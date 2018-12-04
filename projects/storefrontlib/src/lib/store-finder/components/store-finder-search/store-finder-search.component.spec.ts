import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreFinderSearchComponent } from './store-finder-search.component';
import { WindowRef } from '../../services/window-ref';

import * as fromStore from '../../store';
import { RoutingService } from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';

const latitude = 10.1;
const longitude = 39.2;
const query = 'address';

const keyEvent = {
  key: 'Enter'
};
const badKeyEvent = {
  key: 'Enter95'
};

const coor: Coordinates = {
  latitude: latitude,
  longitude: longitude,
  accuracy: 0,
  altitude: null,
  altitudeAccuracy: null,
  heading: null,
  speed: null
};
const position = { coords: coor, timestamp: new Date().valueOf() };

class WindowRefMock {
  get nativeWindow(): any {
    return {
      navigator: {
        geolocation: {
          getCurrentPosition: function(callback: Function) {
            callback(position);
          }
        }
      }
    };
  }
}

@Pipe({
  name: 'cxTranslateUrl'
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

describe('StoreFinderSearchComponent', () => {
  let component: StoreFinderSearchComponent;
  let fixture: ComponentFixture<StoreFinderSearchComponent>;
  let windowRef: WindowRef;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromStore.reducers)
      ],
      declarations: [StoreFinderSearchComponent, MockTranslateUrlPipe],
      providers: [
        { provide: WindowRef, useClass: WindowRefMock },
        {
          provide: RoutingService,
          useValue: { translateAndGo: jasmine.createSpy() }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderSearchComponent);
    component = fixture.componentInstance;
    windowRef = TestBed.get(WindowRef);
    routingService = TestBed.get(RoutingService);

    spyOn(windowRef, 'nativeWindow').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new query', () => {
    component.searchBox.setValue(query);
    component.findStores(component.searchBox.value);
    expect(routingService.translateAndGo).toHaveBeenCalledWith({
      route: [
        'storeFinder',
        {
          name: 'searchResults',
          params: { query }
        }
      ]
    });
  });

  it('should call onKey and dispatch query', () => {
    component.searchBox.setValue(query);
    component.onKey(keyEvent);
    expect(routingService.translateAndGo).toHaveBeenCalledWith({
      route: [
        'storeFinder',
        {
          name: 'searchResults',
          params: { query }
        }
      ]
    });
  });

  it('should only call onKey', () => {
    component.onKey(badKeyEvent);
    expect(routingService.translateAndGo).not.toHaveBeenCalled();
  });

  it('should view stores near by my location', () => {
    component.viewStoresWithMyLoc();
    expect(routingService.translateAndGo).toHaveBeenCalledWith({
      route: [
        'storeFinder',
        {
          name: 'searchResults',
          params: { latitude, longitude }
        }
      ]
    });
  });
});
