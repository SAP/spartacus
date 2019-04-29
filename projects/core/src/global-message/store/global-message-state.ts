import { TranslationCommand } from '../../i18n/translation-command';

export const GLOBAL_MESSAGE_FEATURE = 'global-message';

export interface StateWithGlobalMessage {
  [GLOBAL_MESSAGE_FEATURE]: GlobalMessageState;
}

export interface GlobalMessageEntities {
  [messageType: string]: TranslationCommand[];
}

export interface GlobalMessageState {
  entities: GlobalMessageEntities;
}
