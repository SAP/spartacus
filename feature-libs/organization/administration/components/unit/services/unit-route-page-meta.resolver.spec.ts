import { TestBed } from '@angular/core/testing';
import { B2BUnit, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentUnitService } from './current-unit.service';
import { UnitRoutePageMetaResolver } from './unit-route-page-meta.resolver';

class MockCurrentItemService implements Partial<CurrentUnitService> {
  item$: Observable<B2BUnit> = of({ name: 'testName' });
}

describe('UnitRoutePageMetaResolver', () => {
  let resolver: UnitRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentUnitService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(UnitRoutePageMetaResolver);
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
    ).toEqual([{ label: 'testTranslation name:testName', link: 'testPath' }]);
  });
});
