import { QUALTRICS_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const QUALTRICS_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/misc/qualtrics/qualtrics.component.ts
  selector: 'cx-qualtrics',
  componentClassName: QUALTRICS_COMPONENT,
  removedProperties: [
    {
      name: 'qualtricsEnabled$',
      comment: `'qualtricsEnabled$' property has been removed.`,
    },
  ],
};
