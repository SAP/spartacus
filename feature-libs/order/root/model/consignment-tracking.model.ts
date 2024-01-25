/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ConsignmentTrackingEvent {
  eventDate?: string;
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
  targetArrivalDate?: string;
  trackingEvents?: ConsignmentTrackingEvent[];
}
