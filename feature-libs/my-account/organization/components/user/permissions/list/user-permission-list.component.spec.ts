import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, I18nTestingModule, Permission } from '@spartacus/core';
import { Table, TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { CurrentUserService } from '../../current-user.service';
import { UserPermissionListComponent } from './user-permission-list.component';
import { UserPermissionListService } from './user-permission-list.service';

const mockUserList: Table<Permission> = {
  data: [
    {
      code: 'first',
      selected: true,
    },
    {
      code: 'second',
      selected: false,
    },
    {
      code: 'third',
      selected: true,
    },
  ],
  pagination: { totalPages: 1, totalResults: 3, sort: 'byName' },
  structure: { type: '' },
};

class MockUserUserListService {
  getTable(_code) {
    return of(mockUserList);
  }
}

const customerId = 'b1';

const mockUser: B2BUser = {
  customerId,
  uid: 'userCode',
  name: 'user1',
  orgUnit: { name: 'orgName', uid: 'orgCode' },
};

class MockCurrentUserService implements Partial<CurrentUserService> {
  key$ = of(customerId);
  item$ = of(mockUser);
}

describe('UserPermissionListComponent', () => {
  let component: UserPermissionListComponent;
  let fixture: ComponentFixture<UserPermissionListComponent>;
  let service: UserPermissionListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        TableModule,
        IconTestingModule,
        SplitViewTestingModule,
        PaginationTestingModule,
      ],
      declarations: [UserPermissionListComponent],
      providers: [
        { provide: CurrentUserService, useClass: MockCurrentUserService },
        {
          provide: UserPermissionListService,
          useClass: MockUserUserListService,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(UserPermissionListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPermissionListComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have users', () => {
    let result;
    component.dataTable$.subscribe((data) => (result = data));
    expect(result).toEqual(mockUserList);
  });

  it('should get users from service by code', () => {
    spyOn(service, 'getTable');
    fixture.detectChanges();
    expect(service.getTable).toHaveBeenCalled();
  });

  describe('with table data', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });
    it('should have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeTruthy();
    });
    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeFalsy();
    });
  });

  describe('without table data', () => {
    beforeEach(() => {
      spyOn(service, 'getTable').and.returnValue(of(null));
      fixture.detectChanges();
    });
    it('should not have cx-table element', () => {
      const el = fixture.debugElement.query(By.css('cx-table'));
      expect(el).toBeFalsy();
    });
    it('should not show is-empty message', () => {
      const el = fixture.debugElement.query(By.css('p.is-empty'));
      expect(el).toBeTruthy();
    });
  });
});
