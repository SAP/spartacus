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
  mapId: 'MOCK_MAP_ID',
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

// Captures the Map instances created during a render so that the tests can
// assert on panTo/setZoom calls made by centerMap.
let mapInstances: any[] = [];

function createGoogleMock(): any {
  const googleMock: any = {};
  googleMock.maps = {};
  googleMock.maps.MapTypeId = {};
  googleMock.maps.Animation = {};
  googleMock.maps.Map = function (mapDomElement: HTMLElement, mapProp: any) {
    mapDomElement.innerHTML = MAP_DOM_ELEMENT_INNER_HTML;
    this.mapProp = mapProp;
    this.setCenter = function () {};
    this.setZoom = function () {};
    this.panTo = function () {};
    mapInstances.push(this);
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
    PinElement: function (options: any) {
      this.options = options;
      this.glyphText = options?.glyphText;
      // Real DOM element so the service can attach hover listeners to it.
      this.element = document.createElement('div');
      this.element.textContent = options?.glyphText ?? '';
    },
    AdvancedMarkerElement: function (options: any) {
      this.options = options;
      this.content = options.content;
      this.position = options.position;
      this.gmpClickable = options.gmpClickable;
      this.listeners = {};
      this.addListener = function (event: string, handler: Function) {
        this.listeners[event] = handler;
      };
      advancedMarkerInstances.push(this);
    },
  };
  return googleMock;
}

