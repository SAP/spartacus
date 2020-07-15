import { TestBed } from '@angular/core/testing';
import {
  ConfiguratorGroupsService,
  GenericConfigurator,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigUtilsService } from './config-utils.service';

let isGroupVisited: Observable<Boolean> = of(false);

class MockConfiguratorGroupsService {
  isGroupVisited(): Observable<Boolean> {
    return isGroupVisited;
  }
}

describe('ConfigUtilsService', () => {
  let classUnderTest: ConfigUtilsService;

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
  });

  it('should be created', () => {
    expect(classUnderTest).toBeTruthy();
  });

  function getCurrentResult() {
    let result: boolean;
    classUnderTest
      .isCartEntryOrGroupVisited(owner, 'group_01')
      .subscribe((data) => (result = Boolean(data)))
      .unsubscribe();
    return result;
  }

  it('should return false because the product has not been added to the cart and the current group was not visited', () => {
    isGroupVisited = of(false);
    owner.type = GenericConfigurator.OwnerType.PRODUCT;
    expect(getCurrentResult()).toBe(false);
  });

  it('should return true because the product has been added to the cart', () => {
    isGroupVisited = of(false);
    owner.type = GenericConfigurator.OwnerType.CART_ENTRY;
    expect(getCurrentResult()).toBe(true);
  });

  it('should return true because the current group was visited', () => {
    isGroupVisited = of(true);
    expect(getCurrentResult()).toBe(true);
  });
});
