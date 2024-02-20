import { TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { UserGroup } from '@spartacus/organization/administration/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { CurrentUserGroupService } from './current-user-group.service';
import { UserGroupRoutePageMetaResolver } from './user-group-route-page-meta.resolver';

class MockCurrentItemService implements Partial<CurrentUserGroupService> {
  item$: Observable<UserGroup> = of({ name: 'testName' });
}

describe('UserGroupRoutePageMetaResolver', () => {
  let resolver: UserGroupRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentUserGroupService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(UserGroupRoutePageMetaResolver);
  });

  it('should emit breadcrumb with translated i18n key, using current item as params', async () => {
    expect(
      await firstValueFrom(
        resolver.resolveBreadcrumbs({
          url: 'testPath',
          pageMetaConfig: { breadcrumb: { i18n: 'testTranslation' } },
        })
      )
    ).toEqual([{ label: 'testTranslation name:testName', link: 'testPath' }]);
  });
});
