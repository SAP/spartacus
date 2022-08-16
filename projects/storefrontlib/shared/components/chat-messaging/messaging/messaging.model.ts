export interface MessageDetails {
  messages: Array<MessageEvent>;
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

export interface MessagingConfigs {
  attachmentRestrictions?: AttachmentRestrictions;
  charactersLimit?: number;
  newMessagePlaceHolder?: string;
}

export interface AttachmentRestrictions {
  maxSize?: number;
  maxEntries?: number;
  allowedTypes?: Array<string>;
}
