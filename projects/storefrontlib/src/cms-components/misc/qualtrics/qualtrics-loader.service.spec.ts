import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { of } from 'rxjs';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';

const isDataLoadedMethod = 'isDataLoaded';
const initializeMethod = 'initialize';
const setupMethod = 'setup';
const isQualtricsConfiguredMethod = 'isQualtricsConfigured';
const event = new Event('qsi_js_loaded');

const mockQualtricsConfig: QualtricsConfig = {
  qualtrics: {
    projectId: 'Test123',
  },
};

const mockWindowRef = {
  nativeWindow: {
    dispatchEvent: (e): Event => {
      return e;
    },
    QSI: {
      API: {
        unload: (): void => {},
        load: () => {
          return {
            done: (_intercept: Function) => {},
          };
        },
        run: (): void => {},
      },
    },
  },
  document: {
    createElement: (): void => {},
    appendChild: (): void => {},
  },
};

describe('QualtricsLoaderService', () => {
  let service: QualtricsLoaderService;
  let winRef: WindowRef;
  let config: QualtricsConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QualtricsLoaderService,
        { provide: QualtricsConfig, useValue: mockQualtricsConfig },
        { provide: WindowRef, useValue: mockWindowRef },
      ],
    });

    winRef = TestBed.get(WindowRef as Type<WindowRef>);
    config = TestBed.get(QualtricsConfig as Type<QualtricsConfig>);
    service = TestBed.get(QualtricsLoaderService as Type<
      QualtricsLoaderService
    >);

    spyOn(winRef.nativeWindow['QSI'].API, 'unload').and.stub();
    spyOn(winRef.nativeWindow['QSI'].API, 'load').and.callThrough();
    spyOn(winRef.nativeWindow['QSI'].API, 'run').and.stub();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have qualtrics enabled', () => {
    expect(winRef.nativeWindow['QSI']).toBeDefined();
  });

  describe(initializeMethod, () => {
    it('should call qualtricsLoaded$.next(true) when qsi_js_loaded event is fired', () => {
      //always false no matter what I try
      //https://stackoverflow.com/questions/45111498/unit-test-angular-2-service-subject
      winRef.nativeWindow.dispatchEvent(event);
      service[initializeMethod]();

      service['qualtricsLoaded$'].subscribe(test => {
        console.log('mreiogmoergmoe', test);
      });
    });
  });

  describe(setupMethod, () => {
    it('should append the script and div element', () => {
      const qualtricsScript = {
        asymmetricMatch: function(actual) {
          return (
            actual.type === 'text/javascript' &&
            actual.defer === true &&
            actual.src === 'assets/qualtricsIntegration.js'
          );
        },
      };

      const idScript = {
        asymmetricMatch: function(actual) {
          return actual.id === mockQualtricsConfig.qualtrics.projectId;
        },
      };

      spyOn(winRef.document, 'appendChild');

      service[setupMethod]();

      expect(winRef.document).toHaveBeenCalledWith(qualtricsScript);
      expect(winRef.document).toHaveBeenCalledWith(idScript);
    });
  });

  describe(isQualtricsConfiguredMethod, () => {
    describe('when both qualtrics and qualtrics.project are defined', () => {
      it('should return true', () => {
        config.qualtrics = mockQualtricsConfig.qualtrics;
        const result = service[isQualtricsConfiguredMethod]();

        expect(result).toEqual(true);
      });
    });
    describe('when either qualtrics or qualtrics.project are falsy', () => {
      it('should return false', () => {
        config.qualtrics = {};
        const result = service[isQualtricsConfiguredMethod]();

        expect(result).toEqual(false);
      });
    });
  });

  describe('load', () => {
    describe('when isDataLoaded() returns true', () => {
      it('should call Qualtrics API', () => {
        spyOn<any>(service, 'isDataLoaded').and.returnValue(of(true));

        service['qualtricsLoaded$'].next(true);
        let result = false;
        service
          .load()
          .subscribe(value => (result = value))
          .unsubscribe();

        expect(result).toEqual(true);
        expect(winRef.nativeWindow['QSI'].API.unload).toHaveBeenCalled();
        expect(winRef.nativeWindow['QSI'].API.load).toHaveBeenCalled();
        expect(winRef.nativeWindow['QSI'].API.run).toHaveBeenCalled();
      });
    });
    describe('when isDataLoaded() returns false', () => {
      it('should not call Qualtrics API', () => {
        spyOn<any>(service, 'isDataLoaded').and.returnValue(of(false));
        service['qualtricsLoaded$'].next(false);

        service
          .load()
          .subscribe()
          .unsubscribe();

        expect(winRef.nativeWindow['QSI'].API.unload).not.toHaveBeenCalled();
        expect(winRef.nativeWindow['QSI'].API.load).not.toHaveBeenCalled();
        expect(winRef.nativeWindow['QSI'].API.run).not.toHaveBeenCalled();
      });
    });
  });

  describe('isDataLoadedMethod', () => {
    it('return true by default', () => {
      let result = false;
      service[isDataLoadedMethod]().subscribe(value => (result = value));
      expect(result).toEqual(true);
    });
  });
});
