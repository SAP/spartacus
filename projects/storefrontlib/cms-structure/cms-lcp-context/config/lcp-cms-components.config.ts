/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

/**
 * Configuration for recognizing which CMS components are containing
 * the LCP (Largest Contentful Paint) element.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class LcpCmsComponentsConfig {
  /**
   * Configuration telling which CMS components contain the LCP (Largest Contentful Paint) element.
   * Thanks to this context, Spartacus can optimize the loading of those components (for example
   * by prioritizing the loading of their main image).
   *
   * If you need more advanced logic to determine whether a CMS component contains
   * the LCP element, you can extend the `CmsLcpService`.
   */
  lcpCmsComponents?: {
    /**
     * If a CMS component ID includes this substring, Spartacus treats it as containing
     * the LCP (Largest Contentful Paint) element. You can append this substring
     * to certain CMS component IDs in your CMS data, so Spartacus will automatically
     * recognize them as containing the LCP element.
     *
     * For example, with a marker "__cxLCP__", an ID like "myComponentID__cxLCP__"
     * will be recognized as containing the LCP element.
     */
    idMarker?: string;

    /**
     * Static list of CMS component IDs containing the LCP (Largest Contentful Paint)
     * element.
     *
     * It's just a static list of component IDs. If you'd like to dynamically mark certain CMS components
     * as containing the LCP element in your CMS, use the sibling config property `idMarker` instead.
     */
    ids?: string[];
  };
}

declare module '@spartacus/core' {
  interface Config extends LcpCmsComponentsConfig {}
}
