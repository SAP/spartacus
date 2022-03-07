/// <reference types="jest" />

import {
  SPARTACUS_CART,
  SPARTACUS_CHECKOUT,
  SPARTACUS_ORDER,
  SPARTACUS_USER,
} from '..';
import { SPARTACUS_DIGITAL_PAYMENTS } from '../feature-libs-constants';
import {
  Graph,
  kahnsAlgorithm,
  Node,
  resolveGraphDependencies,
} from './graph-utils';

describe('Graph utils', () => {
  describe('resolveGraphDependencies', () => {
    describe('DP', () => {
      it('should be able to resolved dependencies correctly', () => {
        const dp = new Node('dp');
        const cart = new Node('cart');
        const checkout = new Node('checkout');
        const order = new Node('order');
        const user = new Node('user');

        // DP depends on Cart and Checkout
        dp.addEdges(cart, checkout);

        // Checkout depends on Order, Cart and User
        checkout.addEdges(order, cart, user);

        const resolved: Node[] = [];
        resolveGraphDependencies(dp, resolved);

        const resolvedNames = resolved.map((node) => node.getName());
        expect(resolvedNames).toEqual([
          'cart',
          'order',
          'user',
          'checkout',
          'dp',
        ]);
      });
    });

    describe('Product configurator', () => {
      it('should be able to resolved dependencies correctly', () => {
        const pc = new Node('pc');
        const cart = new Node('cart');
        const checkout = new Node('checkout');
        const order = new Node('order');
        const user = new Node('user');

        // PC depends on Cart, Checkout, Order
        pc.addEdges(cart, checkout, order);

        // Checkout depends on Order, Cart and User
        checkout.addEdges(order, cart, user);

        const resolved: Node[] = [];
        resolveGraphDependencies(pc, resolved);

        const resolvedNames = resolved.map((node) => node.getName());
        expect(resolvedNames).toEqual([
          'cart',
          'order',
          'user',
          'checkout',
          'pc',
        ]);
      });
    });

    describe('Imaginary complex graph', () => {
      it('should be able to resolve dependencies correctly', () => {
        const dp = new Node('dp');
        const cart = new Node('cart');
        const checkout = new Node('checkout');
        const order = new Node('order');
        const user = new Node('user');

        // DP depends on Cart, Checkout, Order
        dp.addEdges(cart, checkout, order);

        // Checkout depends on Order, Cart and User
        checkout.addEdges(order, cart, user);

        // IMAGINE: Order depends on User
        order.addEdges(user);

        // IMAGINE: User depends on Cart
        user.addEdges(cart);

        const resolved: Node[] = [];
        resolveGraphDependencies(dp, resolved);

        const resolvedNames = resolved.map((node) => node.getName());
        expect(resolvedNames).toEqual([
          'cart',
          'user',
          'order',
          'checkout',
          'dp',
        ]);
      });
    });

    describe('Circular dependency graph', () => {
      it('should be able to detect it', () => {
        const a = new Node('a');
        const b = new Node('b');
        const c = new Node('c');

        a.addEdges(b);
        b.addEdges(c);
        c.addEdges(a);

        try {
          resolveGraphDependencies(a, []);
        } catch (e: any) {
          expect(e.message).toEqual(
            'Circular dependency detected for: c --> a'
          );
        }
      });
    });
  });

  // describe('createDependencyGraph', () => {
  //   it('should create a dependency graph based on the provided nodes', () => {
  //     const dependencies: Record<string, Record<string, string>> = {
  //       [SPARTACUS_DIGITAL_PAYMENTS]: {
  //         '@spartacus/cart': '4.1.0-next.0',
  //         '@spartacus/checkout': '4.1.0-next.0',
  //         '@spartacus/core': '4.1.0-next.0',
  //         '@spartacus/schematics': '4.1.0-next.0',
  //         '@spartacus/storefront': '4.1.0-next.0',
  //       },
  //       [SPARTACUS_CART]: {
  //         '@spartacus/core': '4.1.0-next.0',
  //         '@spartacus/schematics': '4.1.0-next.0',
  //         '@spartacus/storefront': '4.1.0-next.0',
  //         '@spartacus/styles': '4.1.0-next.0',
  //       },
  //       [SPARTACUS_CHECKOUT]: {
  //         '@spartacus/cart': '4.1.0-next.0',
  //         '@spartacus/core': '4.1.0-next.0',
  //         '@spartacus/order': '4.2.0',
  //         '@spartacus/schematics': '4.1.0-next.0',
  //         '@spartacus/storefront': '4.1.0-next.0',
  //         '@spartacus/styles': '4.1.0-next.0',
  //         '@spartacus/user': '4.1.0-next.0',
  //       },
  //       [SPARTACUS_ORDER]: {
  //         '@spartacus/cart': '4.1.0-next.0',
  //         '@spartacus/core': '4.1.0-next.0',
  //         '@spartacus/schematics': '4.1.0-next.0',
  //         '@spartacus/storefront': '4.1.0-next.0',
  //         '@spartacus/styles': '4.1.0-next.0',
  //       },
  //       [SPARTACUS_USER]: {
  //         '@spartacus/core': '4.1.0-next.0',
  //         '@spartacus/schematics': '4.1.0-next.0',
  //         '@spartacus/storefront': '4.1.0-next.0',
  //         '@spartacus/styles': '4.1.0-next.0',
  //       },
  //     };
  //     const installedLibs = [
  //       SPARTACUS_DIGITAL_PAYMENTS,
  //       SPARTACUS_CART,
  //       SPARTACUS_CHECKOUT,
  //       SPARTACUS_ORDER,
  //       SPARTACUS_USER,
  //     ];

  //     const graph = createDependencyGraph(
  //       installedLibs,
  //       dependencies,
  //       CORE_SPARTACUS_SCOPES
  //     );

  //     const dpNode = findNode(graph, SPARTACUS_DIGITAL_PAYMENTS);
  //     expect(dpNode?.getEdges().map((node) => node.getName())).toEqual([
  //       SPARTACUS_CART,
  //       SPARTACUS_CHECKOUT,
  //     ]);

  //     const cartNode = findNode(graph, SPARTACUS_CART);
  //     expect(cartNode?.getEdges().map((node) => node.getName())).toEqual([]);

  //     const checkoutNode = findNode(graph, SPARTACUS_CHECKOUT);
  //     expect(checkoutNode?.getEdges().map((node) => node.getName())).toEqual([
  //       SPARTACUS_CART,
  //       SPARTACUS_ORDER,
  //       SPARTACUS_USER,
  //     ]);

  //     const orderNode = findNode(graph, SPARTACUS_ORDER);
  //     expect(orderNode?.getEdges().map((node) => node.getName())).toEqual([
  //       SPARTACUS_CART,
  //     ]);

  //     const userNode = findNode(graph, SPARTACUS_USER);
  //     expect(userNode?.getEdges().map((node) => node.getName())).toEqual([]);
  //   });
  // });

  describe('graph', () => {
    it('should be able to find one of the correct installation orders', () => {
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

      const result = kahnsAlgorithm(graph);
      expect(result).toEqual([
        SPARTACUS_CART,
        SPARTACUS_USER,
        SPARTACUS_ORDER,
        SPARTACUS_CHECKOUT,
        SPARTACUS_DIGITAL_PAYMENTS,
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
