import { Price, Product } from './product.model';
import {
  GeoPoint,
  OpeningSchedule,
  PaginationModel,
  SortModel,
} from './misc.model';
import { Image } from './image.model';
import { Address } from './address.model';
import {
  DeliveryOrderEntryGroup,
  PaymentDetails,
  Principal,
  PromotionResult,
  Voucher,
} from './cart.model';

export interface DeliveryMode {
  code?: string;
  deliveryCost?: Price;
  description?: string;
  name?: string;
}

export interface PointOfService {
  address?: Address;
  description?: string;
  displayName?: string;
  distanceKm?: number;
  features?: { [propertyName: string]: string };
  formattedDistance?: string;
  geoPoint?: GeoPoint;
  mapIcon?: Image;
  name?: string;
  openingHours?: OpeningSchedule;
  storeContent?: string;
  storeImages?: Image[];
  url?: string;
}

export interface OrderEntry {
  basePrice?: Price;
  deliveryMode?: DeliveryMode;
  deliveryPointOfService?: PointOfService;
  entryNumber?: number;
  product?: Product;
  quantity?: number;
  totalPrice?: Price;
  updateable?: boolean;
}

export interface PickupOrderEntryGroup {
  deliveryPointOfService?: PointOfService;
  distance?: number;
  entries?: OrderEntry[];
  quantity?: number;
  totalPriceWithTax?: Price;
}

export interface PromotionOrderEntryConsumed {
  adjustedUnitPrice?: number;
  code?: string;
  orderEntryNumber?: number;
  quantity?: number;
}

export interface ConsignmentEntry {
  orderEntry?: OrderEntry;
  quantity?: number;
  shippedQuantity?: number;
}

export interface Consignment {
  code?: string;
  deliveryPointOfService?: PointOfService;
  entries?: ConsignmentEntry[];
  shippingAddress?: Address;
  status?: string;
  statusDate?: Date;
  trackingID?: string;
}

export interface OrderHistory {
  code?: string;
  guid?: string;
  placed?: Date;
  status?: string;
  statusDisplay?: string;
  total?: Price;
}

export interface OrderHistoryList {
  orders?: OrderHistory[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface Order {
  appliedOrderPromotions?: PromotionResult[];
  appliedProductPromotions?: PromotionResult[];
  appliedVouchers?: Voucher[];
  calculated?: boolean;
  code?: string;
  consignments?: Consignment[];
  created?: Date;
  deliveryAddress?: Address;
  deliveryCost?: Price;
  deliveryItemsQuantity?: number;
  deliveryMode?: DeliveryMode;
  deliveryOrderGroups?: DeliveryOrderEntryGroup[];
  deliveryStatus?: string;
  deliveryStatusDisplay?: string;
  entries?: OrderEntry[];
  guestCustomer?: boolean;
  guid?: string;
  net?: boolean;
  orderDiscounts?: Price;
  paymentInfo?: PaymentDetails;
  pickupItemsQuantity?: number;
  pickupOrderGroups?: PickupOrderEntryGroup[];
  productDiscounts?: Price;
  site?: string;
  status?: string;
  statusDisplay?: string;
  store?: string;
  subTotal?: Price;
  totalDiscounts?: Price;
  totalItems?: number;
  totalPrice?: Price;
  totalPriceWithTax?: Price;
  totalTax?: Price;
  unconsignedEntries?: OrderEntry[];
  user?: Principal;
}
