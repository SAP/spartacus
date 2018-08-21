import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { StoreFinderMapComponent } from './store-finder-map.component';
import { GoogleMapRendererService } from '../../services/google-map-renderer.service';
import { DebugElement, SimpleChange, ElementRef } from '@angular/core';

class MapRendererServiceMock {
  public renderMap(mapElement: HTMLElement, locations: any[]): void {}
  public centerMap(latitude: number, longitude: number): void {}
}

const location = { geoPoint: {} };
const mapDomElement = document.createElement('div');

describe('StoreFinderMapComponent', () => {
  let component: StoreFinderMapComponent;
  let fixture: ComponentFixture<StoreFinderMapComponent>;
  let mapRendererService: GoogleMapRendererService;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFinderMapComponent],
      providers: [
        { provide: GoogleMapRendererService, useClass: MapRendererServiceMock }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderMapComponent);
    component = fixture.componentInstance;
    component.locations = [];
    component.mapElement = new ElementRef<HTMLElement>(mapDomElement);
    el = fixture.debugElement;
    mapRendererService = el.injector.get(GoogleMapRendererService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render map', () => {
    // given
    spyOn(mapRendererService, 'renderMap').and.callThrough();

    // when locations are changed
    component.locations.push(location);
    component.ngOnChanges({
      locations: new SimpleChange(null, location, false)
    });

    // then call map renderer service
    expect(mapRendererService.renderMap).toHaveBeenCalledWith(mapDomElement, [
      location
    ]);
  });

  it('should center map', () => {
    spyOn(mapRendererService, 'centerMap').and.callThrough();
    component.centerMap(0, 0);
    expect(mapRendererService.centerMap).toHaveBeenCalledWith(0, 0);
  });
});
