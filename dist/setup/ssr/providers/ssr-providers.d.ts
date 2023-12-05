import { StaticProvider } from '@angular/core';
import { ServerOptions } from './model';
/**
 * Returns the providers used for SSR and pre-rendering processes.
 */
export declare function provideServer(options?: ServerOptions): StaticProvider[];
/**
 * Returns Spartacus providers to be passed to the Angular express engine (in SSR)
 *
 * @param options
 */
export declare function getServerRequestProviders(): StaticProvider[];
