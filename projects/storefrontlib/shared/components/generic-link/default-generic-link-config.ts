import {
  GenericLinkConfig,
  MAILTO_PROTOCOL_REGEX,
  PROTOCOL_REGEX,
  TEL_PROTOCOL_REGEX,
} from './generic-link.config';

export const defaultGenericLinkConfig: GenericLinkConfig = {
  genericLinks: {
    externalLinkRegexes: [
      PROTOCOL_REGEX,
      MAILTO_PROTOCOL_REGEX,
      TEL_PROTOCOL_REGEX,
    ],
  },
};
