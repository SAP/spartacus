import { QUALTRICS_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.component.ts
export const QUALTRICS_COMPONENT_MIGRATION: ComponentData = {
  selector: 'cx-qualtrics',
  componentClassName: QUALTRICS_COMPONENT,
  removedProperties: [
    {
      name: 'qualtricsEnabled$',
      comment: `'qualtricsEnabled$' property has been removed.`,
    },
  ],
};
