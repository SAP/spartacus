/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ICON_TYPE } from '../../misc/icon/index';

export interface NavigationNode {
  title?: string;

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

export const ICONS: Record<string, string> = {
  'Orders And Returns': ICON_TYPE.CART,
  'Saved Carts': ICON_TYPE.CART_PLUS,
  Wishlists: ICON_TYPE.STAR,
  Requests: ICON_TYPE.HEADSET,
  'Personal Details': ICON_TYPE.USER,
  'Password And Security': ICON_TYPE.PASSWORD,
  'Address Book': ICON_TYPE.HOME,
  'Payment Details': ICON_TYPE.CREDIT_CARD,
  Communications: ICON_TYPE.COMMUNICATIONS,
  'Privacy And Settings': ICON_TYPE.PRIVACY,
}


//   'Orders And Returns'= 'ICON_TYPE.CART',
//   'Saved Carts'= 'ICON_TYPE.CART_PLUS',
//   'Wishlists'= 'ICON_TYPE.STAR',
//   'Requests'= 'ICON_TYPE.HEADSET',
//   'Personal Details'= 'ICON_TYPE.USER',
//   'Password And Security'= 'ICON_TYPE.PASSWORD',
//   'Address Book'= 'ICON_TYPE.HOME',
//   'Payment Details'= 'ICON_TYPE.CREDIT_CARD',
//   'Communications'= 'ICON_TYPE.COMMUNICATIONS',
//   'Privacy And Settings'= 'ICON_TYPE.PRIVACY',
// };
