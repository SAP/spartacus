import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, Permission, Period } from '@spartacus/core';
import { ModalService, TableModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { PermissionType } from '../form/permission-form.service';
import { PermissionDetailsComponent } from './permission-details.component';
import { PermissionService } from '../../../core/services/permission.service';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { CurrentPermissionService } from '../current-permission.service';

import createSpy = jasmine.createSpy;

const permissionCode = 'b1';

const mockPermission: Permission = {
  code: permissionCode,
  orderApprovalPermissionType: {
    code: PermissionType.TIMESPAN,
    name: 'Type',
  },
  threshold: 10000,
  currency: {
    symbol: '$',
    isocode: 'USD',
  },
  periodRange: Period.WEEK,
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};
class MockPermissionService implements Partial<PermissionService> {
  loadPermission = createSpy('loadPermission');
  update = createSpy('update');
  get = createSpy('get').and.returnValue(of(mockPermission));
}

class MockCurrentPermissionService
  implements Partial<CurrentPermissionService> {
  code$ = of(permissionCode);
}

class MockModalService {
  open() {}
}

describe('PermissionDetailsComponent', () => {
  let component: PermissionDetailsComponent;
  let fixture: ComponentFixture<PermissionDetailsComponent>;
  let permissionService: PermissionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        IconTestingModule,
      ],
      declarations: [PermissionDetailsComponent],
      providers: [
        { provide: PermissionService, useClass: MockPermissionService },
        { provide: ModalService, useClass: MockModalService },
      ],
    })
      .overrideComponent(PermissionDetailsComponent, {
        set: {
          providers: [
            {
              provide: CurrentPermissionService,
              useClass: MockCurrentPermissionService,
            },
          ],
        },
      })
      .compileComponents();

    permissionService = TestBed.inject(PermissionService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should trigger reload of cost center model on each code change', () => {
    expect(permissionService.loadPermission).toHaveBeenCalledWith(
      mockPermission.code
    );
  });

  describe('costCenter$', () => {
    it('should emit current cost center model', () => {
      let result;
      component.permission$.subscribe((r) => (result = r)).unsubscribe();
      expect(result).toBe(mockPermission);
    });
  });
});
