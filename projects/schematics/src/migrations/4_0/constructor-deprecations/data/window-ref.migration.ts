import {
  ANGULAR_COMMON,
  ANGULAR_CORE,
  ANY_TYPE,
  DOCUMENT,
  DOCUMENT_STRING,
  OBJECT_TYPE,
  PLATFORM,
  PLATFORM_ID_STRING,
  SERVER_REQUEST_URL_STRING,
  SERVER_REQUEST_ORIGIN_STRING,
  SPARTACUS_CORE,
  STRING_TYPE,
  WINDOW_REF,
} from '../../../../shared/constants';
import { ConstructorDeprecation } from '../../../../shared/utils/file-utils';

export const WINDOW_REF_MIGRATION: ConstructorDeprecation = {
  // projects/core/src/window/window-ref.ts
  class: WINDOW_REF,
  importPath: SPARTACUS_CORE,
  deprecatedParams: [
    {
      className: DOCUMENT,
      literalInference: ANY_TYPE,
      injectionToken: {
        token: DOCUMENT_STRING,
        importPath: ANGULAR_COMMON,
      },
    },
  ],
  addParams: [
    {
      className: PLATFORM,
      literalInference: OBJECT_TYPE,
      injectionToken: {
        token: PLATFORM_ID_STRING,
        importPath: ANGULAR_CORE,
      },
    },
    {
      className: SERVER_REQUEST_URL_STRING,
      literalInference: STRING_TYPE,
      injectionToken: {
        token: SERVER_REQUEST_URL_STRING,
        importPath: SPARTACUS_CORE,
      },
    },
    {
      className: SERVER_REQUEST_ORIGIN_STRING,
      literalInference: STRING_TYPE,
      injectionToken: {
        token: SERVER_REQUEST_ORIGIN_STRING,
        importPath: SPARTACUS_CORE,
      },
    },
  ],
};
