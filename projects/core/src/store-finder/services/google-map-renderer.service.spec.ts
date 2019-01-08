import { GoogleMapRendererService } from './google-map-renderer.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ExternalJsFileLoader } from './external-js-file-loader.service';
import { Observable, of } from 'rxjs';
import { StoreDataService } from '../facade/store-data.service';
import { OccE2eConfigurationService } from '../occ';

const MAP_DOM_ELEMENT_INNER_HTML = 'map dom element inner html';
const GOOGLE_API_KEY = 'google_api_key';
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

class OccE2eConfigurationServiceMock {
  getConfiguration(_configurationKey: string): Observable<any> {
    return of(GOOGLE_API_KEY);
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
  let occE2eConfigurationServiceMock: OccE2eConfigurationService;
  let storeDataServiceMock: StoreDataService;
  let mapDomElement: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        GoogleMapRendererService,
        { provide: ExternalJsFileLoader, useClass: ExternalJsFileLoaderMock },
        {
          provide: OccE2eConfigurationService,
          useClass: OccE2eConfigurationServiceMock
        },
        {
          provide: StoreDataService,
          useClass: StoreDataServiceMock
        }
      ]
    });

    mapDomElement = document.createElement('div');
    externalJsFileLoaderMock = bed.get(ExternalJsFileLoader);
    googleMapRendererService = bed.get(GoogleMapRendererService);
    occE2eConfigurationServiceMock = bed.get(OccE2eConfigurationService);
    storeDataServiceMock = bed.get(StoreDataService);
  });

  it('should render map', fakeAsync(() => {
    // given
    spyOn(occE2eConfigurationServiceMock, 'getConfiguration').and.callThrough();
    spyOn(externalJsFileLoaderMock, 'load').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLongitude').and.callThrough();

    // when
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then
    expect(
      occE2eConfigurationServiceMock.getConfiguration
    ).toHaveBeenCalledWith('e2egoogleservices.apikey');
    expect(externalJsFileLoaderMock.load).toHaveBeenCalledWith(
      'https://maps.googleapis.com/maps/api/js',
      Object({ key: GOOGLE_API_KEY }),
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

    spyOn(occE2eConfigurationServiceMock, 'getConfiguration').and.callThrough();
    spyOn(externalJsFileLoaderMock, 'load').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeDataServiceMock, 'getStoreLongitude').and.callThrough();

    // when rendering the map one more time
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then google js is not loaded again
    expect(
      occE2eConfigurationServiceMock.getConfiguration
    ).toHaveBeenCalledTimes(0);
    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(0);
    expect(storeDataServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeDataServiceMock.getStoreLongitude).toHaveBeenCalled();
  }));
});
