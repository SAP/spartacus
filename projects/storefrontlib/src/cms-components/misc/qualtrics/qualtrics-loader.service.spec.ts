import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { of } from 'rxjs';
import { QualtricsLoaderService } from './qualtrics-loader.service';

@Injectable({
  providedIn: 'root',
})
class CustomQualtricsLoaderService extends QualtricsLoaderService {
  collectData() {
    return of(true);
  }
  protected isDataLoaded() {
    return this.collectData();
  }
}

const mockQsi = {
  API: {
    unload: (): void => {},
    load: () => {
      return {
        done: (_intercept: Function) => {},
      };
    },
    run: (): void => {},
  },
};

describe('QualtricsLoaderService', () => {
  let service: QualtricsLoaderService;
  let winRef: WindowRef;

  beforeAll(() => {
    TestBed.configureTestingModule({
      providers: [QualtricsLoaderService, CustomQualtricsLoaderService],
    });

    winRef = TestBed.inject(WindowRef);
    service = TestBed.inject(QualtricsLoaderService);

    winRef.nativeWindow['QSI'] = mockQsi;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Consume Qualtrics API', () => {
    beforeEach(() => {
      spyOn(winRef.nativeWindow['QSI'].API, 'unload').and.stub();
      spyOn(winRef.nativeWindow['QSI'].API, 'run').and.stub();
    });
    it('should not load Qualtrics when the qsi_js_loaded event is not triggered', () => {
      expect(winRef.nativeWindow['QSI'].API.run).not.toHaveBeenCalled();
    });

    it('should load Qualtrics API when the qsi_js_loaded event is triggered', () => {
      window.dispatchEvent(new Event('qsi_js_loaded'));
      expect(winRef.nativeWindow['QSI'].API.run).toHaveBeenCalledTimes(1);
    });

    it('should not unload Qualtrics API when the qsi_js_loaded event is triggered', () => {
      window.dispatchEvent(new Event('qsi_js_loaded'));
      expect(winRef.nativeWindow['QSI'].API.unload).not.toHaveBeenCalled();
    });

    it('should load twice when a the event is dispatched twice', () => {
      window.dispatchEvent(new Event('qsi_js_loaded'));
      window.dispatchEvent(new Event('qsi_js_loaded'));
      expect(winRef.nativeWindow['QSI'].API.run).toHaveBeenCalledTimes(2);
    });

    it('should unload when a script is loaded for the 2nd time', () => {
      service.addScript('whatever.js');
      expect(winRef.nativeWindow['QSI'].API.unload).not.toHaveBeenCalled();
      service.addScript('whatever.js');
      expect(winRef.nativeWindow['QSI'].API.unload).toHaveBeenCalled();
    });
  });

  describe('addScript()', () => {
    it('should add the given deployment script', () => {
      service.addScript('whatever.js');
      const el = document.querySelector(`script[src="whatever.js"]`);
      expect(el).toBeTruthy();
    });

    it('should add the same script only once', () => {
      service.addScript('whatever2.js');
      service.addScript('whatever2.js');

      const scripts = document.querySelectorAll(`script[src="whatever.js"]`);
      expect(scripts.length).toEqual(1);
    });

    it('should run Qualtrics API when the same script is added again', () => {
      spyOn(winRef.nativeWindow['QSI'].API, 'unload').and.stub();
      spyOn(winRef.nativeWindow['QSI'].API, 'run').and.stub();

      // ensure we have the qsi API available
      window.dispatchEvent(new Event('qsi_js_loaded'));

      service.addScript('whatever3.js');
      service.addScript('whatever3.js');

      expect(winRef.nativeWindow['QSI'].API.unload).toHaveBeenCalledTimes(1);
      expect(winRef.nativeWindow['QSI'].API.run).toHaveBeenCalled();
    });
  });

  describe('custom service', () => {
    it('should invoke custom data collector', () => {
      const customService = TestBed.inject(CustomQualtricsLoaderService);
      spyOn(customService, 'collectData').and.callThrough();

      window.dispatchEvent(new Event('qsi_js_loaded'));

      expect(customService.collectData).toHaveBeenCalled();
    });
  });
});
