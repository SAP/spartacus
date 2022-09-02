import {
  AddEntryOptions,
  BaseCartOptions,
  CartModification,
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
  extends ActionPayload<BaseCartOptions<AddEntryOptions>> {}

/**
 * Payload type for CartAddEntrySuccess action
 */
export interface CartAddEntrySuccessPayload
  extends ActionSuccessPayload<
    BaseCartOptions<AddEntryOptions>,
    CartModification
  > {}

/**
 * Payload type for CartAddEntryFail action
 */
export interface CartAddEntryFailPayload
  extends ActionFailPayload<BaseCartOptions<AddEntryOptions>> {}

/**
 * Payload type for CartRemoveEntry action
 */
export interface CartRemoveEntryPayload
  extends ActionPayload<BaseCartOptions<RemoveEntryOptions>> {}

/**
 * Payload type for CartRemoveEntrySuccess action
 */
export interface CartRemoveEntrySuccessPayload extends CartRemoveEntryPayload {}

/**
 * Payload type for CartRemoveEntryFail action
 */
export interface CartRemoveEntryFailPayload
  extends ActionFailPayload<BaseCartOptions<RemoveEntryOptions>> {}

/**
 * Payload type for CartUpdateEntry action
 */
export interface CartUpdateEntryPayload
  extends ActionPayload<BaseCartOptions<UpdateEntryOptions>> {}

/**
 * Payload type for CartUpdateEntrySuccess action
 */
export interface CartUpdateEntrySuccessPayload extends CartUpdateEntryPayload {}

/**
 * Payload type for CartUpdateEntryFail action
 */
export interface CartUpdateEntryFailPayload
  extends ActionFailPayload<BaseCartOptions<UpdateEntryOptions>> {}
