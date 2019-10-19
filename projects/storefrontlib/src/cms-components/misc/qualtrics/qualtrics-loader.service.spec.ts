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

const mockQualtricsConfig: QualtricsConfig = {
  qualtrics: {},
};

const mockWindowRef = {
  nativeWindow: {
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
  document: {},
};

describe('QualtricsLoaderService', () => {
  let service: QualtricsLoaderService;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: QualtricsConfig, useValue: mockQualtricsConfig },
        { provide: WindowRef, useValue: mockWindowRef },
      ],
    });

    winRef = TestBed.get(WindowRef as Type<WindowRef>);
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
      // TODO:
    });
  });

  describe(setupMethod, () => {
    it('should append the script and div element', () => {
      // TODO:
    });
  });

  describe(isQualtricsConfiguredMethod, () => {
    describe('when both qualtrics and qualtrics.project are defined', () => {
      it('should return true', () => {
        // TODO:
      });
    });
    describe('when either qualtrics or qualtrics.project are falsy', () => {
      it('should return false', () => {
        // TODO:
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
