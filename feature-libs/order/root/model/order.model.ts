import {
  Order,
  OrderEntry,
  PaginationModel,
  Price,
  SortModel,
} from '@spartacus/core';

export interface CancelOrReturnRequestEntryInput {
  orderEntryNumber?: number;
  quantity?: number;
}

export interface ReturnRequestEntryInputList {
  orderCode?: string;
  returnRequestEntryInputs?: CancelOrReturnRequestEntryInput[];
}

export interface CancellationRequestEntryInputList {
  cancellationRequestEntryInputs?: CancelOrReturnRequestEntryInput[];
}

export interface ReturnRequestEntry {
  orderEntry?: OrderEntry;
  expectedQuantity?: number;
  refundAmount?: Price;
}

export interface ReturnRequest {
  cancellable?: boolean;
  code?: string;
  creationTime?: Date;
  deliveryCost?: Price;
  order?: Order;
  refundDeliveryCost?: boolean;
  returnEntries?: ReturnRequestEntry[];
  returnLabelDownloadUrl?: string;
  rma?: string;
  status?: string;
  subTotal?: Price;
  totalPrice?: Price;
}

export interface ReturnRequestList {
  returnRequests?: ReturnRequest[];
  pagination?: PaginationModel;
  sorts?: SortModel[];
}

export interface ReturnRequestModification {
  status?: string;
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
