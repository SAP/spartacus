import { OnNavigateConfig } from './on-navigate-config';

export const defaultOnNavigateConfig: OnNavigateConfig = {
  enableResetViewOnNavigate: {
    active: true,
    ignoreQueryString: false,
    ignoreRoutes: [],
  },
};
