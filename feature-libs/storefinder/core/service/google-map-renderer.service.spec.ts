import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ScriptLoader } from '@spartacus/core';
// eslint-disable-next-line @nx/workspace-no-self-public-api-import -- ESLint is misfiring here: core and root are not the same library — they're separate entry points
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import {
  MockFeatureTogglesController,
  provideMockFeatureToggles,
} from 'core-libs/core/src/features-config/feature-toggles/testing';
import { StoreFinderConfig } from '../config/store-finder-config';
import { StoreFinderService } from '../facade/store-finder.service';
import { GoogleMapRendererService } from './google-map-renderer.service';
import { StoreLocationService } from './store-location.service';

const MAP_DOM_ELEMENT_INNER_HTML = 'map dom element inner html';
const MOCK_MAPS_API_KEY = `mock-maps-api-key`;

const mockGoogleMapsConfig = {
  apiUrl: 'https://maps.googleapis.com/maps/api/js',
  apiKey: '',
  scale: 5,
  selectedMarkerScale: 17,
  radius: 50000,
};

const locations = [
  {
    geoPoint: {
      latitude: 0,
      longitude: 0,
    },
  },
];
const selectedIndex = function () {};

// Captures the AdvancedMarkerElement instances created during a render so that
// the tests can inspect their content element, position and event listeners.
let advancedMarkerInstances: any[] = [];

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
    googleMock.maps.Animation = {};
    googleMock.maps.Map = function (mapDomElement: HTMLElement) {
      mapDomElement.innerHTML = MAP_DOM_ELEMENT_INNER_HTML;
      this.setCenter = function () {};
      this.setZoom = function () {};
    };
    googleMock.maps.LatLng = function (lat: number, lng: number) {
      this.lat = lat;
      this.lng = lng;
    };
    googleMock.maps.Marker = function () {
      this.setMap = function () {};
      this.setAnimation = function () {};
      this.addListener = function () {};
    };
    googleMock.maps.marker = {
      AdvancedMarkerElement: function (options: any) {
        this.options = options;
        this.content = options.content;
        this.position = options.position;
        this.listeners = {};
        this.addListener = function (event: string, handler: Function) {
          this.listeners[event] = handler;
        };
        advancedMarkerInstances.push(this);
      },
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

class StoreLocationServiceMock {
  getStoreLatitude(_location: any): number | undefined {
    return 30;
  }
  getStoreLongitude(_location: any): number | undefined {
    return 40;
  }
}

describe('GoogleMapRendererService', () => {
  let googleMapRendererService: GoogleMapRendererService;

  let scriptLoaderMock: ScriptLoader;
  let storeFinderServiceMock: StoreFinderService;
  let storeLocationServiceMock: StoreLocationService;
  let mapDomElement: HTMLElement;
  let config: StoreFinderConfig;
  let featureToggles: MockFeatureTogglesController;

  beforeEach(() => {
    advancedMarkerInstances = [];

    const bed = TestBed.configureTestingModule({
      providers: [
        GoogleMapRendererService,
        { provide: ScriptLoader, useClass: ScriptLoaderMock },
        {
          provide: StoreFinderService,
          useClass: StoreFinderServiceMock,
        },
        {
          provide: StoreLocationService,
          useClass: StoreLocationServiceMock,
        },
        {
          provide: StoreFinderConfig,
          useValue: { googleMaps: { ...mockGoogleMapsConfig } },
        },
        provideMockFeatureToggles({ useAdvancedGoogleMarkers: false }),
      ],
    });

    mapDomElement = document.createElement('div');
    scriptLoaderMock = bed.inject(ScriptLoader);
    googleMapRendererService = bed.inject(GoogleMapRendererService);
    storeFinderServiceMock = bed.inject(StoreFinderService);
    storeLocationServiceMock = bed.inject(StoreLocationService);
    config = TestBed.inject(StoreFinderConfig);
    featureToggles = TestBed.inject(MockFeatureTogglesController);
  });

  it('should render map when an api key is provided in the config', fakeAsync(() => {
    setApiKey(MOCK_MAPS_API_KEY);

    // given
    spyOn(scriptLoaderMock, 'embedScript').and.callThrough();
    spyOn(storeFinderServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeFinderServiceMock, 'getStoreLongitude').and.callThrough();

    // when
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then
    expect(scriptLoaderMock.embedScript).toHaveBeenCalledWith({
      src: config.googleMaps?.apiUrl,
      params: Object({ key: MOCK_MAPS_API_KEY }),
      attributes: { type: 'text/javascript' },
      callback: jasmine.any(Function) as any,
    });
    expect(storeFinderServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeFinderServiceMock.getStoreLongitude).toHaveBeenCalled();

    tick();
    expect(mapDomElement.innerHTML).toEqual(MAP_DOM_ELEMENT_INNER_HTML);
  }));

  it('should render map when special "development" api key value is provided', fakeAsync(() => {
    setApiKey(GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG);

    // given
    spyOn(scriptLoaderMock, 'embedScript').and.callThrough();
    spyOn(storeFinderServiceMock, 'getStoreLatitude').and.callThrough();
    spyOn(storeFinderServiceMock, 'getStoreLongitude').and.callThrough();

    // when
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then
    expect(scriptLoaderMock.embedScript).toHaveBeenCalledWith({
      src: config.googleMaps?.apiUrl,
      params: Object({ key: '' }),
      attributes: { type: 'text/javascript' },
      callback: jasmine.any(Function) as any,
    });
    expect(storeFinderServiceMock.getStoreLatitude).toHaveBeenCalled();
    expect(storeFinderServiceMock.getStoreLongitude).toHaveBeenCalled();

    tick();
    expect(mapDomElement.innerHTML).toEqual(MAP_DOM_ELEMENT_INNER_HTML);
  }));

  it('should not render map when no api key is provided (default config)', fakeAsync(() => {
    // given
    spyOn(scriptLoaderMock, 'embedScript').and.callThrough();

    // when
    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    // then
    expect(scriptLoaderMock.embedScript).not.toHaveBeenCalled();
  }));

  it('should not create a new map if the map was already created', fakeAsync(() => {
    setApiKey(GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG);

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

  it('should embed the script with an empty src when apiUrl is not configured', fakeAsync(() => {
    setApiKey(MOCK_MAPS_API_KEY);
    if (config.googleMaps) {
      config.googleMaps.apiUrl = undefined;
    }
    spyOn(scriptLoaderMock, 'embedScript').and.callThrough();

    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);

    expect(scriptLoaderMock.embedScript).toHaveBeenCalledWith({
      src: '',
      params: Object({ key: MOCK_MAPS_API_KEY }),
      attributes: { type: 'text/javascript' },
      callback: jasmine.any(Function) as any,
    });
  }));

  it('should render map when selectMarkerHandler is not provided', fakeAsync(() => {
    setApiKey(MOCK_MAPS_API_KEY);
    spyOn(scriptLoaderMock, 'embedScript').and.callThrough();

    googleMapRendererService.renderMap(mapDomElement, locations);

    tick();
    expect(mapDomElement.innerHTML).toEqual(MAP_DOM_ELEMENT_INNER_HTML);
  }));

  describe('with useAdvancedGoogleMarkers enabled', () => {
    beforeEach(() => {
      featureToggles.set('useAdvancedGoogleMarkers', true);
      setApiKey(MOCK_MAPS_API_KEY);
    });

    it('should create advanced markers from StoreLocationService coordinates', fakeAsync(() => {
      spyOn(storeLocationServiceMock, 'getStoreLatitude').and.callThrough();
      spyOn(storeLocationServiceMock, 'getStoreLongitude').and.callThrough();

      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );
      tick();

      expect(storeLocationServiceMock.getStoreLatitude).toHaveBeenCalled();
      expect(storeLocationServiceMock.getStoreLongitude).toHaveBeenCalled();
      expect(advancedMarkerInstances.length).toBe(locations.length);
      expect(advancedMarkerInstances[0].position.lat).toBe(30);
      expect(advancedMarkerInstances[0].position.lng).toBe(40);
    }));

    it('should fall back to 0 coordinates when StoreLocationService returns undefined', fakeAsync(() => {
      spyOn(storeLocationServiceMock, 'getStoreLatitude').and.returnValue(
        undefined
      );
      spyOn(storeLocationServiceMock, 'getStoreLongitude').and.returnValue(
        undefined
      );

      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );
      tick();

      expect(advancedMarkerInstances[0].position.lat).toBe(0);
      expect(advancedMarkerInstances[0].position.lng).toBe(0);
    }));

    it('should render marker content with a numbered label and the store marker class', fakeAsync(() => {
      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );
      tick();

      const content = advancedMarkerInstances[0].content as HTMLElement;
      expect(content.className).toBe('cx-store-marker');
      expect(content.textContent).toBe('1');
    }));

    it('should toggle the bounce class on mouseover and mouseout', fakeAsync(() => {
      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );
      tick();

      const marker = advancedMarkerInstances[0];
      const content = marker.content as HTMLElement;

      marker.listeners['mouseover']();
      expect(content.classList.contains('cx-store-marker-bounce')).toBe(true);

      marker.listeners['mouseout']();
      expect(content.classList.contains('cx-store-marker-bounce')).toBe(false);
    }));

    it('should invoke selectMarkerHandler with the marker index on click', fakeAsync(() => {
      const handler = jasmine.createSpy('selectMarkerHandler');

      googleMapRendererService.renderMap(mapDomElement, locations, handler);
      tick();

      advancedMarkerInstances[0].listeners['click']();
      expect(handler).toHaveBeenCalledWith(0);
    }));

    it('should not register a click listener when selectMarkerHandler is not provided', fakeAsync(() => {
      googleMapRendererService.renderMap(mapDomElement, locations);
      tick();

      expect(advancedMarkerInstances[0].listeners['click']).toBeUndefined();
    }));
  });

  function setApiKey(keyValue: string) {
    if (config.googleMaps) {
      config.googleMaps.apiKey = keyValue;
    } else {
      fail('Config undefined');
    }
  }
});
