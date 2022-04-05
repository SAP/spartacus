/**
 * Pattern matching string starting with `http://` or `https://`.
 */
export const HTTP_PROTOCOL_REGEX: RegExp = /^https?:\/\//i;

/**
 * Pattern matching string starting with `mailto:`.
 */
export const MAILTO_PROTOCOL_REGEX: RegExp = /^mailto:/i;

/**
 * Pattern matching string starting with `tel:`.
 */
export const TEL_PROTOCOL_REGEX: RegExp = /^tel:/i;
