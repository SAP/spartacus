import { Type } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import {
  Cart,
  OCC_USER_ID_ANONYMOUS,
  OrderEntry,
  PromotionLocation,
  UserIdService,
} from '@spartacus/core';
import {
  BREAKPOINT,
  CartItemContext,
  CartItemContextSource,
  LayoutConfig,
} from '@spartacus/storefront';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import {
  CommonConfigurator,
  ConfiguratorType,
  OrderEntryStatus,
} from '../../core/model/common-configurator.model';
import { CommonConfiguratorUtilsService } from './common-configurator-utils.service';
import { ConfiguratorModelUtils } from './configurator-model-utils';

const productCode = 'CONF_LAPTOP';
const documentId = '12344';
const entryNumber = 4;
let owner: CommonConfigurator.Owner;

const CART_CODE = '0000009336';
const CART_GUID = 'e767605d-7336-48fd-b156-ad50d004ca10';
const NAMED_USER = 'NAMED_USER';

const cartAnonymous: Cart = {
  code: CART_CODE,
  guid: CART_GUID,
  user: { uid: OCC_USER_ID_ANONYMOUS },
};

let cartItem: OrderEntry;

class MockUserIdService {
  getUserId(): Observable<string> {
    return of(NAMED_USER);
  }
}

class MockCartItemContext implements Partial<CartItemContext> {
  item$ = new ReplaySubject<OrderEntry>(1);
  readonly$ = new ReplaySubject<boolean>(1);
  quantityControl$ = new ReplaySubject<FormControl>(1);
  location$ = new BehaviorSubject<PromotionLocation>(
    PromotionLocation.ActiveCart
  );
}

const slotsLargeResolution = ['SiteContext', 'SiteLinks', 'SiteLogo'];

const slotsSmallResolution = ['SiteLogo'];

const templateName = 'ConfiguratorTemplate';
const sectionName = 'headerDisplayOnly';
const layoutConfig: LayoutConfig = {
  layoutSlots: {
    ConfiguratorTemplate: {
      headerDisplayOnly: {
        lg: {
          slots: slotsLargeResolution,
        },
        xs: {
          slots: slotsSmallResolution,
        },
      },
    },
  },
};

