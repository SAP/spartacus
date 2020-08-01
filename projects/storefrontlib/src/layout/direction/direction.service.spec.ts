import { TestBed } from '@angular/core/testing';
import { LanguageService, WindowRef } from '@spartacus/core';
import { EMPTY, of, Subject } from 'rxjs';
import { DirectionMode, LayoutDirection } from '../config/direction.model';
import { DirectionService } from './direction.service';

class MockWindowRef implements Partial<WindowRef> {
  document = { documentElement: { nodeName: 'document' } } as Document;
}

class MockLanguageService implements Partial<LanguageService> {
  getActive = () => EMPTY;
}

const MOCK_DEFAULT_MODE = 'mockDefaultMode' as DirectionMode;

describe('DirectionService', () => {
  let service: DirectionService;
  let languageService: LanguageService;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: WindowRef, useClass: MockWindowRef },
        { provide: LanguageService, useClass: MockLanguageService },
      ],
    });
    service = TestBed.inject(DirectionService);
    languageService = TestBed.inject(LanguageService);
    winRef = TestBed.inject(WindowRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addDirection', () => {
    it('should add `dir` attribute to the element', () => {
      const el = {} as HTMLElement;
      service.addDirection(el, DirectionMode.AUTO);
      expect(el.dir).toBe(DirectionMode.AUTO);

      service.addDirection(el, DirectionMode.LTR);
      expect(el.dir).toBe(DirectionMode.LTR);

      service.addDirection(el, DirectionMode.RTL);
      expect(el.dir).toBe(DirectionMode.RTL);
    });
  });

  describe('getDirection', () => {
    let config: LayoutDirection;

    beforeEach(() => {
      config = { default: MOCK_DEFAULT_MODE };
    });

    it('should return default mode, when no mapping for language', () => {
      expect(service.getDirection(config, 'langWithNoMapping')).toBe(
        MOCK_DEFAULT_MODE
      );
    });

    it('should return LTR, when language is mapped to LTR', () => {
      config.ltrLanguages = ['testLang'];
      expect(service.getDirection(config, 'testLang')).toBe(DirectionMode.LTR);
    });

    it('should return RTL, when language is mapped to RTL', () => {
      config.rtlLanguages = ['testLang'];
      expect(service.getDirection(config, 'testLang')).toBe(DirectionMode.RTL);
    });
  });

  describe('initialize', () => {
    let config: LayoutDirection;

    beforeEach(() => {
      config = { default: MOCK_DEFAULT_MODE };
    });

    describe('when `detect` config is falsy', () => {
      it('should set the default configured direction', () => {
        spyOn(languageService, 'getActive').and.callThrough();
        spyOn(service, 'addDirection');

        service.initialize(config);

        expect(languageService.getActive).not.toHaveBeenCalled();
        expect(service.addDirection).toHaveBeenCalledWith(
          winRef.document.documentElement,
          MOCK_DEFAULT_MODE
        );
      });
    });

    describe('when `detect` config is true', () => {
      beforeEach(() => {
        config.detect = true;
      });

      it('should set the direction by the active language', () => {
        const TEST_LANGUAGE = 'testLanguage';
        const TEST_DIRECTION = 'testDirection' as DirectionMode;

        spyOn(languageService, 'getActive').and.returnValue(of(TEST_LANGUAGE));
        spyOn(service, 'addDirection');
        spyOn(service, 'getDirection').and.returnValue(TEST_DIRECTION);

        service.initialize(config);

        expect(service.getDirection).toHaveBeenCalledWith(
          config,
          TEST_LANGUAGE
        );
        expect(service.addDirection).toHaveBeenCalledWith(
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
        spyOn(service, 'addDirection');
        spyOn(service, 'getDirection').and.returnValues(
          TEST_DIRECTION_1,
          TEST_DIRECTION_2
        );

        service.initialize(config);

        mockActiveLanguage$.next(TEST_LANGUAGE_1);
        expect(service.getDirection).toHaveBeenCalledWith(
          config,
          TEST_LANGUAGE_1
        );
        expect(service.addDirection).toHaveBeenCalledWith(
          winRef.document.documentElement,
          TEST_DIRECTION_1
        );

        mockActiveLanguage$.next(TEST_LANGUAGE_2);
        expect(service.getDirection).toHaveBeenCalledWith(
          config,
          TEST_LANGUAGE_2
        );
        expect(service.addDirection).toHaveBeenCalledWith(
          winRef.document.documentElement,
          TEST_DIRECTION_2
        );
      });
    });
  });
});
