/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable, InjectionToken } from '@angular/core';
import { deepMerge } from './utils/deep-merge';
import * as i0 from "@angular/core";
export function configFactory() {
    return deepMerge({}, inject(DefaultConfig), inject(RootConfig));
}
/**
 * Global Configuration, can be used to inject configuration to any part of the app
 */
export class Config {
}
Config.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: Config, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
Config.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: Config, providedIn: 'root', useFactory: configFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: Config, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                    useFactory: configFactory,
                }]
        }] });
export function defaultConfigFactory() {
    return deepMerge({}, ...(inject(DefaultConfigChunk, { optional: true }) ?? []));
}
/**
 * Default Configuration token, used to build Global Configuration, built from DefaultConfigChunks
 */
export const DefaultConfig = new InjectionToken('DefaultConfiguration', {
    providedIn: 'root',
    factory: defaultConfigFactory,
});
export function rootConfigFactory() {
    return deepMerge({}, ...(inject(ConfigChunk, { optional: true }) ?? []));
}
/**
 * Root Configuration token, used to build Global Configuration, built from ConfigChunks
 */
export const RootConfig = new InjectionToken('RootConfiguration', {
    providedIn: 'root',
    factory: rootConfigFactory,
});
/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the global configuration object.
 * Should not be used directly, use `provideConfig` or import `ConfigModule.withConfig` instead.
 */
export const ConfigChunk = new InjectionToken('ConfigurationChunk');
/**
 * Config chunk token, can be used to provide configuration chunk and contribute to the default configuration.
 * Should not be used directly, use `provideDefaultConfig` or `provideDefaultConfigFactory` instead.
 *
 * General rule is, that all config provided in libraries should be provided as default config.
 */
