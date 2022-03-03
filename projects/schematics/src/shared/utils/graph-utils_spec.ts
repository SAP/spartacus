/// <reference types="jest" />

import { Node, resolveGraphDependencies } from './graph-utils';

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
});
