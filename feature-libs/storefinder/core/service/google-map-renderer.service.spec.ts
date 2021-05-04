import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ScriptLoader } from '@spartacus/core';
import { defaultStoreFinderConfig as config } from '../config/default-store-finder-config';
import { StoreFinderConfig } from '../config/store-finder-config';
import { StoreFinderService } from '../facade/store-finder.service';
import { GoogleMapRendererService } from './google-map-renderer.service';

const MAP_DOM_ELEMENT_INNER_HTML = 'map dom element inner html';

const locations = [
  {
    geoPoint: {
      latitude: 0,
      longitude: 0,
    },
  },
];
const selectedIndex = function () {};

class ScriptLoaderMock {
  public embedScript(embedOptions: {
    _src: string;
    _params?: Object;
    _attributes?: Object;
    callback?: EventListener;
  }): void {
    const googleMock: any = {};
    googleMock.maps = {};
    googleMock.maps.MapTypeId = {};
    googleMock.maps.Map = function (mapDomElement: HTMLElement) {
      mapDomElement.innerHTML = MAP_DOM_ELEMENT_INNER_HTML;
      this.setCenter = function () {};
      this.setZoom = function () {};
    };
    googleMock.maps.LatLng = function () {};
    googleMock.maps.Marker = function () {
      this.setMap = function () {};
      this.addListener = function () {};
    };
    (window as any)['google'] = googleMock;
    embedOptions.callback(new Event('test'));
  }
}

class StoreFinderServiceMock {
  getStoreLatitude(_location: any): number {
    return 10;
  }
  getStoreLongitude(_location: any): number {
    return 20;
  }
}

describe('GoogleMapRendererService', () => {
  let googleMapRendererService: GoogleMapRendererService;

  let scriptLoaderMock: ScriptLoader;
  let storeFinderServiceMock: StoreFinderService;
  let mapDomElement: HTMLElement;

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        GoogleMapRendererService,
        { provide: ScriptLoader, useClass: ScriptLoaderMock },
        {
          provide: StoreFinderService,
          useClass: StoreFinderServiceMock,
        },
        {
          provide: StoreFinderConfig,
          useValue: config,
        },
      ],
    });

    mapDomElement = document.createElement('div');
    scriptLoaderMock = bed.inject(ScriptLoader);
    googleMapRendererService = bed.inject(GoogleMapRendererService);
    storeFinderServiceMock = bed.inject(StoreFinderService);
  });

  it('should render map', fakeAsync(() => {
    // given
    spyOn(scriptLoaderMock, 'embedScript').and.callThrough();
    spyOn(storeFinderServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeFinderServiceMock, 'getStoreLongitude').and.callThrough();

    // when
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then
    expect(scriptLoaderMock.embedScript).toHaveBeenCalledWith({
      src: config.googleMaps.apiUrl,
      params: Object({ key: config.googleMaps.apiKey }),
      attributes: { type: 'text/javascript' },
      callback: jasmine.any(Function) as any,
    });
    expect(storeFinderServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeFinderServiceMock.getStoreLongitude).toHaveBeenCalled();

    tick();
    expect(mapDomElement.innerHTML).toEqual(MAP_DOM_ELEMENT_INNER_HTML);
  }));

  it('should not create a new map', fakeAsync(() => {
    // given the map is already rendered
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);
    tick();

    spyOn(scriptLoaderMock, 'embedScript').and.callThrough();
    spyOn(storeFinderServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeFinderServiceMock, 'getStoreLongitude').and.callThrough();

    // when rendering the map one more time
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then google js is not loaded again
    expect(scriptLoaderMock.embedScript).toHaveBeenCalledTimes(0);
    expect(storeFinderServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeFinderServiceMock.getStoreLongitude).toHaveBeenCalled();
  }));
});
