export interface MessageDetails {
  messages: Array<MessageEvent>;
  newMessagePlaceHolder?: string;
  characterLimit?: number;
}

export interface MessageEvent {
  author: string;
  createdAt?: string;
  message?: string;
  attachments?: Array<Attachment>;
}

export interface Attachment {
  filename: string;
  URL: string;
}
