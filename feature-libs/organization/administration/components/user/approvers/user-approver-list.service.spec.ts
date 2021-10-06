import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { B2BUser, EntitiesModel } from '@spartacus/core';
import {
  B2BUserService,
  LoadStatus,
  OrganizationItemStatus,
  Permission,
  PermissionService,
} from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserApproverListService } from './user-approver-list.service';

const mockUserApproverEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid: 'first',
      selected: true,
    },
    {
      uid: 'second',
      selected: false,
    },
    {
      uid: 'third',
      selected: true,
    },
  ],
};

const mockItemStatus = of({ status: LoadStatus.SUCCESS, item: {} });

class MockB2BUserService implements Partial<B2BUserService> {
  getApprovers(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUserApproverEntities);
  }
  getLoadingStatus(): Observable<OrganizationItemStatus<B2BUser>> {
    return mockItemStatus;
  }
  assignApprover() {}
  unassignApprover() {}
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

class MockPermissionService {
  getLoadingStatus(): Observable<OrganizationItemStatus<Permission>> {
    return of({ status: LoadStatus.SUCCESS, item: {} });
  }
}

describe('UserApproverListService', () => {
  let service: UserApproverListService;
  let userService: B2BUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        UserApproverListService,
        {
          provide: B2BUserService,
          useClass: MockB2BUserService,
        },
        {
          provide: PermissionService,
          useClass: MockPermissionService,
        },
        {
          provide: TableService,
          useClass: MockTableService,
        },
      ],
    });
    service = TestBed.inject(UserApproverListService);
    userService = TestBed.inject(B2BUserService);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it('should not filter selected approvers', () => {
    let result: EntitiesModel<B2BUser>;
    service.getData().subscribe((table) => (result = table));
    expect(result.values.length).toEqual(3);
    expect(result.values[0].uid).toEqual('first');
    expect(result.values[1].uid).toEqual('second');
    expect(result.values[2].uid).toEqual('third');
  });

  it('should assign approver', () => {
    spyOn(userService, 'assignApprover').and.callThrough();
    spyOn(userService, 'getLoadingStatus').and.callThrough();

    expect(service.assign('customerId', 'approverId')).toEqual(mockItemStatus);
    expect(userService.assignApprover).toHaveBeenCalledWith(
      'customerId',
      'approverId'
    );
    expect(userService.getLoadingStatus).toHaveBeenCalledWith('approverId');
  });

  it('should unassign approver', () => {
    spyOn(userService, 'unassignApprover').and.callThrough();
    spyOn(userService, 'getLoadingStatus').and.callThrough();

    expect(service.unassign('customerId', 'approverId')).toEqual(
      mockItemStatus
    );
    expect(userService.unassignApprover).toHaveBeenCalledWith(
      'customerId',
      'approverId'
    );
    expect(userService.getLoadingStatus).toHaveBeenCalledWith('approverId');
  });
});
