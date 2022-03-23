/// <reference types="jest" />

import {
  CLI_ASM_FEATURE,
  CLI_CART_BASE_FEATURE,
  CLI_CART_IMPORT_EXPORT_FEATURE,
  CLI_CART_QUICK_ORDER_FEATURE,
  CLI_CART_SAVED_CART_FEATURE,
  CLI_CART_WISHLIST_FEATURE,
  CLI_CDC_FEATURE,
  CLI_CDS_FEATURE,
  CLI_CHECKOUT_B2B_FEATURE,
  CLI_CHECKOUT_BASE_FEATURE,
  CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
  CLI_DIGITAL_PAYMENTS_FEATURE,
  CLI_EPD_VISUALIZATION_FEATURE,
  CLI_ORDER_FEATURE,
  CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
  CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
  CLI_PRODUCT_BULK_PRICING_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_CPQ_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
  CLI_PRODUCT_CONFIGURATOR_VC_FEATURE,
  CLI_PRODUCT_IMAGE_ZOOM_FEATURE,
  CLI_PRODUCT_VARIANTS_FEATURE,
  CLI_QUALTRICS_FEATURE,
  CLI_SMARTEDIT_FEATURE,
  CLI_STOREFINDER_FEATURE,
  CLI_TRACKING_PERSONALIZATION_FEATURE,
  CLI_TRACKING_TMS_AEP_FEATURE,
  CLI_TRACKING_TMS_GTM_FEATURE,
  CLI_USER_ACCOUNT_FEATURE,
  CLI_USER_PROFILE_FEATURE,
  SPARTACUS_ASM,
  SPARTACUS_CART,
  SPARTACUS_CDC,
  SPARTACUS_CHECKOUT,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_ORDER,
  SPARTACUS_PRODUCT,
  SPARTACUS_QUALTRICS,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_STOREFINDER,
  SPARTACUS_USER,
} from '../libs-constants';
import {
  crossFeatureInstallationOrder,
  Graph,
  kahnsAlgorithm,
} from './graph-utils';

describe('Graph utils', () => {
  describe('library dependency graph', () => {
    it('scenario #1 - should be able to find a correct installation order', () => {
      const graph = new Graph([
        SPARTACUS_DIGITAL_PAYMENTS,
        SPARTACUS_CART,
        SPARTACUS_CHECKOUT,
        SPARTACUS_ORDER,
        SPARTACUS_USER,
      ]);

      graph.createEdge(SPARTACUS_DIGITAL_PAYMENTS, SPARTACUS_CART);
      graph.createEdge(SPARTACUS_DIGITAL_PAYMENTS, SPARTACUS_CHECKOUT);

      graph.createEdge(SPARTACUS_CHECKOUT, SPARTACUS_CART);
      graph.createEdge(SPARTACUS_CHECKOUT, SPARTACUS_ORDER);
      graph.createEdge(SPARTACUS_CHECKOUT, SPARTACUS_USER);

      graph.createEdge(SPARTACUS_ORDER, SPARTACUS_CART);
      graph.createEdge(SPARTACUS_ORDER, SPARTACUS_USER);

      const result = kahnsAlgorithm(graph);
      expect(result).toEqual([
        SPARTACUS_USER,
        SPARTACUS_CART,
        SPARTACUS_ORDER,
        SPARTACUS_CHECKOUT,
        SPARTACUS_DIGITAL_PAYMENTS,
      ]);
    });

    it('scenario #2 - should be able to find a correct installation order', () => {
      const graph = new Graph([
        SPARTACUS_CHECKOUT,
        SPARTACUS_CDC,
        SPARTACUS_ASM,
        SPARTACUS_CART,
        SPARTACUS_USER,
        SPARTACUS_ORDER,
      ]);

      graph.createEdge(SPARTACUS_CHECKOUT, SPARTACUS_CART);
      graph.createEdge(SPARTACUS_CHECKOUT, SPARTACUS_ORDER);
      graph.createEdge(SPARTACUS_CHECKOUT, SPARTACUS_USER);

      graph.createEdge(SPARTACUS_ORDER, SPARTACUS_CART);
      graph.createEdge(SPARTACUS_ORDER, SPARTACUS_USER);

      graph.createEdge(SPARTACUS_CDC, SPARTACUS_ASM);
      graph.createEdge(SPARTACUS_CDC, SPARTACUS_USER);

      const result = kahnsAlgorithm(graph);
      expect(result).toEqual([
        SPARTACUS_USER,
        SPARTACUS_CART,
        SPARTACUS_ASM,
        SPARTACUS_ORDER,
        SPARTACUS_CDC,
        SPARTACUS_CHECKOUT,
      ]);
    });

    it('should not do anything when the features are not related', () => {
      const graph = new Graph([
        SPARTACUS_PRODUCT,
        SPARTACUS_QUALTRICS,
        SPARTACUS_SMARTEDIT,
        SPARTACUS_STOREFINDER,
      ]);

      const result = kahnsAlgorithm(graph);
      expect(result).toEqual([
        SPARTACUS_PRODUCT,
        SPARTACUS_QUALTRICS,
        SPARTACUS_SMARTEDIT,
        SPARTACUS_STOREFINDER,
      ]);
    });

    it('should be able to detect a cyclic dependency', () => {
      const graph = new Graph();
      graph.addVertex('a', 'b', 'c');

      graph.createEdge('a', 'b');
      graph.createEdge('b', 'c');
      graph.createEdge('c', 'a');

      try {
        kahnsAlgorithm(graph);
      } catch (e: any) {
        expect(e.message).toEqual('Circular dependency detected.');
      }
    });
  });

  describe('feature dependency graph', () => {
    it('should generate the correct installation order', () => {
      expect(crossFeatureInstallationOrder).toEqual([
        CLI_USER_ACCOUNT_FEATURE,
        CLI_USER_PROFILE_FEATURE,
        CLI_CART_BASE_FEATURE,
        CLI_ORDER_FEATURE,
        CLI_CHECKOUT_BASE_FEATURE,
        CLI_TRACKING_PERSONALIZATION_FEATURE,
        CLI_CHECKOUT_B2B_FEATURE,
        CLI_EPD_VISUALIZATION_FEATURE,
        CLI_DIGITAL_PAYMENTS_FEATURE,
        CLI_CDS_FEATURE,
        CLI_CDC_FEATURE,
        CLI_TRACKING_TMS_AEP_FEATURE,
        CLI_TRACKING_TMS_GTM_FEATURE,
        CLI_STOREFINDER_FEATURE,
        CLI_SMARTEDIT_FEATURE,
        CLI_QUALTRICS_FEATURE,
        CLI_PRODUCT_VARIANTS_FEATURE,
        CLI_PRODUCT_IMAGE_ZOOM_FEATURE,
        CLI_PRODUCT_BULK_PRICING_FEATURE,
        CLI_PRODUCT_CONFIGURATOR_CPQ_FEATURE,
        CLI_PRODUCT_CONFIGURATOR_VC_FEATURE,
        CLI_PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
        CLI_ORGANIZATION_ORDER_APPROVAL_FEATURE,
        CLI_ORGANIZATION_ADMINISTRATION_FEATURE,
        CLI_CHECKOUT_SCHEDULED_REPLENISHMENT_FEATURE,
        CLI_CART_SAVED_CART_FEATURE,
        CLI_CART_WISHLIST_FEATURE,
        CLI_CART_QUICK_ORDER_FEATURE,
        CLI_CART_IMPORT_EXPORT_FEATURE,
        CLI_ASM_FEATURE,
      ]);
    });
  });
});
