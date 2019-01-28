import { GoogleMapRendererService } from './google-map-renderer.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ExternalJsFileLoader } from './external-js-file-loader.service';
import { StoreDataService } from '../facade/store-data.service';
import { StoreFinderConfig } from '../config/store-finder-config';
import { defaultStoreFinderConfig } from '../config/default-store-finder-config';

const MAP_DOM_ELEMENT_INNER_HTML = 'map dom element inner html';

const locations = [
  {
    geoPoint: {
      latitude: 0,
      longitude: 0
    }
  }
];
const selectedIndex = function() {};

class ExternalJsFileLoaderMock {
  public load(_src: string, _params?: Object, callback?: EventListener): void {
    window['google'] = {};
    window['google'].maps = {};
    window['google'].maps.MapTypeId = {};
    window['google'].maps.Map = function(mapDomElement: HTMLElement) {
      mapDomElement.innerHTML = MAP_DOM_ELEMENT_INNER_HTML;
      this.setCenter = function() {};
      this.setZoom = function() {};
    };
    window['google'].maps.LatLng = function() {};
    window['google'].maps.Marker = function() {
      this.setMap = function() {};
      this.addListener = function() {};
    };
    callback(new Event('test'));
  }
}

class StoreDataServiceMock {
  getStoreLatitude(_location: any): number {
    return 10;
  }
  getStoreLongitude(_location: any): number {
    return 20;
  }
}

describe('GoogleMapRendererService', () => {
  let googleMapRendererService: GoogleMapRendererService;

  let externalJsFileLoaderMock: ExternalJsFileLoader;
  let storeDataServiceMock: StoreDataService;
  let mapDomElement: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        GoogleMapRendererService,
        { provide: ExternalJsFileLoader, useClass: ExternalJsFileLoaderMock },
        {
          provide: StoreDataService,
          useClass: StoreDataServiceMock
        },
        {
          provide: StoreFinderConfig,
          useValue: defaultStoreFinderConfig
        }
      ]
    });

    mapDomElement = document.createElement('div');
    externalJsFileLoaderMock = bed.get(ExternalJsFileLoader);
    googleMapRendererService = bed.get(GoogleMapRendererService);
    storeDataServiceMock = bed.get(StoreDataService);
  });

  it('should render map', fakeAsync(() => {
    // given
    spyOn(externalJsFileLoaderMock, 'load').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLongitude').and.callThrough();

    // when
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then
    expect(externalJsFileLoaderMock.load).toHaveBeenCalledWith(
      defaultStoreFinderConfig.googleMaps.apiUrl,
      Object({ key: defaultStoreFinderConfig.googleMaps.apiKey }),
      jasmine.any(Function)
    );
    expect(storeDataServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeDataServiceMock.getStoreLongitude).toHaveBeenCalled();

    tick();
    expect(mapDomElement.innerHTML).toEqual(MAP_DOM_ELEMENT_INNER_HTML);
  }));

  it('should not create a new map', fakeAsync(() => {
    // given the map is already rendered
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);
    tick();

    spyOn(externalJsFileLoaderMock, 'load').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLongitude').and.callThrough();

    // when rendering the map one more time
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then google js is not loaded again
    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(0);
    expect(storeDataServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeDataServiceMock.getStoreLongitude).toHaveBeenCalled();
  }));
});
