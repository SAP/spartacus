import { ServerConfig } from '../config/server-config';
import { SiteContextConfig } from '../site-context/site-context-module-config';

export interface OccModuleConfig extends ServerConfig, SiteContextConfig {}
