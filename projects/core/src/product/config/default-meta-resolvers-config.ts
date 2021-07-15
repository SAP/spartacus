import {
  CMS_PRODUCT_LIST_COMPONENT_TYPE,
  PRODUCT_GRID_COMPONENT_TYPE,
} from '../../cms/config/cms-config';
import { MetaResolversConfig } from './meta-resolvers-config';

export const defaultMetaResolversConfig: MetaResolversConfig = {
  categoryPageMetaResolver: {
    productListComponents: [
      CMS_PRODUCT_LIST_COMPONENT_TYPE,
      PRODUCT_GRID_COMPONENT_TYPE,
    ],
  },
};
