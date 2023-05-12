import { CxError } from './cx-error';

export abstract class ServerRenderError extends Error {
  constructor(public readonly cxErrorCode: string, message?: string) {
    super(message);
  }
}

export class UnknownServerRenderError extends ServerRenderError {
  constructor(html: string) {
    super(CxError.UnknownServerRenderError, html);
  }
}
