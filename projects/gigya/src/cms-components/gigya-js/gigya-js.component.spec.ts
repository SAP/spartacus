import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GigyaJsComponent } from './gigya-js.component';
import { GigyaConfig } from '../../config';
import {
  BaseSiteService,
  LanguageService,
  ExternalJsFileLoader,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';

const sampleGigyaConfig: GigyaConfig = {
  gigya: [
    {
      baseSite: 'electronics-spa',
      javascriptUrl: 'sample-url',
      sessionExpiration: 120,
    },
  ],
};

class BaseSiteServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}
class LanguageServiceStub {
  getActive(): Observable<string> {
    return of();
  }
}

declare var window: Window;

interface Window {
  gigya?: any;
}

class ExternalJsFileLoaderMock {
  public load(
    _src: string,
    _params?: Object,
    _callback?: EventListener
  ): void {}
}

describe('GigyaJsComponent', () => {
  let component: GigyaJsComponent;
  let fixture: ComponentFixture<GigyaJsComponent>;
  let baseSiteService: BaseSiteService;
  let languageService: LanguageService;
  let externalJsFileLoaderMock: ExternalJsFileLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GigyaJsComponent],

      providers: [
        { provide: GigyaConfig, useValue: sampleGigyaConfig },
        { provide: BaseSiteService, useClass: BaseSiteServiceStub },
        { provide: LanguageService, useClass: LanguageServiceStub },
        { provide: ExternalJsFileLoader, useClass: ExternalJsFileLoaderMock },
      ],
    });
    baseSiteService = TestBed.inject(BaseSiteService);
    languageService = TestBed.inject(LanguageService);
    externalJsFileLoaderMock = TestBed.inject(ExternalJsFileLoader);
    fixture = TestBed.createComponent(GigyaJsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load gigya script', () => {
    const site = 'electronics-spa';
    const language = 'en';

    spyOn(externalJsFileLoaderMock, 'load');
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
    spyOn(languageService, 'getActive').and.returnValue(of(language));

    component.loadGigyaJavascript();

    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(1);
  });

  it('should load gigya script on initializing the component', () => {
    const site = 'electronics-spa';
    const language = 'en';

    spyOn(externalJsFileLoaderMock, 'load');
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
    spyOn(languageService, 'getActive').and.returnValue(of(language));

    component.ngOnInit();

    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(1);
  });

  it('should load gigya script as empty for missing configuration', () => {
    const site = '';
    const language = 'en';

    spyOn(externalJsFileLoaderMock, 'load');
    spyOn(baseSiteService, 'getActive').and.returnValue(of(site));
    spyOn(languageService, 'getActive').and.returnValue(of(language));

    component.ngOnInit();

    expect(externalJsFileLoaderMock.load).toHaveBeenCalledTimes(1);
  });

  it('should register event handlers for gigya login', () => {
    component.registerEventListener = true;
    window.gigya = {};
    spyOn(component, 'addGigyaEventHandlers');

    component.registerEventListeners();

    expect(component.addGigyaEventHandlers).toHaveBeenCalledTimes(1);
  });

  it('should not register event handlers for gigya login when window.gigya is undefined', () => {
    component.registerEventListener = true;
    window.gigya = undefined;
    spyOn(component, 'addGigyaEventHandlers');

    component.registerEventListeners();

    expect(component.addGigyaEventHandlers).toHaveBeenCalledTimes(0);
  });
});
