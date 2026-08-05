import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ScriptLoader, WindowRef } from '@spartacus/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
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

const mockedWindowRef = {
  nativeWindow: {
    addEventListener: (event, listener) => {
      eventListener[event] = listener;
    },
    removeEventListener: vi.fn(),
    QSI: mockQsiJsApi,
  },
  document: {
    querySelector: () => {},
  },
};

const eventListener: Map<String, Function> = <Map<String, Function>>{};

const loadQsi = () => {
  eventListener[QUALTRICS_EVENT_NAME](new Event(QUALTRICS_EVENT_NAME));
};

const mockScript = 'whatever.js';

class MockScriptLoader {
  embedScript(_embedOptions: { _src: string }): void {}
}

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
  let scriptLoader: ScriptLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QualtricsLoaderService,
        CustomQualtricsLoaderService,
        { provide: WindowRef, useValue: mockedWindowRef },
        { provide: ScriptLoader, useClass: MockScriptLoader },
      ],
    });

    winRef = TestBed.inject(WindowRef);
    service = TestBed.inject(QualtricsLoaderService);
    scriptLoader = TestBed.inject(ScriptLoader);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Consume Qualtrics API', () => {
    let qsiRun: ReturnType<typeof vi.spyOn>;
    let qsiUnload: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      qsiRun = vi.spyOn(winRef.nativeWindow['QSI'].API, 'run').mockImplementation(() => {});
      qsiUnload = vi.spyOn(winRef.nativeWindow['QSI'].API, 'unload').mockImplementation(() => {});
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
        vi.spyOn(winRef.document, 'querySelector').mockReturnValue({} as Element);
        service.addScript(mockScript);
        expect(qsiUnload).toHaveBeenCalled();
      });
    });
  });

  describe('addScript()', () => {
    beforeEach(() => {
      vi.spyOn(scriptLoader, 'embedScript');
      loadQsi();
    });

    it('should add the deployment script', () => {
      service.addScript(mockScript);
      expect(scriptLoader.embedScript).toHaveBeenCalledWith({
        src: mockScript,
      });
    });

    it('should not add the same script twice', () => {
      // simulate script has been added
      vi.spyOn(winRef.document, 'querySelector').mockReturnValue({} as Element);
      service.addScript(mockScript);
      expect(scriptLoader.embedScript).not.toHaveBeenCalled();
    });
  });

  describe('custom service', () => {
    it('should invoke custom data collector', () => {
      const customService = TestBed.inject(CustomQualtricsLoaderService);
      vi.spyOn(customService, 'collectData');

      eventListener[QUALTRICS_EVENT_NAME](new Event(QUALTRICS_EVENT_NAME));

      expect(customService.collectData).toHaveBeenCalled();
    });
  });
});
