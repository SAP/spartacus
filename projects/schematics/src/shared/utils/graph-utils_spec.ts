/// <reference types="jest" />

import {
  SPARTACUS_ASM,
  SPARTACUS_CART,
  SPARTACUS_CDC,
  SPARTACUS_CDP,
  SPARTACUS_CDS,
  SPARTACUS_CHECKOUT,
  SPARTACUS_CUSTOMER_TICKETING,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_EPD_VISUALIZATION,
  SPARTACUS_ESTIMATED_DELIVERY_DATE,
  SPARTACUS_OPF,
  SPARTACUS_CPQ_QUOTE,
  SPARTACUS_OPPS,
  SPARTACUS_ORDER,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_PDF_INVOICES,
  SPARTACUS_PICKUP_IN_STORE,
  SPARTACUS_PRODUCT,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_QUALTRICS,
  SPARTACUS_QUOTE,
  SPARTACUS_REQUESTED_DELIVERY_DATE,
  SPARTACUS_S4OM,
  SPARTACUS_S4_SERVICE,
  SPARTACUS_SEGMENT_REFS,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_STOREFINDER,
  SPARTACUS_TRACKING,
  SPARTACUS_USER,
} from '../libs-constants';
import {
  Graph,
  crossFeatureInstallationOrder,
  crossLibraryInstallationOrder,
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
        SPARTACUS_PDF_INVOICES,
        SPARTACUS_CART,
        SPARTACUS_ORDER,
        SPARTACUS_CHECKOUT,
        SPARTACUS_STOREFINDER,
        SPARTACUS_REQUESTED_DELIVERY_DATE,
        SPARTACUS_PICKUP_IN_STORE,
        SPARTACUS_TRACKING,
        SPARTACUS_CUSTOMER_TICKETING,
        SPARTACUS_ORGANIZATION,
        SPARTACUS_ASM,
        SPARTACUS_SEGMENT_REFS,
        SPARTACUS_S4OM,
        SPARTACUS_S4_SERVICE,
        SPARTACUS_OPPS,
        SPARTACUS_OPF,
        SPARTACUS_EPD_VISUALIZATION,
        SPARTACUS_DIGITAL_PAYMENTS,
        SPARTACUS_CPQ_QUOTE,
        SPARTACUS_CDS,
        SPARTACUS_CDP,
        SPARTACUS_CDC,
        SPARTACUS_SMARTEDIT,
        SPARTACUS_QUOTE,
        SPARTACUS_QUALTRICS,
        SPARTACUS_PRODUCT_CONFIGURATOR,
        SPARTACUS_PRODUCT,
        SPARTACUS_ESTIMATED_DELIVERY_DATE,
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
          "OPF-Base",
          "OPF-Checkout",
          "PDF-Invoices",
          "Requested-Delivery-Date",
          "Customer-Ticketing",
          "Organization-User-Registration",
          "Administration",
          "Account-Summary",
          "Unit-Order",
          "Order-Approval",
          "VC-Configurator",
          "CPQ-Configurator",
          "Textfield-Configurator",
          "Store-Finder",
          "ASM",
          "ASM-Customer-360",
          "Cpq-Quote",
          "Segment-Refs",
          "s4-service",
          "S4HANA-Order-Management",
          "OPPS",
          "EPD-Visualization",
          "Digital-Payments",
          "CDS",
          "CDP",
          "CDC-B2B",
          "CDC",
          "SmartEdit",
          "Estimated-Delivery-Date",
          "Qualtrics",
          "Future-Stock",
          "Product-Variants",
          "Image-Zoom",
          "Bulk-Pricing",
          "Pickup-In-Store",
          "Quote",
        ]
      `);
    });
  });
});
