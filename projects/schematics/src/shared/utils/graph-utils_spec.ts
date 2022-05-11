/// <reference types="jest" />

import {
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
import { Graph, kahnsAlgorithm } from './graph-utils';

describe('Graph utils', () => {
  describe('graph', () => {
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
});
