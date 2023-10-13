/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ICON_TYPE } from '../../misc/icon/index';

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
    RegisteredProductsNavNode: ICON_TYPE.SQUARE_CHECK,
    EmailNavNode: ICON_TYPE.USER,
  };
