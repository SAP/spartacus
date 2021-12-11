export const CHAT_BOT_FEATURE = 'stores';

export interface StateWithChatBot {
  [CHAT_BOT_FEATURE]: ChatBotState;
}

export interface ChatBotState {
  chatBot: {};
}
