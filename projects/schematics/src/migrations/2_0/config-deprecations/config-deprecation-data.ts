import { ConfigDeprecation } from '../../../shared/utils/file-utils';
import { ANONYMOUS_CONSENTS_FEATURE_FLAG_MIGRATION } from './data/anonymous-consents-flag.migration';
import { KYMA_FEATURE_FLAG_MIGRATION } from './data/kyma-feature-flag.migration';

export const CONFIG_DEPRECATION_DATA: ConfigDeprecation[] = [
  KYMA_FEATURE_FLAG_MIGRATION,
  ANONYMOUS_CONSENTS_FEATURE_FLAG_MIGRATION,
];
