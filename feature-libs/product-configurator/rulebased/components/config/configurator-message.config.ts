/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProductConfiguratorMessageConfig {
  updateConfigurationMessage?: {
    /**
     * Milliseconds to wait after an update starts before the message is shown.
     * Opposite effect to {@link hideWaitingTime}: a higher value delays the start and
     * shortens how long the banner is visible for a given update; a lower value shows
     * the banner sooner and extends its visible time.
     */
    waitingTime?: number;
    /**
     * Milliseconds to wait after an update finishes before the message is hidden.
     * Opposite effect to {@link waitingTime}: a higher value keeps the banner visible
     * longer and extends its appearance; a lower value hides it sooner and
     * shortens how long it stays on screen.
     */
    hideWaitingTime?: number;
  };
}

export abstract class ConfiguratorMessageConfig {
  productConfigurator?: ProductConfiguratorMessageConfig;
}
