import { TestBed } from '@angular/core/testing';

import { ComponentHandlerService } from './component-handler.service';
import { ComponentHandler } from '../handlers/component-handler';
import { Injectable } from '@angular/core';
import { CmsComponentMapping } from '@spartacus/core';

@Injectable()
class TestHandler implements ComponentHandler {
  launcher() {
    return undefined;
  }

  hasMatch(componentMapping: CmsComponentMapping): boolean {
    return componentMapping.component === 'test';
  }
}

describe('ComponentHandlerService', () => {
  let service: ComponentHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ComponentHandler,
          useClass: TestHandler,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(ComponentHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('resolve', () => {
    it('should match handler', () => {
      expect(service.resolve({ component: 'test' })).toBeInstanceOf(
        TestHandler
      );
    });
    it('should return undefined if not matched', () => {
      expect(service.resolve({ component: 'unknown' })).toBeUndefined();
    });
  });
});
