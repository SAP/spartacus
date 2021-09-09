import { NAVIGATION_UI_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const NAVIGATION_UI_COMPONENT_MIGRATION: ComponentData = {
  // projects/storefrontlib/cms-components/navigation/navigation/navigation-ui.component.ts
  selector: 'cx-navigation-ui',
  componentClassName: NAVIGATION_UI_COMPONENT,
  removedProperties: [
    {
      name: 'allowAlignToRight',
      comment: `'allowAlignToRight' property has been removed.`,
    },
  ],
};
