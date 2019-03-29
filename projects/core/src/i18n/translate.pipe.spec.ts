import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import createSpy = jasmine.createSpy;
import { of } from 'rxjs';
import { TranslatePipe } from '.';
import { ChangeDetectorRef } from '@angular/core';

describe('TranslatePipe', () => {
  let pipe: TranslatePipe;
  let service: TranslationService;
  let cd: ChangeDetectorRef;

  beforeEach(() => {
    const mockTranslateService = {
      translate: () => {}
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
    it('should return result of service.translate', () => {
      spyOn(service, 'translate').and.returnValue(of('expectedValue'));
      const result = pipe.transform('testKey', { param: 'param1' });
      expect(service.translate).toHaveBeenCalledWith(
        'testKey',
        { param: 'param1' },
        true
      );
      expect(result).toBe('expectedValue');
    });

    it('should NOT call service.translate twice if pipe.transform was called twice with the same arguments', () => {
      spyOn(service, 'translate').and.returnValue(of());
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKey', { param: 'param1' });
      expect(service.translate).toHaveBeenCalledTimes(1);
    });

    it('should call service.translate every time pipe.transform was called with different keys', () => {
      spyOn(service, 'translate').and.returnValue(of());
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKeyOther', { param: 'param1' });
      expect(service.translate).toHaveBeenCalledTimes(2);
    });

    it('should call service.translate every time pipe.transform was called with different options', () => {
      spyOn(service, 'translate').and.returnValue(of());
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKey', { param: 'param2' });
      pipe.transform('testKey', { param: 'param2', otherParam: 'otherParam1' });
      expect(service.translate).toHaveBeenCalledTimes(3);
    });

    it('should call cd.markForCheck every time when service.translate emits value', () => {
      spyOn(service, 'translate').and.returnValues(
        of('value1', 'value2'),
        of('value3')
      );
      pipe.transform('testKey', { param: 'param1' });
      pipe.transform('testKey', { param: 'param2' });
      expect(cd.markForCheck).toHaveBeenCalledTimes(3);
    });
  });
});
