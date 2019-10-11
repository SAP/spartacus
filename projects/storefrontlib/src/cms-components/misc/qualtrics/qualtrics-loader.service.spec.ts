import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { QualtricsConfig } from '../../../shared/config/qualtrics-config';
import { QualtricsLoaderService } from './qualtrics-loader.service';

const IsQualtricsLoaded$ = new BehaviorSubject(false);
const isDataLoadedMethod = 'isDataLoaded';
const loadQualtricsMethod = 'loadQualtrics';
const verifyQualtricsMethod = 'verifyQualtrics';
const isQualtricsConfigured = 'isQualtricsConfigured';

const mockQualtricsConfig: QualtricsConfig = {
  qualtrics: {},
};

const mockWindowRef = {
  nativeWindow: {
    QSI: {
      API: {
        unload: (): any => {},
        load: (): any => {},
        run: (): any => {},
      },
    },
  },
};

fdescribe('QualtricsLoaderService', () => {
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

    spyOn(winRef.nativeWindow['QSI'].API, 'unload').and.callThrough();
    spyOn(winRef.nativeWindow['QSI'].API, 'load').and.callThrough();
    spyOn(winRef.nativeWindow['QSI'].API, 'run').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have qualtrics enabled', () => {
    expect(winRef.nativeWindow['QSI']).toBeDefined();
  });

  it('should load qualtrics', () => {
    service
      .load()
      .subscribe()
      .unsubscribe();

    expect(winRef.nativeWindow['QSI'].API.unload).toHaveBeenCalled();
    expect(winRef.nativeWindow['QSI'].API.load).toHaveBeenCalled();
    expect(winRef.nativeWindow['QSI'].API.run).toHaveBeenCalled();
  });

  describe('isDataLoadedMethod', () => {
    it('should check if data is loaded', () => {
      spyOn<any>(service, isDataLoadedMethod).and.returnValue(of(true));

      service[isDataLoadedMethod]();

      expect(service[isDataLoadedMethod]).toHaveBeenCalledWith(of(true));
    });
  });
});
