import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import createSpy = jasmine.createSpy;
import { Subject, of } from 'rxjs';
import { TranslatePipe } from '.';
import { ChangeDetectorRef } from '@angular/core';

fdescribe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let service: TranslationService;
  let cd: ChangeDetectorRef;
  let mockServiceLanguageChanged$: Subject<string>;

  beforeEach(() => {
    mockServiceLanguageChanged$ = new Subject();
    const mockTranslateService = {
      translateLazy: () => {},
      languageChanged$: mockServiceLanguageChanged$
    };

    TestBed.configureTestingModule({
      providers: [
        TranslatePipe,
        {
          provide: ChangeDetectorRef,
          useValue: { markForCheck: createSpy('markForCheck') }
        },
        { provide: TranslationService, useValue: mockTranslateService }
      ]
    });

    pipe = TestBed.get(TranslatePipe);
    service = TestBed.get(TranslationService);
    cd = TestBed.get(ChangeDetectorRef);
  });

  describe('transform', () => {
    it('should return result of service.translateLazy', () => {
      spyOn(service, 'translateLazy').and.returnValue(of('expectedValue'));
      const result = pipe.transform('testKey', { param: 'param1' });
      expect(service.translateLazy).toHaveBeenCalledWith('testKey', {
        param: 'param1'
      });
      expect(result).toBe('expectedValue');
    });

    it('should NOT call service.translateLazy twice if pipe.transform was called twice with the same arguments', () => {
      spyOn(service, 'translateLazy').and.returnValue(of());
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKey', { param: 'param1' });
      expect(service.translateLazy).toHaveBeenCalledTimes(1);
    });

    it('should call service.translateLazy every time pipe.transform was called with different keys', () => {
      spyOn(service, 'translateLazy').and.returnValue(of());
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKeyOther', { param: 'param1' });
      expect(service.translateLazy).toHaveBeenCalledTimes(2);
    });

    it('should call service.translateLazy every time pipe.transform was called with different options', () => {
      spyOn(service, 'translateLazy').and.returnValue(of());
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKey', { param: 'param2' });
      pipe.transform('testKey', { param: 'param2', otherParam: 'otherParam1' });
      expect(service.translateLazy).toHaveBeenCalledTimes(3);
    });

    it('should call cd.markForCheck when service.translateLazy emits value', () => {
      spyOn(service, 'translateLazy').and.returnValue(of('value'));
      pipe.transform('testKey', { param: 'param1' });
      expect(cd.markForCheck).toHaveBeenCalled();
    });
  });
});
