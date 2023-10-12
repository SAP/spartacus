/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ICON_TYPE } from '../../misc/icon/index';

export interface NavigationNode {
  title?: string;
  id?: string;

  /** The url or route (parts) */
  url?: string | string[];

  target?: string | boolean;

  children?: Array<NavigationNode>;

  /**
   * Style classes can be added to the navigation nodes to enhance the UX.
   * The style classes are typically derived from the (CMS) backend and should
   * match an existing CSS selector.
   *
   * The styleClasses can contain a "list" of space separated style classes.
   */
  styleClasses?: string;

  /**
   * Style rules can be added to the navigation nodes to enhance the UX.
   * The style attributes are typically derived from the (CMS) backend.
   *
   * The styleAttributes can contain a "list" of semicolon separated style rules.
   */
  styleAttributes?: string;
}

export const MY_ACCOUNT_NAVIGATION_ICONS: Record<string, string> = {
  OrdersAndReturnsNavNode : ICON_TYPE.CART,
  SavedCartsNavNode : ICON_TYPE.CART_PLUS,
  WishlistsNavNode: ICON_TYPE.STAR,
  RequestsNavNode: ICON_TYPE.HEADSET,
  PersonalDetailsNavNode: ICON_TYPE.USER,
  PasswordAndSecurityNavNode : ICON_TYPE.PASSWORD,
  AddressBookNavNode: ICON_TYPE.HOME,
  PaymentDetailsNavNode: ICON_TYPE.CREDIT_CARD,
  CommunicationsNavNode: ICON_TYPE.COMMUNICATIONS,
  PrivacyAndSettingsNavNode: ICON_TYPE.PRIVACY,
};
