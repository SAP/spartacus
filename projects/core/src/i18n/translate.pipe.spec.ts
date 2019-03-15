import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { I18NEXT_INSTANCE } from './i18next/i18next-providers';
import createSpy = jasmine.createSpy;
import { ServerConfig } from '../config';
import { Subject } from 'rxjs';
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
      lazyTranslate: () => {},
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

  fdescribe('transform', () => {
    it('should return result of service.lazyTranslate', () => {
      spyOn(service, 'lazyTranslate').and.returnValue('expectedValue');
      const result = pipe.transform('testKey');
      expect(service.lazyTranslate).toHaveBeenCalledWith('testKey');
      expect(result).toBe('expectedValue');
    });
  });
});
