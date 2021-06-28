import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { ContentSlotComponentData } from '../model/content-slot-component-data.model';
import { CmsConfig } from './cms-config';

/**
 * The `CmsPageConfig` is used to build pages by configuration.
 * The interfaces are designed to have a clean configuration for
 * static CMS structure. Ordinary attributes that are not
 * required for configurable pages have been left out and
 * will not be serialized in the adapter logic.
 */
export interface CmsPageConfig {
  /**
   * When the `ignoreBackend` is set to true, the CMS backend
   * will not be consumed. This saves network latency and is
   * useful for commodity commerce pages.
   * */
  ignoreBackend?: boolean;

  pageId?: string;

  type?: string;

  /**
   * The page title is typically used to display the page heading
   * as well as for the page title tag. The latter is used for browser
   * navigation as well as SEO and social share platforms.
   */
  title?: string;

  /**
   * the template is used to bind to the layout
   * configuration and css layout class
   */
  template?: string;

  /**
   * The page slots represent various sections on the page that
   * can contain components.
   */
  slots: { [key: string]: CmsPageSlotConfig };
}

/**
 * The `CmsPageSlotsConfig` (plural) holds `CmsPageSlotConfig` objects.
 */
export interface CmsPageSlotsConfig {
  [key: string]: CmsPageSlotConfig;
}

/**
 * The `CmsPageSlotConfig` is a simplified configuration model
 * that can be used to configure slots in static configuration,
 * rather than loading from a backend.
 */
export interface CmsPageSlotConfig {
  componentIds?: string[];
  properties?: any;
}

/**
 * The `CmsStructureConfig` is used to build pages in Spartacus by configuration
 * instead of using a backend CMS system. The configuration can be used to build
 * complete pages or parts of a page. The `CmsStructureConfig` is optimized to
 * only require the necessary properties. Adapter logic is applied to serialize
 * the `CmsStructureConfig` into the required UI model.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CmsStructureConfig extends CmsConfig {
  cmsStructure?: {
    components?: { [key: string]: ContentSlotComponentData | any };
    pages?: CmsPageConfig[];
    slots?: CmsPageSlotsConfig;
  };
}

declare module '../../config/config-tokens' {
  interface Config extends CmsStructureConfig {}
}
