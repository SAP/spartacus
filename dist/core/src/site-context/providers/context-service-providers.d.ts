import { Provider } from '@angular/core';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { Config } from '../../config/config-tokens';
import { SiteContextRoutesHandler } from '../services/site-context-routes-handler';
export declare function initializeContext(configInit: ConfigInitializerService, siteContextRoutesHandler: SiteContextRoutesHandler): () => Promise<Config>;
export declare const contextServiceProviders: Provider[];
