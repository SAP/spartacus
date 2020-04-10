import { TestBed } from '@angular/core/testing';

import { ComponentLauncherResolverService } from './component-launcher-resolver.service';

describe('ComponentLauncherResolverService', () => {
  let service: ComponentLauncherResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentLauncherResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
