import {
  Address,
  DeliveryMode,
  DeliveryOrderEntryGroup,
  PaymentDetails,
  PointOfService,
  Price,
  Principal,
  PromotionResult,
  Voucher,
} from '../../occ/occ-models';
import { UIProduct } from '../../product/model/product';

export interface UIOrderEntry {
  basePrice?: Price;
  deliveryMode?: DeliveryMode;
  deliveryPointOfService?: PointOfService;
  entryNumber?: number;
  product?: UIProduct;
  quantity?: number;
  totalPrice?: Price;
  updateable?: boolean;
}

export interface UIPickupOrderEntryGroup {
  deliveryPointOfService?: PointOfService;
  distance?: number;
  entries?: UIOrderEntry[];
  quantity?: number;
  totalPriceWithTax?: Price;
}

export interface UICart {
  appliedOrderPromotions?: PromotionResult[];
  appliedProductPromotions?: PromotionResult[];
  appliedVouchers?: Voucher[];
  calculated?: boolean;
  code?: string;
  deliveryAddress?: Address;
  deliveryCost?: Price;
  deliveryItemsQuantity?: number;
  deliveryMode?: DeliveryMode;
  deliveryOrderGroups?: DeliveryOrderEntryGroup[];
  description?: string;
  entries?: UIOrderEntry[];
  expirationTime?: Date;
  guid?: string;
  name?: string;
  net?: boolean;
  orderDiscounts?: Price;
  paymentInfo?: PaymentDetails;
  pickupItemsQuantity?: number;
  pickupOrderGroups?: UIPickupOrderEntryGroup[];
  potentialOrderPromotions?: PromotionResult[];
  potentialProductPromotions?: PromotionResult[];
  productDiscounts?: Price;
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
