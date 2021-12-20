import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { UsageId } from '../models/usage-ids/usage-id';
import { UsageIdDefinition } from '../models/usage-ids/usage-id-definition';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class EpdVisualizationConfig implements Config {
  /**
   * This field introduces a namespace for EPD Visualization to avoid collisions when configuration merging occurs.
   */
  public epdVisualization?: EpdVisualizationInnerConfig;
}

export interface EpdVisualizationInnerConfig {
  /**
   * UI5 configuration
   */
  ui5?: Ui5Config;
  /**
   * SAP Enterprise Product Development Visualization API endpoint configuration.
   */
  apis?: VisualizationApiConfig;
  /**
   * SAP Enterprise Product Development Visualization Usage ID configuration.
   */
  usageIds?: UsageIdConfig;
  /**
   * Configuration for the visual picking scenario.
   */
  visualPicking?: VisualPickingConfig;
}

export interface Ui5Config {
  /**
   * This is the URL that SAPUI5 is bootstrapped from.
   * The value that is configured by default in a given Spartacus release is the SAPUI5 version supported for that Spartacus release.
   *
   * Important: Please check the *End of Cloud Provisioning* column in https://sapui5.hana.ondemand.com/versionoverview.html
   * When the Cloud Provisioning period ends for a particular SAPUI5 version, that version will no longer be available on https://sapui5.hana.ondemand.com
   */
  bootstrapUrl: string;
}

export interface VisualizationApiConfig {
  /**
   * This is the base URL that is used to access the EPD Visualization APIs.
   * Use the origin portion of the URL for your EPD Fiori Launchpad.
   * i.e. https://mytenantsubdomain.epd.cfapps.eu20.hana.ondemand.com
   */
  baseUrl: string;
}

export interface UsageIdConfig {
  /**
   * Folders in the configured SAP EPD Visualization tenant that have anonymous access enabled and have this Usage ID
   * value applied will be searched for visualizations.
   * This configuration option allows for a separation between staging visualization data and production visualization data.
   */
  folderUsageId: UsageId;

  /**
   * Defines the EPD Visualization usage ID to use to refer to a product in SAP Commerce Cloud.
   * This Usage ID is used on:
   * - Visualizations to allow a visualization to be linked with a product.
   *   This allows a visualization to be found and loaded for the current product in a product details page.
   * - Scene nodes to allow a scene node to be linked with a product.
   *   This allows two way linking between scene nodes and products (which typically represent spare parts).
   */
  productUsageId: UsageIdDefinition;
}

export interface VisualPickingConfig {
  /**
   * This is the type of product reference to list for the active product (typically SPAREPART)
   */
  productReferenceType: string;
}

declare module '@spartacus/core' {
  interface Config extends EpdVisualizationConfig {}
}
