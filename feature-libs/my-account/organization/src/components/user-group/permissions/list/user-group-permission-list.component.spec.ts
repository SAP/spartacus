import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  Permission,
  I18nTestingModule,
  UrlTestingModule,
} from '@spartacus/core';
import { Table, TableModule } from '@spartacus/storefront';
import { of } from 'rxjs';
import { UserGroupPermissionListComponent } from './user-group-permission-list.component';
import { UserGroupPermissionListService } from './user-group-permission-list.service';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';

const userGroupCode = 'userGroupCode';

class MockActivatedRoute {
  parent = {
    params: of({ code: userGroupCode }),
  };
  snapshot = {};
}

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

export class MockUserGroupUserListService {
  getTable(_code) {
    return of(mockUserList);
  }
}

describe('UserGroupPermissionListComponent', () => {
  let component: UserGroupPermissionListComponent;
  let fixture: ComponentFixture<UserGroupPermissionListComponent>;
  let service: UserGroupPermissionListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        TableModule,
        IconTestingModule,
      ],
      declarations: [UserGroupPermissionListComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        {
          provide: UserGroupPermissionListService,
          useClass: MockUserGroupUserListService,
        },
      ],
    }).compileComponents();
    service = TestBed.inject(UserGroupPermissionListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupPermissionListComponent);
    component = fixture.componentInstance;
  });

  // not sure why this is needed, but we're failing otherwise
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
