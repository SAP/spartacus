import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, EntitiesModel, B2BUser } from '@spartacus/core';
import { of } from 'rxjs';
import { UnitApproverListComponent } from './unit-approver-list.component';
import createSpy = jasmine.createSpy;
import { UnitApproverListService } from './unit-approver-list.service';
import { CurrentUnitService } from '../../current-unit.service';
import { FormsModule } from '@angular/forms';
import { SplitViewTestingModule } from 'projects/storefrontlib/src/shared/components/split-view/testing/spit-view-testing.module';
import { IconTestingModule } from 'projects/storefrontlib/src/cms-components/misc/icon/testing/icon-testing.module';
import { UrlTestingModule } from 'projects/core/src/routing/configurable-routes/url-translation/testing/url-testing.module';
import { TableModule } from '@spartacus/storefront';

const code = 'unitCode';
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

class MockUnitApproverListService {
  unassign = createSpy('unassign').and.stub();
  load = of(mockUserList);
  getTable = function () {
    return of({});
  };
}

class MockCurrentUnitService {
  key$ = of(code);
}

describe('UnitApproverListComponent', () => {
  let component: UnitApproverListComponent;
  let fixture: ComponentFixture<UnitApproverListComponent>;
  let unitApproverListService: UnitApproverListService;

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
      ],
      declarations: [UnitApproverListComponent],
      providers: [
        {
          provide: UnitApproverListService,
          useClass: MockUnitApproverListService,
        },
        { provide: CurrentUnitService, useClass: MockCurrentUnitService },
      ],
    }).compileComponents();

    unitApproverListService = TestBed.inject(UnitApproverListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitApproverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unassign user from given role', () => {
    component.unassign(mockUserList.values[0]);
    expect(unitApproverListService.unassign).toHaveBeenCalledWith(
      code,
      mockUserList.values[0].customerId
    );
  });
});
