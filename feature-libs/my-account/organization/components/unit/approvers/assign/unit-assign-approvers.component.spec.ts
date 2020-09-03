import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, EntitiesModel, B2BUser } from '@spartacus/core';
import { of } from 'rxjs';
import { UnitAssignApproversComponent } from './unit-assign-approvers.component';
import { TableModule } from '@spartacus/storefront';
import { CurrentUnitService } from '../../current-unit.service';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { FormsModule } from '@angular/forms';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { PaginationTestingModule } from 'projects/storefrontlib/src/shared/components/list-navigation/pagination/testing/pagination-testing.module';
import { UnitAssignApproversService } from './unit-assign-approvers.service';

import createSpy = jasmine.createSpy;
import { UnitRoleType } from '../../../shared';

const code = 'unitCode';
const roleId = UnitRoleType.APPROVER;
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
      selected: true,
      orgUnit: { uid: 'orgUid2', name: 'orgName2' },
      roles: [],
    },
  ],
  pagination: { totalPages: 1, totalResults: 2, sort: 'byName' },
  sorts: [{ code: 'byName', selected: true }],
};

class MockUnitAssignApproversService {
  toggleAssign = createSpy('toggleAssign').and.stub();
  load = of(mockUserList);
  viewPage = createSpy('viewPage').and.stub();
  sort = createSpy('sort').and.stub();
  getTable(_code) {
    return of(mockUserList);
  }
}

class MockCurrentUnitService {
  key$ = of(code);
}

describe('UnitAssignApproversComponent', () => {
  let component: UnitAssignApproversComponent;
  let fixture: ComponentFixture<UnitAssignApproversComponent>;
  let unitAssignApproversService: UnitAssignApproversService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        I18nTestingModule,
        UrlTestingModule,
        TableModule,
        FormsModule,
        SplitViewTestingModule,
        IconTestingModule,
        PaginationTestingModule,
      ],
      declarations: [UnitAssignApproversComponent],
      providers: [
        {
          provide: UnitAssignApproversService,
          useClass: MockUnitAssignApproversService,
        },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    }).compileComponents();

    unitAssignApproversService = TestBed.inject(UnitAssignApproversService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitAssignApproversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign approver', () => {
    component.toggleAssign(code, customerId, true);
    expect(unitAssignApproversService.toggleAssign).toHaveBeenCalledWith(
      code,
      customerId,
      roleId,
      true
    );
  });

  it('should unassign approver', () => {
    component.toggleAssign(code, customerId, false);
    expect(unitAssignApproversService.toggleAssign).toHaveBeenCalledWith(
      code,
      customerId,
      roleId,
      false
    );
  });

  it('should delegate pagination to service', () => {
    component.viewPage({ currentPage: 3 }, 7);
    expect(unitAssignApproversService.viewPage).toHaveBeenCalledWith(
      { currentPage: 3 },
      7
    );
  });

  it('should revert currentPage when sorting', () => {
    component.sort({ currentPage: 3 }, 'byCode');
    expect(unitAssignApproversService.sort).toHaveBeenCalledWith(
      { currentPage: 3 },
      'byCode'
    );
  });
});
