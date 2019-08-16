export interface ConsignmentTrackingEvent {
  eventDate?: Date;
  detail?: string;
  location?: string;
  referenceCode?: string;
}

export interface Carrier {
  code?: string;
  name?: string;
}

export interface ConsignmentTracking {
  statusDisplay?: string;
  carrierDetails?: Carrier;
  trackingID?: string;
  trackingUrl?: string;
  targetArrivalDate?: Date;
  trackingEvents?: ConsignmentTrackingEvent[];
}
