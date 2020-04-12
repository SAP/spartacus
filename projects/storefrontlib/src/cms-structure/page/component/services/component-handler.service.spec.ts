import { TestBed } from '@angular/core/testing';

import { ComponentHandlerService } from './component-handler.service';

describe('ComponentLauncherService', () => {
  let service: ComponentHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
