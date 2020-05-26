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
  let configurationGroupService: ConfiguratorGroupsService;
  const groupId = 'group_01';
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
    configurationGroupService = TestBed.inject(
      ConfiguratorGroupsService as Type<ConfiguratorGroupsService>
    );
    spyOn(configurationGroupService, 'isGroupVisited').and.returnValue(
      isGroupVisited
    );
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  it('should return false because the product has not been added to the cart and the current group was not visited', () => {
    let result: boolean;
    const subscription = classUnderTest
      .isCartEntryOrGroupVisited(owner, groupId)
      .subscribe((data) => (result = Boolean(data)));
    expect(result).toBe(false);
    subscription.unsubscribe();
  });

  it('should return true because the product has been added to the cart', () => {
    owner.type = GenericConfigurator.OwnerType.CART_ENTRY;

    let result: boolean;
    const subscription = classUnderTest
      .isCartEntryOrGroupVisited(owner, groupId)
      .subscribe((data) => (result = Boolean(data)));
    expect(result).toBe(true);
    subscription.unsubscribe();
  });

  it('should return true because the current group was visited', () => {
    isGroupVisited = of(true);
    let result: boolean;
    const subscription = classUnderTest
      .isCartEntryOrGroupVisited(owner, groupId)
      .subscribe((data) => (result = Boolean(data)));
    expect(result).toBe(true);
    subscription.unsubscribe();
  });
});