export const DefaultConfigChunk = new InjectionToken('DefaultConfigurationChunk');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXRva2Vucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2NvbmZpZy9jb25maWctdG9rZW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztBQUUvQyxNQUFNLFVBQVUsYUFBYTtJQUMzQixPQUFPLFNBQVMsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFFRDs7R0FFRztBQUtILE1BQU0sT0FBZ0IsTUFBTTs7bUdBQU4sTUFBTTt1R0FBTixNQUFNLGNBSGQsTUFBTSxjQUNOLGFBQWE7MkZBRUwsTUFBTTtrQkFKM0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtvQkFDbEIsVUFBVSxFQUFFLGFBQWE7aUJBQzFCOztBQUdELE1BQU0sVUFBVSxvQkFBb0I7SUFDbEMsT0FBTyxTQUFTLENBQ2QsRUFBRSxFQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FDMUQsQ0FBQztBQUNKLENBQUM7QUFDRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxJQUFJLGNBQWMsQ0FBQyxzQkFBc0IsRUFBRTtJQUN0RSxVQUFVLEVBQUUsTUFBTTtJQUNsQixPQUFPLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILE1BQU0sVUFBVSxpQkFBaUI7SUFDL0IsT0FBTyxTQUFTLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxjQUFjLENBQUMsbUJBQW1CLEVBQUU7SUFDaEUsVUFBVSxFQUFFLE1BQU07SUFDbEIsT0FBTyxFQUFFLGlCQUFpQjtDQUMzQixDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDSCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsSUFBSSxjQUFjLENBQVcsb0JBQW9CLENBQUMsQ0FBQztBQUM5RTs7Ozs7R0FLRztBQUNILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLElBQUksY0FBYyxDQUNsRCwyQkFBMkIsQ0FDNUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IGluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRlZXBNZXJnZSB9IGZyb20gJy4vdXRpbHMvZGVlcC1tZXJnZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdGYWN0b3J5KCkge1xuICByZXR1cm4gZGVlcE1lcmdlKHt9LCBpbmplY3QoRGVmYXVsdENvbmZpZyksIGluamVjdChSb290Q29uZmlnKSk7XG59XG5cbi8qKlxuICogR2xvYmFsIENvbmZpZ3VyYXRpb24sIGNhbiBiZSB1c2VkIHRvIGluamVjdCBjb25maWd1cmF0aW9uIHRvIGFueSBwYXJ0IG9mIHRoZSBhcHBcbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG4gIHVzZUZhY3Rvcnk6IGNvbmZpZ0ZhY3RvcnksXG59KVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbmZpZyB7fVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdENvbmZpZ0ZhY3RvcnkoKSB7XG4gIHJldHVybiBkZWVwTWVyZ2UoXG4gICAge30sXG4gICAgLi4uKGluamVjdChEZWZhdWx0Q29uZmlnQ2h1bmssIHsgb3B0aW9uYWw6IHRydWUgfSkgPz8gW10pXG4gICk7XG59XG4vKipcbiAqIERlZmF1bHQgQ29uZmlndXJhdGlvbiB0b2tlbiwgdXNlZCB0byBidWlsZCBHbG9iYWwgQ29uZmlndXJhdGlvbiwgYnVpbHQgZnJvbSBEZWZhdWx0Q29uZmlnQ2h1bmtzXG4gKi9cbmV4cG9ydCBjb25zdCBEZWZhdWx0Q29uZmlnID0gbmV3IEluamVjdGlvblRva2VuKCdEZWZhdWx0Q29uZmlndXJhdGlvbicsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiBkZWZhdWx0Q29uZmlnRmFjdG9yeSxcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gcm9vdENvbmZpZ0ZhY3RvcnkoKSB7XG4gIHJldHVybiBkZWVwTWVyZ2Uoe30sIC4uLihpbmplY3QoQ29uZmlnQ2h1bmssIHsgb3B0aW9uYWw6IHRydWUgfSkgPz8gW10pKTtcbn1cblxuLyoqXG4gKiBSb290IENvbmZpZ3VyYXRpb24gdG9rZW4sIHVzZWQgdG8gYnVpbGQgR2xvYmFsIENvbmZpZ3VyYXRpb24sIGJ1aWx0IGZyb20gQ29uZmlnQ2h1bmtzXG4gKi9cbmV4cG9ydCBjb25zdCBSb290Q29uZmlnID0gbmV3IEluamVjdGlvblRva2VuKCdSb290Q29uZmlndXJhdGlvbicsIHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxuICBmYWN0b3J5OiByb290Q29uZmlnRmFjdG9yeSxcbn0pO1xuXG4vKipcbiAqIENvbmZpZyBjaHVuayB0b2tlbiwgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBjb25maWd1cmF0aW9uIGNodW5rIGFuZCBjb250cmlidXRlIHRvIHRoZSBnbG9iYWwgY29uZmlndXJhdGlvbiBvYmplY3QuXG4gKiBTaG91bGQgbm90IGJlIHVzZWQgZGlyZWN0bHksIHVzZSBgcHJvdmlkZUNvbmZpZ2Agb3IgaW1wb3J0IGBDb25maWdNb2R1bGUud2l0aENvbmZpZ2AgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNvbnN0IENvbmZpZ0NodW5rID0gbmV3IEluamVjdGlvblRva2VuPENvbmZpZ1tdPignQ29uZmlndXJhdGlvbkNodW5rJyk7XG4vKipcbiAqIENvbmZpZyBjaHVuayB0b2tlbiwgY2FuIGJlIHVzZWQgdG8gcHJvdmlkZSBjb25maWd1cmF0aW9uIGNodW5rIGFuZCBjb250cmlidXRlIHRvIHRoZSBkZWZhdWx0IGNvbmZpZ3VyYXRpb24uXG4gKiBTaG91bGQgbm90IGJlIHVzZWQgZGlyZWN0bHksIHVzZSBgcHJvdmlkZURlZmF1bHRDb25maWdgIG9yIGBwcm92aWRlRGVmYXVsdENvbmZpZ0ZhY3RvcnlgIGluc3RlYWQuXG4gKlxuICogR2VuZXJhbCBydWxlIGlzLCB0aGF0IGFsbCBjb25maWcgcHJvdmlkZWQgaW4gbGlicmFyaWVzIHNob3VsZCBiZSBwcm92aWRlZCBhcyBkZWZhdWx0IGNvbmZpZy5cbiAqL1xuZXhwb3J0IGNvbnN0IERlZmF1bHRDb25maWdDaHVuayA9IG5ldyBJbmplY3Rpb25Ub2tlbjxDb25maWdbXT4oXG4gICdEZWZhdWx0Q29uZmlndXJhdGlvbkNodW5rJ1xuKTtcbiJdfQ==