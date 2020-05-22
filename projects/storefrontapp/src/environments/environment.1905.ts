/************* TODO:b2b REVERT THIS FILE BEFORE MERGING **************/
/** The contents should be:
import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: true,
  occBaseUrl: 'https://dev-com-17.accdemo.b2c.ydev.hybris.com:9002',
  occApiPrefix: '/rest/v2/',
};
 */
/********************************************************************/

import { Environment } from './models/environment.model';

export const environment: Environment = {
  production: true,
  occBaseUrl: 'https://dev-com-7.accdemo.b2c.ydev.hybris.com:9002',
  occApiPrefix: '/occ/v2/',
  b2b: true,
};
