import { TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentPermissionService } from './current-permission.service';
import { PermissionRoutePageMetaResolver } from './permission-route-page-meta.resolver';

class MockCurrentItemService implements Partial<CurrentPermissionService> {
  item$: Observable<Permission> = of({ code: 'testCode' });
}

describe('PermissionRoutePageMetaResolver', () => {
  let resolver: PermissionRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentPermissionService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(PermissionRoutePageMetaResolver);
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
