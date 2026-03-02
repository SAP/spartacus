import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  B2BUser,
  B2BUserRight,
  B2BUserRole,
  EntitiesModel,
  FeatureConfigService,
  User,
} from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
import { TableService, TableStructure } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { UserListService } from './user-list.service';

const uid = 'user';
const mockUserEntities: EntitiesModel<B2BUser> = {
  values: [
    {
      uid,
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

class MockFeatureConfigService {
  isEnabled(feature: string): boolean {
    return feature === 'enableB2BAdminCustomerSearch';
  }
}

describe('UserListService', () => {
  let service: UserListService;
  let featureConfigService: FeatureConfigService;

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
          {
            provide: FeatureConfigService,
            useClass: MockFeatureConfigService,
          },
        ],
      });
      service = TestBed.inject(UserListService);
      featureConfigService = TestBed.inject(FeatureConfigService);
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

    describe('isSearchEnabled()', () => {
      it('should return true when feature toggle is enabled', () => {
        spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
        expect(service.isSearchEnabled()).toBe(true);
        expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
          'enableB2BAdminCustomerSearch'
        );
      });

      it('should return false when feature toggle is disabled', () => {
        spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
        expect(service.isSearchEnabled()).toBe(false);
        expect(featureConfigService.isEnabled).toHaveBeenCalledWith(
          'enableB2BAdminCustomerSearch'
        );
      });
    });
  });
});
