import { TestBed } from '@angular/core/testing';
import { CostCenter, I18nTestingModule } from '@spartacus/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { CostCenterRoutePageMetaResolver } from './cost-center-route-page-meta.resolver';
import { CurrentCostCenterService } from './current-cost-center.service';

class MockCurrentItemService implements Partial<CurrentCostCenterService> {
  item$: Observable<CostCenter> = of({ code: 'testCode' });
}

describe('CostCenterRouteBreadcrumbResolver', () => {
  let resolver: CostCenterRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentCostCenterService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(CostCenterRoutePageMetaResolver);
  });

  it('should emit breadcrumb with translated i18n key, using current item as params', async () => {
    expect(
      await firstValueFrom(
        resolver.resolveBreadcrumbs({
          url: 'testPath',
          pageMetaConfig: { breadcrumb: { i18n: 'testTranslation' } },
        })
      )
    ).toEqual([{ label: 'testTranslation code:testCode', link: 'testPath' }]);
  });
});
