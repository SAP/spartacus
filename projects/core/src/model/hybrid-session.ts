import { AuthToken } from '../auth/user-auth';

export interface Session {
  oauth?: SessionAuthToken;
  session?: {
    language: string;
    currency: string;
  };
  messages?: SessionMessage[];
}

export interface SessionAuthToken extends AuthToken {
  userId: string;
}

export interface SessionMessage {
  level: string;
  message: string;
}
