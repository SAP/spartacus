import { MethodPropertyDeprecation } from '../../../shared/utils/file-utils';
import { CMS_ACTIONS_MIGRATION } from './data/cms-group.actions.migration';
import { CMS_SELECTORS_MIGRATION } from './data/cms-group.selectors.migration';

export const METHOD_PROPERTY_DATA: MethodPropertyDeprecation[] = [
  ...CMS_SELECTORS_MIGRATION,
  ...CMS_ACTIONS_MIGRATION,
  ...CMS_SELECTORS_MIGRATION,
];
