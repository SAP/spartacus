import { TestBed } from '@angular/core/testing';
import {
  ConfigInitializerService,
  LanguageService,
  WindowRef,
} from '@spartacus/core';
import { EMPTY, of, Subject } from 'rxjs';
import { DirectionMode } from './config/direction.model';
import { DirectionService } from './direction.service';

class MockWindowRef implements Partial<WindowRef> {
  document = { documentElement: { nodeName: 'document' } } as Document;
}

class MockLanguageService implements Partial<LanguageService> {
  getActive = () => EMPTY;
}

class MockConfigInitializerService {
  getStable() {}
}

describe('DirectionService', () => {
  let service: DirectionService;
  let languageService: LanguageService;
  let winRef: WindowRef;
  let configInitializerService: ConfigInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: ConfigInitializerService,
          useClass: MockConfigInitializerService,
        },
      ],
    });
    service = TestBed.inject(DirectionService);
    languageService = TestBed.inject(LanguageService);
    winRef = TestBed.inject(WindowRef);
    configInitializerService = TestBed.inject(ConfigInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addDirection', () => {
    it('should add dir=ltr attribute to element', () => {
      const el = {
        setAttribute: jasmine.createSpy('setAttribute') as any,
      } as HTMLElement;
      service.setDirection(el, DirectionMode.LTR);
      expect(el.setAttribute).toHaveBeenCalledWith('dir', DirectionMode.LTR);
    });

    it('should add dir=rtl attribute to element', () => {
      const el = {
        setAttribute: jasmine.createSpy('setAttribute') as any,
      } as HTMLElement;
      service.setDirection(el, DirectionMode.RTL);
      expect(el.setAttribute).toHaveBeenCalledWith('dir', DirectionMode.RTL);
    });

    it('should clear dir attribute of element', () => {
      const el = {
        removeAttribute: jasmine.createSpy('removeAttribute') as any,
      } as HTMLElement;
      service.setDirection(el, undefined);
      expect(el.removeAttribute).toHaveBeenCalledWith('dir');
    });
  });

  describe('getDirection', () => {
    describe('without default', () => {
      beforeEach(() => {
        spyOn(configInitializerService, 'getStable').and.returnValue(
          of({
            direction: {
              detect: true,
              ltrLanguages: ['en', 'de'],
              rtlLanguages: ['ar', 'he'],
            },
          })
        );
        service.initialize();
      });

      it('should return LTR direction for ltr language', () => {
        expect(service.getDirection('en')).toBe(DirectionMode.LTR);
      });

      it('should return RTL direction for rtl language', () => {
        expect(service.getDirection('he')).toBe(DirectionMode.RTL);
      });

      it('should return undefined when no language mapping is available', () => {
        expect(service.getDirection('unknown')).toBeUndefined();
      });
    });

    describe('with default', () => {
      beforeEach(() => {
        spyOn(configInitializerService, 'getStable').and.returnValue(
          of({
            direction: {
              detect: true,
              default: DirectionMode.RTL,
            },
          })
        );
        service.initialize();
      });
      it('should return default direction for unknown language direction', () => {
        expect(service.getDirection('unknown')).toBe(DirectionMode.RTL);
      });
    });
  });

  describe('initialize', () => {
    describe('when `detect` config is falsy', () => {
      beforeEach(() => {
        spyOn(languageService, 'getActive').and.callThrough();
        spyOn(service, 'setDirection');
        spyOn(configInitializerService, 'getStable').and.returnValue(
          of({
            direction: { detect: false, default: DirectionMode.LTR },
          })
        );
      });

      it('should set the default configured direction', () => {
        service.initialize();

        expect(languageService.getActive).not.toHaveBeenCalled();
        expect(service.setDirection).toHaveBeenCalledWith(
          winRef.document.documentElement,
          DirectionMode.LTR
        );
      });
    });

    describe('when `detect` config is true', () => {
      beforeEach(() => {
        spyOn(configInitializerService, 'getStable').and.returnValue(
          of({
            direction: { detect: true, default: DirectionMode.LTR },
          })
        );
      });

      it('should set the direction by the active language', () => {
        const TEST_LANGUAGE = 'testLanguage';
        const TEST_DIRECTION = 'testDirection' as DirectionMode;

        spyOn(languageService, 'getActive').and.returnValue(of(TEST_LANGUAGE));
        spyOn(service, 'setDirection');
        spyOn(service, 'getDirection').and.returnValue(TEST_DIRECTION);

        service.initialize();

        expect(service.getDirection).toHaveBeenCalledWith(TEST_LANGUAGE);
        expect(service.setDirection).toHaveBeenCalledWith(
          winRef.document.documentElement,
          TEST_DIRECTION
        );
      });

      it('should set the direction each time the active language changes', () => {
        const TEST_LANGUAGE_1 = 'testLanguage_1';
        const TEST_LANGUAGE_2 = 'testLanguage_2';
        const TEST_DIRECTION_1 = 'testDirection_1' as DirectionMode;
        const TEST_DIRECTION_2 = 'testDirection_2' as DirectionMode;

        const mockActiveLanguage$ = new Subject<string>();
        spyOn(languageService, 'getActive').and.returnValue(
          mockActiveLanguage$
        );
        spyOn(service, 'setDirection');
        spyOn(service, 'getDirection').and.returnValues(
          TEST_DIRECTION_1,
          TEST_DIRECTION_2
        );

        service.initialize();

        mockActiveLanguage$.next(TEST_LANGUAGE_1);
        expect(service.getDirection).toHaveBeenCalledWith(TEST_LANGUAGE_1);
        expect(service.setDirection).toHaveBeenCalledWith(
          winRef.document.documentElement,
          TEST_DIRECTION_1
        );

        mockActiveLanguage$.next(TEST_LANGUAGE_2);
        expect(service.getDirection).toHaveBeenCalledWith(TEST_LANGUAGE_2);
        expect(service.setDirection).toHaveBeenCalledWith(
          winRef.document.documentElement,
          TEST_DIRECTION_2
        );

        expect(service.getDirection).toHaveBeenCalledTimes(2);
      });
    });
  });
});
