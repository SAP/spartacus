import { Address } from './address.model';
import { Currency } from './misc.model';
import {
  DeliveryMode,
  OrderEntry,
  PickupOrderEntryGroup,
  PromotionOrderEntryConsumed,
} from './order.model';
import { Price, Promotion } from './product.model';
import { CostCenter } from './org-unit.model';

export interface PromotionResult {
  consumedEntries?: PromotionOrderEntryConsumed[];
  description?: string;
  promotion?: Promotion;
}

export enum PromotionLocation {
  ActiveCart = 'CART',
  Checkout = 'CHECKOUT',
  Order = 'ORDER',
}

export enum B2BPaymentTypeEnum {
  ACCOUNT_PAYMENT = 'ACCOUNT',
  CARD_PAYMENT = 'CARD',
}

export interface Voucher {
  appliedValue?: Price;
  code?: string;
  currency?: Currency;
  description?: string;
  freeShipping?: boolean;
  name?: string;
  value?: number;
  valueFormatted?: string;
  valueString?: string;
  voucherCode?: string;
}

export interface DeliveryOrderEntryGroup {
  deliveryAddress?: Address;
  entries?: OrderEntry[];
  quantity?: number;
  totalPriceWithTax?: Price;
}

export interface Principal {
  name?: string;
  uid?: string;
}

export interface CardType {
  code?: string;
  name?: string;
}

export interface PaymentType {
  code?: string;
  displayName?: string;
}

export interface PaymentDetails {
  accountHolderName?: string;
  billingAddress?: Address;
  cardNumber?: string;
  cardType?: CardType;
  cvn?: string;
  defaultPayment?: boolean;
  expiryMonth?: string;
  expiryYear?: string;
  id?: string;
  issueNumber?: string;
  saved?: boolean;
  startMonth?: string;
  startYear?: string;
  subscriptionId?: string;
}

export interface SaveCartResult {
  savedCartData?: Cart;
}

export interface B2BPaymentType {
  code?: string;
  displayName?: string;
}

export interface Cart {
  appliedOrderPromotions?: PromotionResult[];
  appliedProductPromotions?: PromotionResult[];
  appliedVouchers?: Voucher[];
  calculated?: boolean;
  code?: string;
  costCenter?: CostCenter;
  deliveryAddress?: Address;
  deliveryCost?: Price;
  deliveryItemsQuantity?: number;
  deliveryMode?: DeliveryMode;
  deliveryOrderGroups?: DeliveryOrderEntryGroup[];
  description?: string;
  entries?: OrderEntry[];
  expirationTime?: Date;
  guid?: string;
  name?: string;
  net?: boolean;
  orderDiscounts?: Price;
  paymentInfo?: PaymentDetails;
  paymentType?: B2BPaymentType;
  pickupItemsQuantity?: number;
  pickupOrderGroups?: PickupOrderEntryGroup[];
  potentialOrderPromotions?: PromotionResult[];
  potentialProductPromotions?: PromotionResult[];
  productDiscounts?: Price;
  purchaseOrderNumber?: string;
  saveTime?: Date;
  savedBy?: Principal;
  site?: string;
  store?: string;
  subTotal?: Price;
  totalDiscounts?: Price;
  totalItems?: number;
  totalPrice?: Price;
  totalPriceWithTax?: Price;
  totalTax?: Price;
  totalUnitCount?: number;
  user?: Principal;
}

export interface CartModification {
  deliveryModeChanged?: boolean;
  entry?: OrderEntry;
  quantity?: number;
  quantityAdded?: number;
  statusCode?: string;
  statusMessage?: string;
}
