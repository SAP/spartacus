import { KYMA_ENABLED, TODO_SPARTACUS } from '../../../../shared/constants';
import { ConfigDeprecation } from '../../../../shared/utils/file-utils';

export const KYMA_FEATURE_FLAG_MIGRATION: ConfigDeprecation = {
  propertyName: KYMA_ENABLED,
  comment: `// ${TODO_SPARTACUS} '${KYMA_ENABLED}' has been removed. Just remove this property, as kyma is now enabled by just importing 'KymaModule'.\n`,
};
