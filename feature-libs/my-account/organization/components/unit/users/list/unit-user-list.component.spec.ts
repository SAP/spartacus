import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { B2BUser, EntitiesModel, I18nTestingModule } from '@spartacus/core';
import { UnitUserListComponent } from './unit-user-list.component';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import createSpy = jasmine.createSpy;
import { TableModule } from '@spartacus/storefront';
import { CurrentUnitService } from '../../current-unit.service';
import { UnitUsersService } from '../../users/list/unit-users.service';

const code = 'code1';
const customerId = 'customerId1';

const mockUserList: EntitiesModel<B2BUser> = {
  values: [
    {
      name: 'b1',
      uid: 'aaa@bbb',
      customerId,
      selected: true,
      orgUnit: { uid: 'orgUid', name: 'orgName' },
      roles: [],
    },
    {
      name: 'b2',
      uid: 'aaa2@bbb',
      customerId: 'customerId2',
      selected: false,
      orgUnit: { uid: 'orgUid2', name: 'orgName2' },
      roles: [],
    },
  ],
  pagination: { totalPages: 1, totalResults: 1, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

class MockUnitUsersService implements Partial<MockUnitUsersService> {
  toggleAssign = createSpy('toggleAssign');
  load = of(mockUserList);
  viewPage = createSpy('viewPage').and.stub();
  sort = createSpy('sort').and.stub();
  getTable(_): any {
    return of(mockUserList);
  }
}

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  key$ = of(code);
}

describe('UnitUsersComponent', () => {
  let component: UnitUserListComponent;
  let fixture: ComponentFixture<UnitUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        IconTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
      ],
      declarations: [UnitUserListComponent],
      providers: [
        { provide: UnitUsersService, useClass: MockUnitUsersService },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
