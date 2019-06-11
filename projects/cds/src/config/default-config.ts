import { CdsConfig } from './config.model';

export const defaultCdsConfig: CdsConfig = {
  cds: {
    httpHeaderName: {
      id: 'consent-reference',
    },
    profileTagScriptUrl:
      'https://profiletag-us-stage.s3.amazonaws.com/js/beta/profile-tag-spartacus-us.js',
  },
};
