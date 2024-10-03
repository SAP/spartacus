/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, Renderer2 } from '@angular/core';
import { ContentSlotData, SlotDecorator } from '@spartacus/core';
import { SmartEditService } from '../services/smart-edit.service';

@Injectable({
  providedIn: 'root',
})
export class SmartEditSlotDecorator extends SlotDecorator {
  constructor(protected smartEditService: SmartEditService) {
    super();
  }

  decorate(element: Element, renderer: Renderer2, slot: ContentSlotData): void {
    if (slot) {
      this.smartEditService.addSmartEditContract(
        element,
        renderer,
        slot.properties
      );
    }
  }
}
