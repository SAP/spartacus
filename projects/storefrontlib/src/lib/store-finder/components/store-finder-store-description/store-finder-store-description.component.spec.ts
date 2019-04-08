import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';

import { SpinnerComponent } from '../../../ui';

import { PipeTransform, Pipe, Component, Input } from '@angular/core';
import {
  GoogleMapRendererService,
  StoreFinderService,
  StoreDataService,
  I18nTestingModule,
} from '@spartacus/core';

@Pipe({
  name: 'cxTranslateUrl',
})
class MockTranslateUrlPipe implements PipeTransform {
  transform() {}
}

const storeId = 'shop_new_york_1';

const mockActivatedRoute = {
  snapshot: {
    params: {},
  },
};

class MapRendererServiceMock {
  public renderMap(_mapElement: HTMLElement, _locations: any[]): void {}
  public centerMap(_latitude: number, _longitude: number): void {}
}

class StoreDataServiceMock {
  getStoreLatitude() {}
  getStoreLongitude() {}
}

class StoreFinderServiceMock {
  viewStoreById() {}
  getFindStoresEntities() {}
  getStoresLoading() {}
}

@Component({ selector: 'cx-schedule', template: '' })
class MockScheduleComponent {
  @Input() location;
}

@Component({ selector: 'cx-store-finder-map', template: '' })
class MockStoreFinderMapComponent {
  @Input() locations;
}

describe('StoreFinderStoreDescriptionComponent', () => {
  let component: StoreFinderStoreDescriptionComponent;
  let fixture: ComponentFixture<StoreFinderStoreDescriptionComponent>;
  let storeFinderService: StoreFinderService;
  let route: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        StoreFinderStoreDescriptionComponent,
        MockScheduleComponent,
        MockStoreFinderMapComponent,
        MockTranslateUrlPipe,
        SpinnerComponent,
      ],
      providers: [
        StoreDataService,
        { provide: StoreDataService, useClass: StoreDataServiceMock },
        { provide: StoreFinderService, useClass: StoreFinderServiceMock },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: GoogleMapRendererService, useClass: MapRendererServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderStoreDescriptionComponent);
    component = fixture.componentInstance;
    route = TestBed.get(ActivatedRoute);
    storeFinderService = TestBed.get(StoreFinderService);

    spyOn(storeFinderService, 'viewStoreById');
  });

  it('should call storeFinderService with store id', () => {
    route.snapshot.params = {
      store: storeId,
    };
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(storeFinderService.viewStoreById).toHaveBeenCalledWith(storeId);
  });
});
