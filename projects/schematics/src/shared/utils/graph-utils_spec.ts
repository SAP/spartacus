/// <reference types="jest" />

import {
  SPARTACUS_ASM,
  SPARTACUS_CART,
  SPARTACUS_CDC,
  SPARTACUS_CDS,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CUSTOMER_TICKETING,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_EPD_VISUALIZATION,
  SPARTACUS_ORDER,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_PICKUP_IN_STORE,
  SPARTACUS_PRODUCT,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_QUALTRICS,
  SPARTACUS_S4OM,
  SPARTACUS_SEGMENT_REFS,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_STOREFINDER,
  SPARTACUS_TRACKING,
  SPARTACUS_USER,
} from '../libs-constants';
import {
  crossFeatureInstallationOrder,
  crossLibraryInstallationOrder,
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

    it('should have generated the correct order', () => {
      expect(crossLibraryInstallationOrder).toEqual([
        SPARTACUS_USER,
        SPARTACUS_CART,
        SPARTACUS_ORDER,
        SPARTACUS_CHECKOUT,
        SPARTACUS_TRACKING,
        SPARTACUS_ORGANIZATION,
        SPARTACUS_ASM,
        SPARTACUS_STOREFINDER,
        SPARTACUS_SEGMENT_REFS,
        SPARTACUS_S4OM,
        SPARTACUS_EPD_VISUALIZATION,
        SPARTACUS_DIGITAL_PAYMENTS,
        SPARTACUS_CDS,
        SPARTACUS_CDC,
        SPARTACUS_SMARTEDIT,
        SPARTACUS_QUALTRICS,
        SPARTACUS_PRODUCT_CONFIGURATOR,
        SPARTACUS_PRODUCT,
        SPARTACUS_PICKUP_IN_STORE,
        SPARTACUS_CUSTOMER_TICKETING,
      ]);
    });
  });

  describe('feature dependency graph', () => {
    it('should generate the correct installation order', () => {
      expect(crossFeatureInstallationOrder).toMatchInlineSnapshot(`
        [
          "User-Account",
          "User-Profile",
          "Cart",
          "Saved-Cart",
          "WishList",
          "Quick-Order",
          "Import-Export",
          "Order",
          "Checkout",
          "Checkout-B2B",
          "Checkout-Scheduled-Replenishment",
          "Personalization",
          "TMS-AEPL",
          "TMS-GTM",
          "Administration",
          "Account-Summary",
          "Unit-Order",
          "Organization-User-Registration",
          "Order-Approval",
          "VC-Configurator",
          "CPQ-Configurator",
          "Textfield-Configurator",
          "Store-Finder",
          "Segment-Refs",
          "S4HANA-Order-Management",
          "EPD-Visualization",
          "Digital-Payments",
          "CDS",
          "CDC",
          "Customer-Ticketing",
          "SmartEdit",
          "Qualtrics",
          "Future-Stock",
          "Product-Variants",
          "Image-Zoom",
          "Bulk-Pricing",
          "Pickup-In-Store",
          "ASM",
        ]
      `);
    });
  });
});
