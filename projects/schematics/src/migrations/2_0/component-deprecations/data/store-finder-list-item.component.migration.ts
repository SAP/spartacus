import { STORE_FINDER_LIST_ITEM_COMPONENT } from '../../../../shared/constants';
import { ComponentData } from '../../../../shared/utils/file-utils';

export const STORE_FINDER_LIST_ITEM_MIGRATION: ComponentData = {
  selector: 'cx-store-finder-list-item',
  componentClassName: STORE_FINDER_LIST_ITEM_COMPONENT,
  removedProperties: [
    {
      name: 'viewStore',
      comment: `'viewStore' method has been removed.`,
    },
    {
      name: 'prepareRouteUrl',
      comment: `'prepareRouteUrl' method has been removed.`,
    },
  ],
};
