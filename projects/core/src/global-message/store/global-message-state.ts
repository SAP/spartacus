import { Translation } from '../../i18n/translation';

export const GLOBAL_MESSAGE_FEATURE = 'global-message';

export interface StateWithGlobalMessage {
  [GLOBAL_MESSAGE_FEATURE]: GlobalMessageState;
}

export interface GlobalMessageEntities {
  [messageType: string]: Translation[];
}

export interface GlobalMessageState {
  entities: GlobalMessageEntities;
}
