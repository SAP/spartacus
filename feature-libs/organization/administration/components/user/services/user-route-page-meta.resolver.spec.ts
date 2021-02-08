import { TestBed } from '@angular/core/testing';
import { B2BUser, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentUserService } from './current-user.service';
import { UserRoutePageMetaResolver } from './user-route-page-meta.resolver';

class MockCurrentItemService implements Partial<CurrentUserService> {
  item$: Observable<B2BUser> = of({ name: 'testName' });
}

describe('UserRoutePageMetaResolver', () => {
  let resolver: UserRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentUserService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(UserRoutePageMetaResolver);
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
