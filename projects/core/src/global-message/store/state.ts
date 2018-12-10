export const GLOBAL_MESSAGE_FEATURE = 'global-message';

export interface StateWithGlobalMessage {
  [GLOBAL_MESSAGE_FEATURE]: GlobalMessageState;
}

export interface GlobalMessageState {
  entities: { [productCode: string]: any };
}

export interface GlobalMessagesState {
  globalMessages: GlobalMessageState;
}
