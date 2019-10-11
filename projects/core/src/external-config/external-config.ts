import { SiteContextConfig } from '../site-context/config/site-context-config';

/**
 * An injection token to be provided before bootstrapping an Angular app.
 *
 * SHOULD NOT BE PROVIDED IN ANGULAR APPLICATION (only before bootstrap)!
 * Otherwise the value provided in app will shadow the value provided before Angular bootstrap.
 */
export abstract class ExternalConfig extends SiteContextConfig {}
