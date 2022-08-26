export interface MessageEvent {
  author?: string;
  rightAlign?: boolean;
  createdAt?: string;
  text?: string;
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
  enableFileUploadOption?: boolean;
}

export interface AttachmentRestrictions {
  maxSize?: number;
  maxEntries?: number;
  allowedTypes?: Array<string>;
}
