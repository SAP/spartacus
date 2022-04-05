import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

/**
 * Pattern matching string starting with `http://` or `https://`.
 */
export const PROTOCOL_REGEX: RegExp = /^https?:\/\//i;

/**
 * Pattern matching string starting with `mailto:`.
 */
export const MAILTO_PROTOCOL_REGEX: RegExp = /^mailto:/i;

/**
 * Pattern matching string starting with `tel:`.
 */
export const TEL_PROTOCOL_REGEX: RegExp = /^tel:/i;

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class GenericLinkConfig {
  genericLinks?: {
    externalLinkRegexes?: RegExp[];
  };
}

declare module '@spartacus/core' {
  interface Config extends GenericLinkConfig {}
}
