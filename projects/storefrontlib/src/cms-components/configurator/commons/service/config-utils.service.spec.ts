import { TestBed } from '@angular/core/testing';

import { ConfigUtilsService } from './config-utils.service';
import { Observable, of } from 'rxjs';
import {
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { Type } from '@angular/core';

let isGroupVisited: Observable<Boolean> = of(false);

class MockConfiguratorGroupsService {
  isGroupVisited(): Observable<Boolean> {
    return isGroupVisited;
  }
}

describe('ConfigUtilsService', () => {
  let classUnderTest: ConfigUtilsService;
  let configuratorGroupsService: ConfiguratorGroupsService;
  const owner: GenericConfigurator.Owner = {
    id: 'testProduct',
    type: GenericConfigurator.OwnerType.PRODUCT,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ConfiguratorGroupsService,
          useClass: MockConfiguratorGroupsService,
        },
      ],
    });

    classUnderTest = TestBed.inject(ConfigUtilsService);
    configuratorGroupsService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    spyOn(configuratorGroupsService, 'isGroupVisited').and.returnValue(
      isGroupVisited
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  function getActualResult() {
    let result: boolean;
    classUnderTest
      .isCartEntryOrGroupVisited(owner, 'group_01')
      .subscribe((data) => (result = Boolean(data)))
      .unsubscribe();
    return result;
  }

  it('should return false because the product has not been added to the cart and the current group was not visited', () => {
    expect(getActualResult()).toBe(false);
  });

  it('should return true because the product has been added to the cart', () => {
    owner.type = GenericConfigurator.OwnerType.CART_ENTRY;
    expect(getActualResult()).toBe(true);
  });

  it('should return true because the current group was visited', () => {
    isGroupVisited = of(true);
    expect(getActualResult()).toBe(true);
  });
});
