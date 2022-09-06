import {
  AddEntryOptions,
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

/**
 * Payload type for CartAddEntry action
 */
export interface CartAddEntryPayload
  extends ActionPayload<CartOptions<AddEntryOptions>> {}

/**
 * Payload type for CartAddEntrySuccess action
 */
export interface CartAddEntrySuccessPayload
  extends ActionSuccessPayload<
    CartOptions<AddEntryOptions>,
    CartModification
  > {}

/**
 * Payload type for CartAddEntryFail action
 */
export interface CartAddEntryFailPayload
  extends ActionFailPayload<CartOptions<AddEntryOptions>> {}

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
