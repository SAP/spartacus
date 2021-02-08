import { TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Budget } from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { BudgetRoutePageMetaResolver } from './budget-route-page-meta.resolver';
import { CurrentBudgetService } from './current-budget.service';

class MockCurrentItemService implements Partial<CurrentBudgetService> {
  item$: Observable<Budget> = of({ code: 'testCode' });
}

describe('BudgetRoutePageMetaResolver', () => {
  let resolver: BudgetRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentBudgetService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(BudgetRoutePageMetaResolver);
  });

  it('should emit breadcrumb with translated i18n key, using current item as params', async () => {
    expect(
      await resolver
        .resolveBreadcrumbs({
          url: 'testPath',
          pageMetaConfig: { breadcrumb: { i18n: 'testTranslation' } },
        })
        .pipe(take(1))
        .toPromise()
    ).toEqual([{ label: 'testTranslation code:testCode', link: 'testPath' }]);
  });
});
