/**
 * Base class for events.
 *
 * For convenience it copies all properties of the argument object into the properties of the class instance.
 *
 * Provides type safety both for the argument and the result class instance. For example:
 *
 * ```
 * export class CreateCartSuccess extends BaseEvent<CreateCartSuccess> {
 *   cart: Cart;
 * }
 * const event = new CreateCartSuccess({ cart: ... });
 * event.cart
 * ```
 */
export class BaseEvent<T> {
  constructor(data: T) {
    Object.assign(this, data);
  }
}
