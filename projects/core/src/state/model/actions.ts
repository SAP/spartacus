/**
 * A generic type for action payload.
 */
export interface ActionPayload<O> {
  options: O;
}

/**
 * A generic type for success actions payload.
 */
export interface ActionSuccessPayload<O, R> {
  options: O;
  result: R;
}

/**
 * A generic type for fail actions.
 */
export interface ActionFailPayload<O> {
  options: O;
  error: any;
}
