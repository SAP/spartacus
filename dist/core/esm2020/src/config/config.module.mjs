/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideConfig, provideConfigFactory } from './config-providers';
import * as i0 from "@angular/core";
import * as i1 from "./services/configuration.service";
export class ConfigModule {
    // To make sure ConfigurationService will be instantiated, we inject it into
    // module constructor
    constructor(_configurationService) {
        // Intentional empty constructor
    }
    /**
     * Import ConfigModule and contribute config to the global configuration
     *
     * To provide default configuration in libraries provideDefaultConfig should be used instead.
     *
     * @param config Config object to merge with the global configuration
     */
    static withConfig(config) {
        return {
            ngModule: ConfigModule,
            // eslint-disable-next-line @nrwl/nx/workspace/use-default-provide-config
            providers: [provideConfig(config)],
        };
    }
    /**
     * Import ConfigModule and contribute config to the global configuration using factory function
     *
     * To provide default configuration in libraries provideDefaultConfigFactory should be used instead.
     *
     * @param configFactory Factory function that will generate configuration
     * @param deps Optional dependencies to factory function
     */
    static withConfigFactory(configFactory, deps) {
        return {
            ngModule: ConfigModule,
            providers: [provideConfigFactory(configFactory, deps)],
        };
    }
    /**
     * Module with providers, should be imported only once, if possible, at the root of the app.
     *
     * @param config
     */
    static forRoot(config = {}) {
        return {
            ngModule: ConfigModule,
            // eslint-disable-next-line @nrwl/nx/workspace/use-default-provide-config
            providers: [provideConfig(config)],
        };
    }
}
ConfigModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigModule, deps: [{ token: i1.ConfigurationService }], target: i0.ɵɵFactoryTarget.NgModule });
ConfigModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: ConfigModule });
ConfigModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ConfigModule, decorators: [{
            type: NgModule,
            args: [{}]
        }], ctorParameters: function () { return [{ type: i1.ConfigurationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2NvbmZpZy9jb25maWcubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQXVCLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsYUFBYSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUt6RSxNQUFNLE9BQU8sWUFBWTtJQUN2Qiw0RUFBNEU7SUFDNUUscUJBQXFCO0lBQ3JCLFlBQVkscUJBQTJDO1FBQ3JELGdDQUFnQztJQUNsQyxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0gsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFjO1FBQzlCLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0Qix5RUFBeUU7WUFDekUsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FDdEIsYUFBNEIsRUFDNUIsSUFBWTtRQUVaLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDdkQsQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFpQixFQUFFO1FBQ2hDLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0Qix5RUFBeUU7WUFDekUsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DLENBQUM7SUFDSixDQUFDOzt5R0FuRFUsWUFBWTswR0FBWixZQUFZOzBHQUFaLFlBQVk7MkZBQVosWUFBWTtrQkFEeEIsUUFBUTttQkFBQyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZ0ZhY3RvcnkgfSBmcm9tICcuL2NvbmZpZy1mYWN0b3J5JztcbmltcG9ydCB7IHByb3ZpZGVDb25maWcsIHByb3ZpZGVDb25maWdGYWN0b3J5IH0gZnJvbSAnLi9jb25maWctcHJvdmlkZXJzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vY29uZmlnLXRva2Vucyc7XG5pbXBvcnQgeyBDb25maWd1cmF0aW9uU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZmlndXJhdGlvbi5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIENvbmZpZ01vZHVsZSB7XG4gIC8vIFRvIG1ha2Ugc3VyZSBDb25maWd1cmF0aW9uU2VydmljZSB3aWxsIGJlIGluc3RhbnRpYXRlZCwgd2UgaW5qZWN0IGl0IGludG9cbiAgLy8gbW9kdWxlIGNvbnN0cnVjdG9yXG4gIGNvbnN0cnVjdG9yKF9jb25maWd1cmF0aW9uU2VydmljZTogQ29uZmlndXJhdGlvblNlcnZpY2UpIHtcbiAgICAvLyBJbnRlbnRpb25hbCBlbXB0eSBjb25zdHJ1Y3RvclxuICB9XG5cbiAgLyoqXG4gICAqIEltcG9ydCBDb25maWdNb2R1bGUgYW5kIGNvbnRyaWJ1dGUgY29uZmlnIHRvIHRoZSBnbG9iYWwgY29uZmlndXJhdGlvblxuICAgKlxuICAgKiBUbyBwcm92aWRlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBpbiBsaWJyYXJpZXMgcHJvdmlkZURlZmF1bHRDb25maWcgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZC5cbiAgICpcbiAgICogQHBhcmFtIGNvbmZpZyBDb25maWcgb2JqZWN0IHRvIG1lcmdlIHdpdGggdGhlIGdsb2JhbCBjb25maWd1cmF0aW9uXG4gICAqL1xuICBzdGF0aWMgd2l0aENvbmZpZyhjb25maWc6IENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q29uZmlnTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDb25maWdNb2R1bGUsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQG5yd2wvbngvd29ya3NwYWNlL3VzZS1kZWZhdWx0LXByb3ZpZGUtY29uZmlnXG4gICAgICBwcm92aWRlcnM6IFtwcm92aWRlQ29uZmlnKGNvbmZpZyldLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogSW1wb3J0IENvbmZpZ01vZHVsZSBhbmQgY29udHJpYnV0ZSBjb25maWcgdG8gdGhlIGdsb2JhbCBjb25maWd1cmF0aW9uIHVzaW5nIGZhY3RvcnkgZnVuY3Rpb25cbiAgICpcbiAgICogVG8gcHJvdmlkZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gaW4gbGlicmFyaWVzIHByb3ZpZGVEZWZhdWx0Q29uZmlnRmFjdG9yeSBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkLlxuICAgKlxuICAgKiBAcGFyYW0gY29uZmlnRmFjdG9yeSBGYWN0b3J5IGZ1bmN0aW9uIHRoYXQgd2lsbCBnZW5lcmF0ZSBjb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSBkZXBzIE9wdGlvbmFsIGRlcGVuZGVuY2llcyB0byBmYWN0b3J5IGZ1bmN0aW9uXG4gICAqL1xuICBzdGF0aWMgd2l0aENvbmZpZ0ZhY3RvcnkoXG4gICAgY29uZmlnRmFjdG9yeTogQ29uZmlnRmFjdG9yeSxcbiAgICBkZXBzPzogYW55W11cbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxDb25maWdNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IENvbmZpZ01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3Byb3ZpZGVDb25maWdGYWN0b3J5KGNvbmZpZ0ZhY3RvcnksIGRlcHMpXSxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIE1vZHVsZSB3aXRoIHByb3ZpZGVycywgc2hvdWxkIGJlIGltcG9ydGVkIG9ubHkgb25jZSwgaWYgcG9zc2libGUsIGF0IHRoZSByb290IG9mIHRoZSBhcHAuXG4gICAqXG4gICAqIEBwYXJhbSBjb25maWdcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQ29uZmlnID0ge30pOiBNb2R1bGVXaXRoUHJvdmlkZXJzPENvbmZpZ01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ29uZmlnTW9kdWxlLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBucndsL254L3dvcmtzcGFjZS91c2UtZGVmYXVsdC1wcm92aWRlLWNvbmZpZ1xuICAgICAgcHJvdmlkZXJzOiBbcHJvdmlkZUNvbmZpZyhjb25maWcpXSxcbiAgICB9O1xuICB9XG59XG4iXX0=