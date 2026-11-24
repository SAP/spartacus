/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ContentSlotComponentData {
  uid?: string;
  typeCode?: string;
  flexType?: string;
  properties?: any;
  /**
   * Marks a component that is NOT a direct child of a content slot, i.e. a value
   * nested inside a container component's attribute (e.g. a tab inside a
   * `CMSTabParagraphContainer`, a slide inside a carousel, or an inner component).
   *
   * SmartEdit uses this to avoid applying the component HTML markup contract to
   * nested components: they cannot be removed from a slot, so a "Remove" action
   * would fail with 404 (SLOT_COMPONENT_COMPONENT_NOT_IN_SLOT).
   */
  nested?: boolean;
}
