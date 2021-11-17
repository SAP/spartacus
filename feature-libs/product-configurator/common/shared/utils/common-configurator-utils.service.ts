import { Injectable } from '@angular/core';
import {
  Cart,
  OCC_USER_ID_ANONYMOUS,
  OrderEntry,
  PromotionLocation,
  UserIdService,
} from '@spartacus/core';
import { CartItemContext } from '@spartacus/storefront';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  CommonConfigurator,
  ConfiguratorType,
  OrderEntryStatus,
} from '../../core/model/common-configurator.model';
import { ConfiguratorModelUtils } from './configurator-model-utils';

/**
 * Utilities for generic configuration
 */
@Injectable({ providedIn: 'root' })
export class CommonConfiguratorUtilsService {
  constructor(protected userIdService: UserIdService) {}
  /**
   * Compiles a unique key for a configuration owner and sets it into the 'key'
   * attribute
   * @param {CommonConfigurator.Owner }owner - Specifies the owner of a product configuration
   */
  setOwnerKey(owner: CommonConfigurator.Owner) {
    owner.key = ConfiguratorModelUtils.getOwnerKey(owner.type, owner.id);
  }

  /**
   * Composes owner ID from document ID and entry number
   * @param {string} documentId - ID of document the entry is part of, like the order or quote code
   * @param {string} entryNumber - Entry number
   * @returns {string} - owner ID
   */
  getComposedOwnerId(documentId: string, entryNumber: number): string {
    return documentId + '+' + entryNumber;
  }

  /**
   * Decomposes an owner ID into documentId and entryNumber
   * @param {string} ownerId - ID of owner
   * @returns {any} object containing documentId and entryNumber
   */
  decomposeOwnerId(ownerId: string): any {
    const parts: string[] = ownerId.split('+');
    if (parts.length !== 2) {
      throw new Error(
        'We only expect 2 parts in ownerId, separated by +, but was: ' + ownerId
      );
    }
    const result = { documentId: parts[0], entryNumber: parts[1] };
    return result;
  }
  /**
   * Gets cart ID (which can be either its guid or its code)
   * @param {Cart} cart - Cart
   * @returns {string} - Cart identifier
   */
  getCartId(cart?: Cart): string {
    const cartId =
      cart?.user?.uid === OCC_USER_ID_ANONYMOUS ? cart.guid : cart?.code;
    if (!cartId) {
      throw new Error('Cart ID is not defined');
    }
    return cartId;
  }

  /**
   * Verifies whether the item has any issues.
   *
   * @param {OrderEntry} cartItem - Cart item
   * @returns {boolean} - whether there are any issues
   */
  hasIssues(cartItem: OrderEntry): boolean {
    return this.getNumberOfIssues(cartItem) > 0;
  }

  /**
   * Retrieves the number of issues at the cart item.
   *
   * @param {OrderEntry} cartItem - Cart item
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
   * Verifies whether the configurator type is an attribute based one.
   *
   * @param {string} configuratorType - Configurator type
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'false'
   */
  isAttributeBasedConfigurator(configuratorType: string | undefined): boolean {
    if (configuratorType) {
      return (
        configuratorType === ConfiguratorType.VARIANT ||
        configuratorType === ConfiguratorType.TEXTFIELD
      );
    }
    return false;
  }

  /**
   * Verifies whether the configurator type is a bundle based one.
   *
   * @param {string} configuratorType - Configurator type
   * @returns {boolean} - 'True' if the expected configurator type, otherwise 'fasle'
   */
  isBundleBasedConfigurator(configuratorType: string | undefined): boolean {
    if (configuratorType) {
      return configuratorType === ConfiguratorType.CPQ;
    }
    return false;
  }

  /**
   * Determines whether we are in the context of an active cart
   * @param cartItemContext Cart item context
   * @returns Item part of an active cart?
   */
  isActiveCartContext(
    cartItemContext: CartItemContext | undefined
  ): Observable<boolean> {
    return (cartItemContext?.location$ ?? EMPTY).pipe(
      map(
        (location) =>
          location !== PromotionLocation.SaveForLater &&
          location !== PromotionLocation.SavedCart
      )
    );
  }
}
