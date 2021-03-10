import { Injectable } from '@angular/core';
import {
  Cart,
  OCC_USER_ID_ANONYMOUS,
  OrderEntry,
  UserIdService,
} from '@spartacus/core';
import { CommonConfigurator } from '../../core/model/common-configurator.model';
import { OrderEntryStatus } from './../../core/model/common-configurator.model';

/**
 * Utilities for generic configuration
 */
@Injectable({ providedIn: 'root' })
export class CommonConfiguratorUtilsService {
  constructor(protected userIdService: UserIdService) {}
  /**
   * Compiles a unique key for a configuration owner and sets it into the 'key'
   * attribute
   * @param owner Specifies the owner of a product configuration
   */
  setOwnerKey(owner: CommonConfigurator.Owner) {
    if (owner.type === CommonConfigurator.OwnerType.PRODUCT) {
      if (!owner.id) {
        throw new Error('We expect a product code!');
      }
    } else if (owner.type === CommonConfigurator.OwnerType.CART_ENTRY) {
      if (!owner.id) {
        throw new Error('We expect a document entry Id!');
      }
    } else if (owner.type === CommonConfigurator.OwnerType.ORDER_ENTRY) {
      if (!owner.id) {
        throw new Error('We expect a document entry Id!');
      }
    } else {
      throw new Error('We expect an owner type!');
    }
    owner.key = owner.type + '/' + owner.id;
  }

  /**
   * Composes owner ID from document ID and entry number
   * @param documentId ID of document the entry is part of, like the order or quote code
   * @param entryNumber Entry number
   * @returns {string} owner ID
   */
  getComposedOwnerId(documentId: string, entryNumber: number): string {
    return documentId + '+' + entryNumber;
  }

  /**
   * Decomposes an owner ID into documentId and entryNumber
   * @param ownerId ID of owner
   * @returns {any} object containing documentId and entryNumber
   */
  decomposeOwnerId(ownerId: string): any {
    const parts: string[] = ownerId.split('+');
    if (parts.length !== 2) {
      throw new Error('We only expect 2 parts in ownerId, separated by +');
    }
    const result = { documentId: parts[0], entryNumber: parts[1] };
    return result;
  }
  /**
   * Gets cart ID (which can be either its guid or its code)
   * @param cart Cart
   * @returns Cart identifier
   */
  getCartId(cart: Cart): string {
    const cartId =
      cart.user?.uid === OCC_USER_ID_ANONYMOUS ? cart.guid : cart.code;
    if (!cartId) {
      throw new Error('Cart ID is not defined');
    }
    return cartId;
  }

  /**
   * Verifies whether the item has any issues.
   *
   * @param cartItem - Cart item
   * @returns {boolean} - whether there are any issues
   */
  hasIssues(cartItem: OrderEntry): boolean {
    return this.getNumberOfIssues(cartItem) > 0;
  }

  /**
   * Retrieves the number of issues at the cart item.
   *
   * @param cartItem - Cart item
   * @returns {number} - the number of issues at the cart item
   */
  getNumberOfIssues(cartItem: OrderEntry): number {
    let numberOfIssues = 0;
    cartItem?.statusSummaryList?.forEach((statusSummary) => {
      if (statusSummary.status === OrderEntryStatus.Error) {
        const numberOfIssuesFromStatus = statusSummary.numberOfIssues;
        numberOfIssues = numberOfIssuesFromStatus
          ? numberOfIssuesFromStatus
          : 0;
      }
    });
    return numberOfIssues;
  }

  /**
   * Verifies whether the configurator type is attribute based one.
   *
   * @param {string} configuratorType - Configurator type
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
   */
  isAttributeBasedConfigurator(configuratorType: string): boolean {
    if (configuratorType) {
      return (
        configuratorType === 'CPQCONFIGURATOR' ||
        configuratorType === 'TEXTFIELDCONFIGURATOR'
      );
    }
    return false;
  }

  /**
   * Verifies whether the configurator type is bundle based one.
   *
   * @param {string} configuratorType - Configurator type
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
   */
  isBundleBasedConfigurator(configuratorType: string): boolean {
    if (configuratorType) {
      return configuratorType === 'CLOUDCPQCONFIGURATOR';
    }
    return false;
  }
}
