import {
  AngularComponentSchema,
  AngularModuleSchema,
  Schema,
} from '../add-spartacus/schema';

// TODO:#12 - extend schema?
// TODO:#12 - add other properties from Angular's Component schema?
export interface CxCmsComponentSchema
  extends Schema,
    AngularComponentSchema,
    AngularModuleSchema {
  /**
   * Inject the CmsComponentData.
   */
  cmsComponentData?: boolean;
  /**
   * Specify the model for the CmsComponentData.
   */
  cmsComponentDataModel?: string;
  /**
   * Specify the import path for the CmsComponentData.
   * Default is '@spartacus/core'
   */
  cmsComponentDataModelPath: string;
}
