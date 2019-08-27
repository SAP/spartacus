import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  GoogleMapRendererService,
  I18nTestingModule,
  StoreDataService,
  StoreFinderService,
} from '@spartacus/core';
import { SpinnerComponent } from '../../../../shared';
import { StoreFinderStoreDescriptionComponent } from './store-finder-store-description.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        StoreFinderStoreDescriptionComponent,
        MockScheduleComponent,
        MockStoreFinderMapComponent,
        MockUrlPipe,
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
    storeFinderService = TestBed.get(StoreFinderService as Type<
      StoreFinderService
    >);

    spyOn(storeFinderService, 'viewStoreById');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
