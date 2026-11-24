/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, Renderer2 } from '@angular/core';
import {
  ComponentDecorator,
  ContentSlotComponentData,
  FeatureToggles,
} from '@spartacus/core';
import { SmartEditService } from '../services/smart-edit.service';

@Injectable({
  providedIn: 'root',
})
export class SmartEditComponentDecorator extends ComponentDecorator {
  private featureToggles = inject(FeatureToggles);

  constructor(protected smartEditService: SmartEditService) {
    super();
  }

  decorate(
    element: Element,
    renderer: Renderer2,
    component: ContentSlotComponentData
  ): void {
    if (!component) {
      return;
    }

    // Nested components (not direct children of a content slot) must not receive
    // the SmartEdit component HTML markup contract, otherwise SmartEdit renders a
    // "Remove" action that fails with 404 (SLOT_COMPONENT_COMPONENT_NOT_IN_SLOT).
    if (
      this.featureToggles.enableSmartEditContractForDirectSlotChildrenOnly &&
      component.nested
    ) {
      return;
    }

    this.smartEditService.addSmartEditContract(
      element,
      renderer,
      component.properties
    );
  }
}
