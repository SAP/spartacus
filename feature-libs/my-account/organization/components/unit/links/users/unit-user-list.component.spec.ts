import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel, I18nTestingModule } from '@spartacus/core';
import {
  CurrentUnitService,
  UnitUserAssignRolesService,
} from '@spartacus/my-account/organization';
import { TableModule } from '@spartacus/storefront';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { of } from 'rxjs';
import { UnitUserAssignRolesComponent } from './unit-user-list.component';
import createSpy = jasmine.createSpy;

const code = 'code1';
const roleId = 'b2bcustomergroup';
const customerId = 'customerId1';
const testAssignRole = 'testAssignRole';
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

class MockCurrentUnitService implements Partial<CurrentUnitService> {
  key$ = of(code);
}

class MockUnitUserAssignRolesService
  implements Partial<UnitUserAssignRolesService> {
  toggleAssign = createSpy('toggleAssign');
  load = of(mockUserList);
  viewPage = createSpy('viewPage').and.stub();
  sort = createSpy('sort').and.stub();
  getTable(_): any {
    return of(mockUserList);
  }
}

describe('UnitAssignRolesComponent', () => {
  let component: UnitUserAssignRolesComponent;
  let fixture: ComponentFixture<UnitUserAssignRolesComponent>;
  let unitUserAssignRolesService: UnitUserAssignRolesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        SplitViewTestingModule,
        TableModule,
        IconTestingModule,
        PaginationTestingModule,
      ],
      declarations: [UnitUserAssignRolesComponent],
      providers: [
        {
          provide: UnitUserAssignRolesService,
          useClass: MockUnitUserAssignRolesService,
        },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    }).compileComponents();

    unitUserAssignRolesService = TestBed.inject(UnitUserAssignRolesService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitUserAssignRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign approver', () => {
    component.toggleAssign(customerId, [roleId], testAssignRole, true);
    expect(unitUserAssignRolesService.toggleAssign).toHaveBeenCalledWith(
      customerId,
      [roleId],
      testAssignRole,
      true
    );
  });

  it('should unassign approver', () => {
    component.toggleAssign(customerId, [roleId], testAssignRole, false);
    expect(unitUserAssignRolesService.toggleAssign).toHaveBeenCalledWith(
      customerId,
      [roleId],
      testAssignRole,
      false
    );
  });

  it('should delegate pagination to service', () => {
    component.viewPage({ currentPage: 3 }, 7);
    expect(unitUserAssignRolesService.viewPage).toHaveBeenCalledWith(
      { currentPage: 3 },
      7
    );
  });

  it('should revert currentPage when sorting', () => {
    component.sort({ currentPage: 3 }, 'byCode');
    expect(unitUserAssignRolesService.sort).toHaveBeenCalledWith(
      { currentPage: 3 },
      'byCode'
    );
  });
});