describe('CommonConfiguratorUtilsService', () => {
  let classUnderTest: CommonConfiguratorUtilsService;
  let mockCartItemContext: CartItemContextSource;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: UserIdService,
            useClass: MockUserIdService,
          },
          { provide: CartItemContext, useClass: MockCartItemContext },
        ],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    classUnderTest = TestBed.inject(
      CommonConfiguratorUtilsService as Type<CommonConfiguratorUtilsService>
    );
    owner = ConfiguratorModelUtils.createInitialOwner();
    mockCartItemContext = TestBed.inject(CartItemContext) as any;
    cartItem = {};
  });

  it('should create component', () => {
    expect(classUnderTest).toBeDefined();
  });

  it('should set key for product related owner', () => {
    owner.type = CommonConfigurator.OwnerType.PRODUCT;
    owner.id = productCode;
    classUnderTest.setOwnerKey(owner);
    expect(owner.key.includes(productCode)).toBe(true);
    expect(owner.key.includes(CommonConfigurator.OwnerType.PRODUCT)).toBe(true);
  });

  it('should set key for document related owner', () => {
    owner.type = CommonConfigurator.OwnerType.CART_ENTRY;
    owner.id = '1';
    classUnderTest.setOwnerKey(owner);
    expect(owner.key.includes(owner.id)).toBe(true);
    expect(owner.key.includes(CommonConfigurator.OwnerType.CART_ENTRY)).toBe(
      true
    );
  });

  it('should compose an owner ID from 2 attributes', () => {
    expect(classUnderTest.getComposedOwnerId(documentId, entryNumber)).toBe(
      documentId + '+' + entryNumber
    );
  });

  it('should decompose an owner ID properly', () => {
    const decompose = classUnderTest.decomposeOwnerId(
      classUnderTest.getComposedOwnerId(documentId, entryNumber)
    );
    expect(decompose.documentId).toBe(documentId);
    expect(decompose.entryNumber).toBe('' + entryNumber);
  });

  it('should throw an error in case ownerId is malformed', () => {
    expect(function () {
      classUnderTest.decomposeOwnerId(documentId);
    }).toThrow();
  });

  describe('getCartId', () => {
    it('should return cart guid if user is anonymous', () => {
      expect(classUnderTest.getCartId(cartAnonymous)).toBe(CART_GUID);
    });

    it('should return cart code if user is not anonymous', () => {
      const namedCart: Cart = {
        code: CART_CODE,
        guid: CART_GUID,
        user: { name: 'Ulf Becker', uid: 'ulf.becker@rustic-hw.com' },
      };
      expect(classUnderTest.getCartId(namedCart)).toBe(CART_CODE);
    });

    it('throw error if cart Id cannot be found', () => {
      const incompleteCart: Cart = {};
      expect(() => classUnderTest.getCartId(incompleteCart)).toThrowError();
    });
  });

  describe('Cart item issue handling', () => {
    it('should return number of issues of ERROR status', () => {
      cartItem.statusSummaryList = [
        { numberOfIssues: 2, status: OrderEntryStatus.Error },
      ];
      expect(classUnderTest.getNumberOfIssues(cartItem)).toBe(2);
    });

    it('should return number of issues of ERROR status if ERROR and SUCCESS statuses are present', () => {
      cartItem.statusSummaryList = [
        { numberOfIssues: 1, status: OrderEntryStatus.Success },
        { numberOfIssues: 3, status: OrderEntryStatus.Error },
      ];
      expect(classUnderTest.getNumberOfIssues(cartItem)).toBe(3);
    });

    it('should return number of issues as 0 if only SUCCESS status is present', () => {
      cartItem.statusSummaryList = [
        { numberOfIssues: 2, status: OrderEntryStatus.Success },
      ];
      expect(classUnderTest.getNumberOfIssues(cartItem)).toBe(0);
    });

    it('should return number of issues as 0 if statusSummaryList is undefined', () => {
      cartItem.statusSummaryList = undefined;
      expect(classUnderTest.getNumberOfIssues(cartItem)).toBe(0);
    });

    it('should return number of issues as 0 if statusSummaryList is empty', () => {
      cartItem.statusSummaryList = [];
      expect(classUnderTest.getNumberOfIssues(cartItem)).toBe(0);
    });

    it('should return true if number of issues of ERROR status is > 0', () => {
      cartItem.statusSummaryList = [
        { numberOfIssues: 2, status: OrderEntryStatus.Error },
      ];
      expect(classUnderTest.hasIssues(cartItem)).toBe(true);
    });

    it('should return false if number of issues of ERROR status is = 0', () => {
      cartItem.statusSummaryList = [
        { numberOfIssues: 2, status: OrderEntryStatus.Success },
      ];
      expect(classUnderTest.hasIssues(cartItem)).toBe(false);
    });
  });

  describe('isAttributeBasedConfigurator', () => {
    it('should return false, because the configurator type is undefined', () => {
      expect(classUnderTest.isAttributeBasedConfigurator(undefined)).toBe(
        false
      );
    });

    it('should return false, because the configurator type is not an attribute based one', () => {
      expect(
        classUnderTest.isAttributeBasedConfigurator('ANYCONFIGURATOR')
      ).toBe(false);
    });

    it('should return true for the variant configurator type', () => {
      expect(
        classUnderTest.isAttributeBasedConfigurator(ConfiguratorType.VARIANT)
      ).toBe(true);
    });

    it('should return true for the textfield configurator type', () => {
      expect(
        classUnderTest.isAttributeBasedConfigurator(ConfiguratorType.TEXTFIELD)
      ).toBe(true);
    });
  });

  describe('isBundleBasedConfigurator', () => {
    it('should return false, because the configurator type is undefined', () => {
      expect(classUnderTest.isBundleBasedConfigurator(undefined)).toBe(false);
    });

    it('should return false, because the configurator type is not an attribute based one', () => {
      expect(classUnderTest.isBundleBasedConfigurator('ANYCONFIGURATOR')).toBe(
        false
      );
    });

    it('should return true for the CPQ configurator type', () => {
      expect(
        classUnderTest.isBundleBasedConfigurator(ConfiguratorType.CPQ)
      ).toBe(true);
    });
  });

  describe('isActiveCartContext', () => {
    it('should emit false if context is SaveForLater', () => {
      mockCartItemContext.location$?.next(PromotionLocation.SaveForLater);

      let result: boolean | undefined;

      classUnderTest
        .isActiveCartContext(mockCartItemContext)
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(false);
    });

    it('should emit true if context is active cart', () => {
      mockCartItemContext.location$?.next(PromotionLocation.ActiveCart);

      let result: boolean | undefined;

      classUnderTest
        .isActiveCartContext(mockCartItemContext)
        .subscribe((data) => (result = data))
        .unsubscribe();

      expect(result).toEqual(true);
    });
  });

  describe('getSlotsFromLayoutConfiguration', () => {
    it('should find slots in layout configuration providing a breakpoint', () => {
      expect(
        classUnderTest.getSlotsFromLayoutConfiguration(
          layoutConfig,
          templateName,
          sectionName,
          BREAKPOINT.lg
        )
      ).toBe(slotsLargeResolution);
    });

    it('should return empty array in case no layout config is available', () => {
      expect(
        classUnderTest.getSlotsFromLayoutConfiguration(
          {},
          templateName,
          sectionName,
          BREAKPOINT.lg
        )
      ).toEqual([]);
    });

    it('should throw error in case of unknown template, section or breakpoint ', () => {
      expect(() =>
        classUnderTest.getSlotsFromLayoutConfiguration(
          layoutConfig,
          'UnknownTemplate',
          sectionName,
          BREAKPOINT.lg
        )
      ).toThrowError();

      expect(() =>
        classUnderTest.getSlotsFromLayoutConfiguration(
          layoutConfig,
          templateName,
          'UnknownSection',
          BREAKPOINT.lg
        )
      ).toThrowError();

      expect(() =>
        classUnderTest.getSlotsFromLayoutConfiguration(
          layoutConfig,
          templateName,
          sectionName,
          BREAKPOINT.sm
        )
      ).toThrowError();
    });
  });
});
