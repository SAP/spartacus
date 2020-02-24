import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { of } from 'rxjs';
import { QualtricsConfig } from './config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';

const isDataLoadedMethod = 'isDataLoaded';

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
        QualtricsLoaderService,
        { provide: QualtricsConfig, useValue: mockQualtricsConfig },
        { provide: WindowRef, useValue: mockWindowRef },
      ],
    });

    winRef = TestBed.inject(WindowRef);
    service = TestBed.inject(QualtricsLoaderService);

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
