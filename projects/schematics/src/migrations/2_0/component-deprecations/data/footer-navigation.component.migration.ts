import { FOOTER_NAVIGATION_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const FOOTER_NAVIGATION_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/src/cms-components/navigation/footer-navigation/footer-navigation.component.ts
  selector: 'cx-footer-navigation',
  componentClassName: FOOTER_NAVIGATION_COMPONENT,
  removedProperties: [
    {
      name: 'data$',
      comment: `'data$' property has been removed.`,
    },
  ],
};
