import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CmsComponentMapping, LoggerService } from '@spartacus/core';
import { EMPTY } from 'rxjs';
import { ComponentHandler } from '../handlers/component-handler';
import { ComponentHandlerService } from './component-handler.service';
import createSpy = jasmine.createSpy;

@Injectable()
class TestHandler implements ComponentHandler {
  launcher = createSpy('launcher').and.returnValue(EMPTY);

  hasMatch(componentMapping: CmsComponentMapping): boolean {
    return componentMapping.component === 'test';
  }
}

describe('ComponentHandlerService', () => {
  let service: ComponentHandlerService;

  beforeEach(() => {
    console.log('Starting ComponentHandlerService test');
    TestBed.configureTestingModule({
      providers: [
        TestHandler,
        {
          provide: ComponentHandler,
          useExisting: TestHandler,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(ComponentHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLauncher', () => {
    it('should match handler', () => {
      const testHandler = TestBed.inject(TestHandler);
      const launcher = service.getLauncher(
        { component: 'test' },
        undefined,
        undefined
      );
      expect(launcher).toBeTruthy();
      expect(testHandler.launcher).toHaveBeenCalledWith(
        { component: 'test' },
        undefined,
        undefined,
        undefined
      );
    });

    it('should return undefined if not matched', () => {
      const logger = TestBed.inject(LoggerService);
      spyOn(logger, 'warn').and.stub();
      const launcher = service.getLauncher(
        { component: 'unknown' },
        undefined,
        undefined
      );
      expect(launcher).toBeUndefined();
    });
  });
});
