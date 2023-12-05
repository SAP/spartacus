import { ExpressLoggerService } from './express-logger.service';
import { PrerenderingLoggerService } from './prerendering-logger.service';
export declare const serverLoggerServiceFactory: () => ExpressLoggerService | PrerenderingLoggerService;
