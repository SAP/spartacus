import { DebugElement, ElementRef, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreFinderMapComponent } from './store-finder-map.component';
import { GoogleMapRendererService } from '@spartacus/storefinder/core';

class MapRendererServiceMock {
  public renderMap(_mapElement: HTMLElement, _locations: any[]): void {}
  public centerMap(_latitude: number, _longitude: number): void {}
}

const location = { geoPoint: {} };
const mapDomElement = document.createElement('div');

describe('StoreFinderMapComponent', () => {
  let component: StoreFinderMapComponent;
  let fixture: ComponentFixture<StoreFinderMapComponent>;
  let mapRendererService: GoogleMapRendererService;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFinderMapComponent],
      providers: [
        { provide: GoogleMapRendererService, useClass: MapRendererServiceMock },
      ],
    });

    fixture = TestBed.createComponent(StoreFinderMapComponent);
    component = fixture.componentInstance;
    component.locations = [];
    component.mapElement = new ElementRef<HTMLElement>(mapDomElement);
    debugElement = fixture.debugElement;
    mapRendererService = debugElement.injector.get(GoogleMapRendererService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render map', () => {
    // given
    spyOn(mapRendererService, 'renderMap');

    // when locations are changed
    component.locations = [location];
    component.ngOnChanges({
      locations: new SimpleChange(null, location, false),
    });

    // then call map renderer service
    expect(mapRendererService.renderMap).toHaveBeenCalledWith(
      mapDomElement,
      [location],
      jasmine.any(Function)
    );
  });

  it('should not render map when locations are not changed', () => {
    // given
    spyOn(mapRendererService, 'renderMap');

    // when locations are changed
    component.locations = [location];
    component.ngOnChanges({
      notLocation: new SimpleChange(undefined, null, false),
    });

    // then call map renderer service
    expect(mapRendererService.renderMap).toHaveBeenCalledTimes(0);
  });

  it('should center map', () => {
    spyOn(mapRendererService, 'centerMap');
    component.centerMap(0, 0);
    expect(mapRendererService.centerMap).toHaveBeenCalledWith(0, 0);
  });
});
