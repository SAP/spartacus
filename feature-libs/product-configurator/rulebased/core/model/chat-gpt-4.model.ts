export namespace ChatGPT4 {
  export interface Message {
    role: Role;
    content: string;
  }

  export interface Request {
    deployment_id: string;
    messages: Message[];
  }

  export interface Response {
    choices: Choice[];
    created: Date;
    id: string;
    usage: Usage;
  }

  export interface Choice {
    finish_reason: string;
    index: number;
    message: Message;
  }

  export interface Usage {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: Message;
  }

  export enum Role {
    USER = 'user',
    ASSISTANT = 'assistant',
    SYSTEM = 'system',
  }
}
