import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  B2BUser,
  B2BUserRight,
  B2BUserRole,
  EntitiesModel,
  FeatureToggles,
  User,
} from '@spartacus/core';
import { UserListService, UserModel } from './user-list.service';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';

const uid = 'user';
const mockUserEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid,
    },
  ],
};

const mockUserEntitiesWithMissingFields: EntitiesModel<B2BUser> = {
  values: [
    {
      uid,
      orgUnit: undefined,
      roles: undefined,
    },
  ],
};

class MockB2BUserService {
  getList(): Observable<EntitiesModel<B2BUser>> {
    return of(mockUserEntities);
  }
  getAllRoles(): B2BUserRole[] {
    return [
      B2BUserRole.CUSTOMER,
      B2BUserRole.MANAGER,
      B2BUserRole.APPROVER,
      B2BUserRole.ADMIN,
    ];
  }
  getAllRights(): B2BUserRight[] {
    return [B2BUserRight.UNITORDERVIEWER];
  }
}

@Injectable()
class MockTableService {
  buildStructure(type): Observable<TableStructure> {
    return of({ type });
  }
}

const mockFeatureToggles: FeatureToggles = {
  enableB2BCustomerSearch: true,
};

describe('UserListService', () => {
  let service: UserListService;
  let featureToggles: FeatureToggles;

  describe('with table config', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          UserListService,
          {
            provide: B2BUserService,
            useClass: MockB2BUserService,
          },
          {
            provide: TableService,
            useClass: MockTableService,
          },
          provideMockFeatureToggles({ ...mockFeatureToggles }),
        ],
      });
      service = TestBed.inject(UserListService);
      featureToggles = TestBed.inject(FeatureToggles);
    });

    it('should inject service', () => {
      expect(service).toBeTruthy();
    });

    it('should return "customerId" key', () => {
      expect(service.key()).toEqual('customerId');
    });

    it('should populate object to string literal', () => {
      let result: EntitiesModel<User>;
      service.getData().subscribe((table) => (result = table));
      expect(result.values[0].uid).toEqual(uid);
    });

    it('should use empty object as default when orgUnit is undefined', () => {
      (
        TestBed.inject(B2BUserService) as unknown as {
          getList: () => Observable<EntitiesModel<B2BUser>>;
        }
      ).getList = () => of(mockUserEntitiesWithMissingFields);
      let result: EntitiesModel<UserModel>;
      service.getData().subscribe((table) => (result = table));
      expect(result.values[0].unit).toEqual({});
    });

    it('should use empty array as default when roles is undefined', () => {
      (
        TestBed.inject(B2BUserService) as unknown as {
          getList: () => Observable<EntitiesModel<B2BUser>>;
        }
      ).getList = () => of(mockUserEntitiesWithMissingFields);
      let result: EntitiesModel<UserModel>;
      service.getData().subscribe((table) => (result = table));
      expect(result.values[0].roles).toEqual([]);
    });

    describe('isSearchEnabled()', () => {
      it('should return true when feature toggle is enabled', () => {
        featureToggles.enableB2BCustomerSearch = true;
        expect(service.isSearchEnabled()).toBe(true);
      });

      it('should return false when feature toggle is disabled', () => {
        featureToggles.enableB2BCustomerSearch = false;
        expect(service.isSearchEnabled()).toBe(false);
      });
    });
  });
});
