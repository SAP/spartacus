import { ServerConfig } from '../config/server-config';
import { SiteContextModuleConfig } from '../site-context/site-context-module-config';

export interface OccModuleConfig extends ServerConfig, SiteContextModuleConfig {}
