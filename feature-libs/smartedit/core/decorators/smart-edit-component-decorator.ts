/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Renderer2, inject } from '@angular/core';
import { ComponentDecorator, ContentSlotComponentData } from '@spartacus/core';
import { SmartEditService } from '../services/smart-edit.service';

@Injectable({
  providedIn: 'root',
})
export class SmartEditComponentDecorator extends ComponentDecorator {
  protected smartEditService = inject(SmartEditService);

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {
    super();
  }

  decorate(
    element: Element,
    renderer: Renderer2,
    component: ContentSlotComponentData
  ): void {
    if (component) {
      this.smartEditService.addSmartEditContract(
        element,
        renderer,
        component.properties
      );
    }
  }
}
