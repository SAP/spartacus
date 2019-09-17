import { OCC_USER_ID_ANONYMOUS } from './utils/occ-constants';

export * from './config/config-from-meta-tag-factory';
export * from './config/default-occ-config';
export * from './config/occ-config';
export * from './config/occ-config-validator';
export * from './occ-models/index';
export * from './occ.module';
export * from './services/index';
export * from './utils/interceptor-util';
export * from './adapters/index';
export * from './utils/occ-constants';
/**
 * @deprecated since 1.2.0
 * Use OCC_USER_ID_ANONYMOUS instead
 */
export const ANONYMOUS_USERID = OCC_USER_ID_ANONYMOUS;
