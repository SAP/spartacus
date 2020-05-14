import { Injectable, RendererFactory2 } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WindowRef } from '@spartacus/core';
import { of } from 'rxjs';
import {
  QualtricsLoaderService,
  QUALTRICS_EVENT_NAME,
} from './qualtrics-loader.service';

const mockQsiJsApi = {
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

const createElementSpy = jasmine.createSpy('createElement').and.returnValue({});

class MockRendererFactory2 {
  createRenderer() {
    return {
      createElement: createElementSpy,
      appendChild() {},
    };
  }
}

const eventListener: Map<String, Function> = <Map<String, Function>>{};

const loadQsi = () => {
  eventListener[QUALTRICS_EVENT_NAME](new Event(QUALTRICS_EVENT_NAME));
};

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

describe('QualtricsLoaderService', () => {
  let service: QualtricsLoaderService;
  let winRef: WindowRef;

  beforeEach(() => {
    const mockedWindowRef = {
      nativeWindow: {
        addEventListener: (event, listener) => {
          eventListener[event] = listener;
        },
        removeEventListener: jasmine.createSpy('removeEventListener'),
        QSI: mockQsiJsApi,
      },
      document: {
        querySelector: () => {},
      },
    };

    TestBed.configureTestingModule({
      providers: [
        QualtricsLoaderService,
        CustomQualtricsLoaderService,
        { provide: WindowRef, useValue: mockedWindowRef },
        { provide: RendererFactory2, useClass: MockRendererFactory2 },
      ],
    });

    winRef = TestBed.inject(WindowRef);
    service = TestBed.inject(QualtricsLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Consume Qualtrics API', () => {
    let qsiRun: jasmine.Spy<any>;
    let qsiUnload: jasmine.Spy<any>;

    beforeEach(() => {
      qsiRun = spyOn(winRef.nativeWindow['QSI'].API, 'run').and.stub();
      qsiUnload = spyOn(winRef.nativeWindow['QSI'].API, 'unload').and.stub();
    });

    it('should not load Qualtrics when the qsi_js_loaded event is not triggered', () => {
      expect(qsiRun).not.toHaveBeenCalled();
    });

    describe('Qualtrics loaded', () => {
      beforeEach(() => {
        loadQsi();
      });

      it('should load Qualtrics API when the qsi_js_loaded event is triggered', () => {
        expect(qsiRun).toHaveBeenCalledTimes(1);
      });

      it('should not unload Qualtrics API when the qsi_js_loaded event is triggered', () => {
        expect(qsiUnload).not.toHaveBeenCalled();
      });

      it('should load twice when a the event is dispatched twice', () => {
        loadQsi();
        expect(qsiRun).toHaveBeenCalledTimes(2);
      });

      it('should unload when a script is alread in the DOM', () => {
        spyOn(winRef.document, 'querySelector').and.returnValue({} as Element);
        service.addScript('whatever.js');
        expect(qsiUnload).toHaveBeenCalled();
      });
    });
  });

  describe('addScript()', () => {
    beforeEach(() => {
      loadQsi();
    });

    it('should add the deployment script', () => {
      service.addScript('whatever.js');
      expect(createElementSpy).toHaveBeenCalledWith('script');
    });

    it('should not add the same script twice', () => {
      createElementSpy.calls.reset();
      // simulate script has been added
      spyOn(winRef.document, 'querySelector').and.returnValue({} as Element);
      service.addScript('whatever2.js');
      expect(createElementSpy).not.toHaveBeenCalled();
    });
  });

  describe('custom service', () => {
    it('should invoke custom data collector', () => {
      const customService = TestBed.inject(CustomQualtricsLoaderService);
      spyOn(customService, 'collectData').and.callThrough();

      eventListener[QUALTRICS_EVENT_NAME](new Event(QUALTRICS_EVENT_NAME));

      expect(customService.collectData).toHaveBeenCalled();
    });
  });
});
