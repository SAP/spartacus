import { GoogleMapRendererServcie } from './google-map-renderer.service';
import {
  TestBed,
  async,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';
import { ExternalJsFileLoader } from './external-js-file-loader.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { OccE2eConfigurationService } from '../../occ/e2e/configuration-service';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

const MAP_DOM_ELEMENT_INNER_HTML = 'map dom element inner html';
const GOOGLE_API_KEY = 'google_api_key';

@Injectable({ providedIn: 'root' })
export class ExternalJsFileLoaderMock {
  public load(src: string, params?: Object, callback?: EventListener): void {
    window['google'] = {};
    window['google'].maps = {};
    window['google'].maps.MapTypeId = {};
    window['google'].maps.Map = function(mapDomElement: HTMLElement) {
      mapDomElement.innerHTML = MAP_DOM_ELEMENT_INNER_HTML;
    };
    window['google'].maps.LatLng = function() {};
    window['google'].maps.Marker = function() {
      this.setMap = function() {};
      this.setLabel = function() {};
    };
    callback(new Event('test'));
  }
}

@Injectable({ providedIn: 'root' })
export class OccE2eConfigurationServiceMock {
  getConfiguration(configurationKey: string): Observable<any> {
    return of(GOOGLE_API_KEY);
  }
}

describe('GoogleMapRendererService', () => {
  let googleMapRendererService: GoogleMapRendererServcie;

  let externalJsFileLoaderMock: ExternalJsFileLoader;
  let occE2eConfigurationServiceMock: OccE2eConfigurationService;
  const mapDomElement: HTMLElement = document.createElement('div');

  const locations = [
    {
      geoPoint: {
        latitude: 0,
        longitude: 0
      }
    }
  ];

  beforeEach(() => {
    const bed = TestBed.configureTestingModule({
      providers: [
        GoogleMapRendererServcie,
        { provide: ExternalJsFileLoader, useClass: ExternalJsFileLoaderMock },
        {
          provide: OccE2eConfigurationService,
          useClass: OccE2eConfigurationServiceMock
        }
      ]
    });

    externalJsFileLoaderMock = bed.get(ExternalJsFileLoader);
    googleMapRendererService = bed.get(GoogleMapRendererServcie);
    occE2eConfigurationServiceMock = bed.get(OccE2eConfigurationService);
  });

  // GIVEN

  // WHEN

  // THEN

  it(
    'should render map',
    fakeAsync(() => {
      spyOn(
        occE2eConfigurationServiceMock,
        'getConfiguration'
      ).and.callThrough();
      spyOn(externalJsFileLoaderMock, 'load').and.callThrough();

      googleMapRendererService.renderMap(mapDomElement, locations);
      expect(
        occE2eConfigurationServiceMock.getConfiguration
      ).toHaveBeenCalledWith('e2egoogleservices.apikey');
      expect(externalJsFileLoaderMock.load).toHaveBeenCalledWith(
        'https://maps.googleapis.com/maps/api/js',
        Object({ key: GOOGLE_API_KEY }),
        jasmine.any(Function)
      );

      tick();
      expect(mapDomElement.innerHTML).toEqual(MAP_DOM_ELEMENT_INNER_HTML);
    })
  );

  it(
    'should not create a new map',
    fakeAsync(() => {
      googleMapRendererService.renderMap(mapDomElement, locations);
      tick();

      spyOn(
        occE2eConfigurationServiceMock,
        'getConfiguration'
      ).and.callThrough();
      spyOn(externalJsFileLoaderMock, 'load').and.callThrough();

      expect(
        occE2eConfigurationServiceMock.getConfiguration
      ).toHaveBeenCalledTimes(0);
      expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(0);
    })
  );
});
