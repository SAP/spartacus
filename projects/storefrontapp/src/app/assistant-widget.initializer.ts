/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { WindowRef } from '@spartacus/core';
import { AssistantWidgetService } from './assistant-widget.service';

/**
 * Factory function for APP_INITIALIZER to bootstrap the assistant widget
 * during application startup.
 */
export function initializeAssistantWidget(
  service: AssistantWidgetService,
  windowRef: WindowRef
): () => void {
  return () => {
    if (windowRef.isBrowser()) {
      service.initialize();
    }
  };
}
