import { TestBed } from '@angular/core/testing';
//import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { ConfigModule } from '@spartacus/core';
import { CmsGuardsService } from '../services';
import { MultiCmsPageGuardService } from './multi-cms-page-guard.service';
class MockCmsGuardsService {
  canActivateGuard() {}
}
// let mockActivatedRouteSnapshot: ActivatedRouteSnapshot;
// let mockRouterStateSnapshot: RouterStateSnapshot;
describe('MultiCmsPageGuardService', () => {
  let service: MultiCmsPageGuardService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        {
          provide: CmsGuardsService,
          useClass: MockCmsGuardsService,
        },
      ],
    });
    service = TestBed.inject(MultiCmsPageGuardService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
