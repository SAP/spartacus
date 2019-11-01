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
  createModule: boolean;
}
