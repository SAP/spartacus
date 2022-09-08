import {
  AddEntryActionOptions,
  CartModification,
  CartOptions,
  RemoveEntryOptions,
  UpdateEntryOptions,
} from '@spartacus/cart/base/root';
import {
  ActionFailPayload,
  ActionPayload,
  ActionSuccessPayload,
} from '@spartacus/core';

// TODO:#xxx - remove all these?

/**
 * Payload type for CartAddEntry action
 */
export interface CartAddEntryPayload
  extends ActionPayload<AddEntryActionOptions> {}

/**
 * Payload type for CartAddEntrySuccess action
 */
export interface CartAddEntrySuccessPayload
  extends ActionSuccessPayload<AddEntryActionOptions, CartModification> {}

/**
 * Payload type for CartAddEntryFail action
 */
export interface CartAddEntryFailPayload
  extends ActionFailPayload<AddEntryActionOptions> {}

/**
 * Payload type for CartRemoveEntry action
 */
export interface CartRemoveEntryPayload
  extends ActionPayload<CartOptions<RemoveEntryOptions>> {}

/**
 * Payload type for CartRemoveEntrySuccess action
 */
export interface CartRemoveEntrySuccessPayload extends CartRemoveEntryPayload {}

/**
 * Payload type for CartRemoveEntryFail action
 */
export interface CartRemoveEntryFailPayload
  extends ActionFailPayload<CartOptions<RemoveEntryOptions>> {}

/**
 * Payload type for CartUpdateEntry action
 */
export interface CartUpdateEntryPayload
  extends ActionPayload<CartOptions<UpdateEntryOptions>> {}

/**
 * Payload type for CartUpdateEntrySuccess action
 */
export interface CartUpdateEntrySuccessPayload extends CartUpdateEntryPayload {}

/**
 * Payload type for CartUpdateEntryFail action
 */
export interface CartUpdateEntryFailPayload
  extends ActionFailPayload<CartOptions<UpdateEntryOptions>> {}
