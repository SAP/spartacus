export namespace ChatGPT4 {
  export interface Message {
    role: Role;
    content: string;
  }

  export enum Role {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system',
  }
}
