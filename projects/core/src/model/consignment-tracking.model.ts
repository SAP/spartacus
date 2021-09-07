/**
 * @deprecated since 4.2 - use order lib instead
 */
export interface ConsignmentTrackingEvent {
  eventDate?: string;
  detail?: string;
  location?: string;
  referenceCode?: string;
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export interface Carrier {
  code?: string;
  name?: string;
}

/**
 * @deprecated since 4.2 - use order lib instead
 */
export interface ConsignmentTracking {
  statusDisplay?: string;
  carrierDetails?: Carrier;
  trackingID?: string;
  trackingUrl?: string;
  targetArrivalDate?: string;
  trackingEvents?: ConsignmentTrackingEvent[];
}
