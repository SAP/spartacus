/**
 * Base cart event. Almost all cart events should have `cartId` and `userId`
 */
export abstract class MultiCartEvent {
  cartId?: string;
  userId?: string;
}
