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
      const result = pipe.transform('testKey');
      expect(service.translateLazy).toHaveBeenCalledWith('testKey');
      expect(result).toBe('expectedValue');
    });
  });
});