class ScriptLoaderMock {
  public embedScript(embedOptions: {
    _src: string;
    params?: any;
    _attributes?: Object;
    callback?: EventListener;
  }): void {
    (window as any)['google'] = createGoogleMock();
    if (embedOptions.params?.callback) {
      // Async bootstrap loader: Google invokes the global function named by the
      // `callback` URL param once the API is fully initialized.
      (window as any)[embedOptions.params.callback]();
    } else {
      embedOptions.callback?.(new Event('test'));
    }
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
    mapInstances = [];

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

  describe('with useGoogleMapsAsyncLoading enabled', () => {
    beforeEach(() => {
      featureToggles.set('useGoogleMapsAsyncLoading', true);
      setApiKey(MOCK_MAPS_API_KEY);
    });

    it('should embed the script with the loading=async and callback params', fakeAsync(() => {
      spyOn(scriptLoaderMock, 'embedScript').and.callThrough();

      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );

      expect(scriptLoaderMock.embedScript).toHaveBeenCalledWith({
        src: config.googleMaps?.apiUrl,
        params: Object({
          key: MOCK_MAPS_API_KEY,
          loading: 'async',
          callback: jasmine.stringMatching(
            /^__spartacusGoogleMapsInit_\d+$/
          ) as any,
        }),
        attributes: { type: 'text/javascript' },
        callback: undefined,
      });
    }));

    it('should draw the map from the global callback and clean it up', fakeAsync(() => {
      let callbackName: string | undefined;
      spyOn(scriptLoaderMock, 'embedScript').and.callFake((options: any) => {
        callbackName = options.params?.callback;
        (window as any)['google'] = createGoogleMock();
        // Emulate Google invoking the global callback once the API is ready.
        (window as any)[callbackName as string]();
      });

      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );

      expect(mapDomElement.innerHTML).toEqual(MAP_DOM_ELEMENT_INNER_HTML);
      // The global callback removes itself so it can't leak or fire twice.
      expect((window as any)[callbackName as string]).toBeUndefined();
    }));
  });

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

    it('should skip markers when StoreLocationService returns undefined coordinates', fakeAsync(() => {
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

      expect(advancedMarkerInstances.length).toBe(0);
    }));

    it('should create the map with an undefined center when coordinates are missing', fakeAsync(() => {
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

      expect(mapInstances[0].mapProp.center).toBeUndefined();
    }));

    it('should render a numbered pin inside the marker content wrapper', fakeAsync(() => {
      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );
      tick();

      // The content is a wrapper the service owns; the PinElement (with the
      // store number as its glyph) is nested inside it.
      const content = advancedMarkerInstances[0].content as HTMLElement;
      expect(content.textContent).toBe('1');
    }));

    it('should toggle the bounce class on the inner pin on mouseover and mouseout', fakeAsync(() => {
      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );
      tick();

      // Hover events are handled on the transformed content wrapper, but the
      // bounce class must land on the inner pin so it doesn't fight Google's
      // positioning transform on the wrapper.
      const wrapper = advancedMarkerInstances[0].content as HTMLElement;
      const pin = wrapper.firstElementChild as HTMLElement;

      wrapper.dispatchEvent(new Event('mouseover'));
      expect(pin.classList.contains('cx-store-marker-bounce')).toBe(true);
      expect(wrapper.classList.contains('cx-store-marker-bounce')).toBe(false);

      wrapper.dispatchEvent(new Event('mouseout'));
      expect(pin.classList.contains('cx-store-marker-bounce')).toBe(false);
    }));

    it('should mark the marker clickable and invoke selectMarkerHandler with the marker index on click', fakeAsync(() => {
      const handler = jasmine.createSpy('selectMarkerHandler');

      googleMapRendererService.renderMap(mapDomElement, locations, handler);
      tick();

      expect(advancedMarkerInstances[0].gmpClickable).toBe(true);
      advancedMarkerInstances[0].listeners['click']();
      expect(handler).toHaveBeenCalledWith(0);
    }));

    it('should not register a click listener nor mark clickable when selectMarkerHandler is not provided', fakeAsync(() => {
      googleMapRendererService.renderMap(mapDomElement, locations);
      tick();

      expect(advancedMarkerInstances[0].gmpClickable).toBe(false);
      expect(advancedMarkerInstances[0].listeners['click']).toBeUndefined();
    }));

    it('should load the marker library when embedding the script', fakeAsync(() => {
      spyOn(scriptLoaderMock, 'embedScript').and.callThrough();

      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );

      expect(scriptLoaderMock.embedScript).toHaveBeenCalledWith({
        src: config.googleMaps?.apiUrl,
        params: Object({
          key: MOCK_MAPS_API_KEY,
          libraries: 'marker',
        }),
        attributes: { type: 'text/javascript' },
        callback: jasmine.any(Function) as any,
      });
    }));

    it('should create the map with the configured mapId', fakeAsync(() => {
      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );
      tick();

      expect(mapInstances[0].mapProp.mapId).toBe(mockGoogleMapsConfig.mapId);
    }));
  });

  it('should not load the marker library nor set a mapId when the toggle is disabled', fakeAsync(() => {
    setApiKey(MOCK_MAPS_API_KEY);
    spyOn(scriptLoaderMock, 'embedScript').and.callThrough();

    googleMapRendererService.renderMap(mapDomElement, locations, selectedIndex);
    tick();

    expect(scriptLoaderMock.embedScript).toHaveBeenCalledWith({
      src: config.googleMaps?.apiUrl,
      params: Object({ key: MOCK_MAPS_API_KEY }),
      attributes: { type: 'text/javascript' },
      callback: jasmine.any(Function) as any,
    });
    expect(mapInstances[0].mapProp.mapId).toBeUndefined();
  }));

  describe('centerMap', () => {
    function renderAndGetMap(): any {
      setApiKey(MOCK_MAPS_API_KEY);
      googleMapRendererService.renderMap(
        mapDomElement,
        locations,
        selectedIndex
      );
      tick();
      return mapInstances[0];
    }

    it('should pan the map to the given coordinates', fakeAsync(() => {
      const map = renderAndGetMap();
      spyOn(map, 'panTo');

      googleMapRendererService.centerMap(30, 40);

      expect(map.panTo).toHaveBeenCalledWith({ lat: 30, lng: 40 });
    }));

    it('should zoom to selectedMarkerScale when configured', fakeAsync(() => {
      const map = renderAndGetMap();
      spyOn(map, 'setZoom');

      googleMapRendererService.centerMap(30, 40);

      expect(map.setZoom).toHaveBeenCalledWith(
        mockGoogleMapsConfig.selectedMarkerScale
      );
    }));

    it('should not zoom when selectedMarkerScale is not configured', fakeAsync(() => {
      const map = renderAndGetMap();
      spyOn(map, 'setZoom');
      if (config.googleMaps) {
        config.googleMaps.selectedMarkerScale = undefined;
      }

      googleMapRendererService.centerMap(30, 40);

      expect(map.setZoom).not.toHaveBeenCalled();
    }));

    it('should do nothing when no map has been rendered', () => {
      expect(() => googleMapRendererService.centerMap(30, 40)).not.toThrow();
    });
  });

  function setApiKey(keyValue: string) {
    if (config.googleMaps) {
      config.googleMaps.apiKey = keyValue;
    } else {
      fail('Config undefined');
    }
  }
});
