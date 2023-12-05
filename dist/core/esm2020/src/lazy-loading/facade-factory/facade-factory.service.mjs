/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { EMPTY, isObservable, throwError, } from 'rxjs';
import { delay, map, publishReplay, shareReplay, switchMap, } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../feature-modules.service";
const PROXY_FACADE_INSTANCE_PROP = 'proxyFacadeInstance';
/**
 * Service that can create proxy facade, which is a service that will expose
 * methods and properties from a facade implemented in the lazy loaded module.
 *
 * Returned proxy facade will lazy load the feature and facade implementation
 * at first method call or when first property observable will be subscribed.
 */
export class FacadeFactoryService {
    constructor(featureModules, injector) {
        this.featureModules = featureModules;
        this.injector = injector;
    }
    getResolver(feature, facadeClass, async = false) {
        if (!this.featureModules.isConfigured(feature)) {
            return throwError(new Error(`Feature ${feature} is not configured properly`));
        }
        let facadeService$ = this.featureModules.resolveFeature(feature).pipe(map((moduleRef) => moduleRef.injector), map((injector) => injector.get(facadeClass)));
        if (async) {
            facadeService$ = facadeService$.pipe(delay(0));
        }
        return facadeService$.pipe(shareReplay());
    }
    /**
     * Calls a method on a facade
     *
     * Method should either return an observable or void. Any other return type
     * than observable is ignored.
     *
     * @param resolver$
     * @param method
     * @param args
     * @protected
     */
    call(resolver$, method, args) {
        const callResult$ = resolver$.pipe(map((service) => service[method](...args)), publishReplay());
        callResult$.connect();
        return callResult$.pipe(switchMap((result) => {
            if (isObservable(result)) {
                return result;
            }
            return EMPTY;
        }));
    }
    /**
     * Get the property value from the facade
     *
     * Property has to be an aobservable
     *
     * @param resolver$
     * @param property
     * @protected
     */
    get(resolver$, property) {
        return resolver$.pipe(switchMap((service) => service[property]));
    }
    create({ facade, feature, methods, properties, async, }) {
        const resolver$ = this.getResolver(feature, facade, async);
        const result = new (class extends facade {
        })();
        (methods ?? []).forEach((method) => {
            result[method] = (...args) => this.call(resolver$, method, args);
        });
        (properties ?? []).forEach((property) => {
            result[property] = this.get(resolver$, property);
        });
        result[PROXY_FACADE_INSTANCE_PROP] = true;
        return result;
    }
    /**
     * isProxyFacadeInstance tests if the provided facade is labeled as a proxy instance.
     * Facade proxy instances contain an object key to label them as such.
     * @param facade The facade object to evaluate
     */
    isProxyFacadeInstance(facade) {
        return !!facade?.[PROXY_FACADE_INSTANCE_PROP];
    }
}
FacadeFactoryService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FacadeFactoryService, deps: [{ token: i1.FeatureModulesService }, { token: i0.Injector }], target: i0.ɵɵFactoryTarget.Injectable });
FacadeFactoryService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FacadeFactoryService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FacadeFactoryService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.FeatureModulesService }, { type: i0.Injector }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjYWRlLWZhY3Rvcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvc3JjL2xhenktbG9hZGluZy9mYWNhZGUtZmFjdG9yeS9mYWNhZGUtZmFjdG9yeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQWdCLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBRUwsS0FBSyxFQUNMLFlBQVksRUFFWixVQUFVLEdBQ1gsTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQ0wsS0FBSyxFQUNMLEdBQUcsRUFDSCxhQUFhLEVBQ2IsV0FBVyxFQUNYLFNBQVMsR0FDVixNQUFNLGdCQUFnQixDQUFDOzs7QUFJeEIsTUFBTSwwQkFBMEIsR0FBRyxxQkFBcUIsQ0FBQztBQUV6RDs7Ozs7O0dBTUc7QUFJSCxNQUFNLE9BQU8sb0JBQW9CO0lBQy9CLFlBQ1ksY0FBcUMsRUFDckMsUUFBa0I7UUFEbEIsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBQ3JDLGFBQVEsR0FBUixRQUFRLENBQVU7SUFDM0IsQ0FBQztJQUVNLFdBQVcsQ0FDbkIsT0FBZSxFQUNmLFdBQTRCLEVBQzVCLEtBQUssR0FBRyxLQUFLO1FBRWIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzlDLE9BQU8sVUFBVSxDQUNmLElBQUksS0FBSyxDQUFDLFdBQVcsT0FBTyw2QkFBNkIsQ0FBQyxDQUMzRCxDQUFDO1NBQ0g7UUFFRCxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ25FLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUN0QyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FDN0MsQ0FBQztRQUNGLElBQUksS0FBSyxFQUFFO1lBQ1QsY0FBYyxHQUFHLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNPLElBQUksQ0FDWixTQUEwQixFQUMxQixNQUFjLEVBQ2QsSUFBZTtRQUVmLE1BQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQ2hDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFDMUMsYUFBYSxFQUFFLENBQ2hCLENBQUM7UUFDRCxXQUEwQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRXRELE9BQU8sV0FBVyxDQUFDLElBQUksQ0FDckIsU0FBUyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbkIsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3hCLE9BQU8sTUFBTSxDQUFDO2FBQ2Y7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDTyxHQUFHLENBQ1gsU0FBMEIsRUFDMUIsUUFBZ0I7UUFFaEIsT0FBTyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsTUFBTSxDQUFtQixFQUN2QixNQUFNLEVBQ04sT0FBTyxFQUNQLE9BQU8sRUFDUCxVQUFVLEVBQ1YsS0FBSyxHQUNlO1FBQ3BCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUUzRCxNQUFNLE1BQU0sR0FBUSxJQUFJLENBQUMsS0FBTSxTQUFTLE1BQWM7U0FBRyxDQUFDLEVBQUUsQ0FBQztRQUM3RCxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNqQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFLENBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN0QyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsUUFBa0IsQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBRTFDLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gscUJBQXFCLENBQUMsTUFBVztRQUMvQixPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ2hELENBQUM7O2lIQXpHVSxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZuQixNQUFNOzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBYnN0cmFjdFR5cGUsIEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBDb25uZWN0YWJsZU9ic2VydmFibGUsXG4gIEVNUFRZLFxuICBpc09ic2VydmFibGUsXG4gIE9ic2VydmFibGUsXG4gIHRocm93RXJyb3IsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVsYXksXG4gIG1hcCxcbiAgcHVibGlzaFJlcGxheSxcbiAgc2hhcmVSZXBsYXksXG4gIHN3aXRjaE1hcCxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRmVhdHVyZU1vZHVsZXNTZXJ2aWNlIH0gZnJvbSAnLi4vZmVhdHVyZS1tb2R1bGVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmFjYWRlRGVzY3JpcHRvciB9IGZyb20gJy4vZmFjYWRlLWRlc2NyaXB0b3InO1xuXG5jb25zdCBQUk9YWV9GQUNBREVfSU5TVEFOQ0VfUFJPUCA9ICdwcm94eUZhY2FkZUluc3RhbmNlJztcblxuLyoqXG4gKiBTZXJ2aWNlIHRoYXQgY2FuIGNyZWF0ZSBwcm94eSBmYWNhZGUsIHdoaWNoIGlzIGEgc2VydmljZSB0aGF0IHdpbGwgZXhwb3NlXG4gKiBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGZyb20gYSBmYWNhZGUgaW1wbGVtZW50ZWQgaW4gdGhlIGxhenkgbG9hZGVkIG1vZHVsZS5cbiAqXG4gKiBSZXR1cm5lZCBwcm94eSBmYWNhZGUgd2lsbCBsYXp5IGxvYWQgdGhlIGZlYXR1cmUgYW5kIGZhY2FkZSBpbXBsZW1lbnRhdGlvblxuICogYXQgZmlyc3QgbWV0aG9kIGNhbGwgb3Igd2hlbiBmaXJzdCBwcm9wZXJ0eSBvYnNlcnZhYmxlIHdpbGwgYmUgc3Vic2NyaWJlZC5cbiAqL1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEZhY2FkZUZhY3RvcnlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGZlYXR1cmVNb2R1bGVzOiBGZWF0dXJlTW9kdWxlc1NlcnZpY2UsXG4gICAgcHJvdGVjdGVkIGluamVjdG9yOiBJbmplY3RvclxuICApIHt9XG5cbiAgcHJvdGVjdGVkIGdldFJlc29sdmVyPFQ+KFxuICAgIGZlYXR1cmU6IHN0cmluZyxcbiAgICBmYWNhZGVDbGFzczogQWJzdHJhY3RUeXBlPFQ+LFxuICAgIGFzeW5jID0gZmFsc2VcbiAgKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgaWYgKCF0aGlzLmZlYXR1cmVNb2R1bGVzLmlzQ29uZmlndXJlZChmZWF0dXJlKSkge1xuICAgICAgcmV0dXJuIHRocm93RXJyb3IoXG4gICAgICAgIG5ldyBFcnJvcihgRmVhdHVyZSAke2ZlYXR1cmV9IGlzIG5vdCBjb25maWd1cmVkIHByb3Blcmx5YClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGZhY2FkZVNlcnZpY2UkID0gdGhpcy5mZWF0dXJlTW9kdWxlcy5yZXNvbHZlRmVhdHVyZShmZWF0dXJlKS5waXBlKFxuICAgICAgbWFwKChtb2R1bGVSZWYpID0+IG1vZHVsZVJlZi5pbmplY3RvciksXG4gICAgICBtYXAoKGluamVjdG9yKSA9PiBpbmplY3Rvci5nZXQoZmFjYWRlQ2xhc3MpKVxuICAgICk7XG4gICAgaWYgKGFzeW5jKSB7XG4gICAgICBmYWNhZGVTZXJ2aWNlJCA9IGZhY2FkZVNlcnZpY2UkLnBpcGUoZGVsYXkoMCkpO1xuICAgIH1cbiAgICByZXR1cm4gZmFjYWRlU2VydmljZSQucGlwZShzaGFyZVJlcGxheSgpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxscyBhIG1ldGhvZCBvbiBhIGZhY2FkZVxuICAgKlxuICAgKiBNZXRob2Qgc2hvdWxkIGVpdGhlciByZXR1cm4gYW4gb2JzZXJ2YWJsZSBvciB2b2lkLiBBbnkgb3RoZXIgcmV0dXJuIHR5cGVcbiAgICogdGhhbiBvYnNlcnZhYmxlIGlzIGlnbm9yZWQuXG4gICAqXG4gICAqIEBwYXJhbSByZXNvbHZlciRcbiAgICogQHBhcmFtIG1ldGhvZFxuICAgKiBAcGFyYW0gYXJnc1xuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgY2FsbChcbiAgICByZXNvbHZlciQ6IE9ic2VydmFibGU8YW55PixcbiAgICBtZXRob2Q6IHN0cmluZyxcbiAgICBhcmdzOiB1bmtub3duW11cbiAgKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgY29uc3QgY2FsbFJlc3VsdCQgPSByZXNvbHZlciQucGlwZShcbiAgICAgIG1hcCgoc2VydmljZSkgPT4gc2VydmljZVttZXRob2RdKC4uLmFyZ3MpKSxcbiAgICAgIHB1Ymxpc2hSZXBsYXkoKVxuICAgICk7XG4gICAgKGNhbGxSZXN1bHQkIGFzIENvbm5lY3RhYmxlT2JzZXJ2YWJsZTxhbnk+KS5jb25uZWN0KCk7XG5cbiAgICByZXR1cm4gY2FsbFJlc3VsdCQucGlwZShcbiAgICAgIHN3aXRjaE1hcCgocmVzdWx0KSA9PiB7XG4gICAgICAgIGlmIChpc09ic2VydmFibGUocmVzdWx0KSkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgcHJvcGVydHkgdmFsdWUgZnJvbSB0aGUgZmFjYWRlXG4gICAqXG4gICAqIFByb3BlcnR5IGhhcyB0byBiZSBhbiBhb2JzZXJ2YWJsZVxuICAgKlxuICAgKiBAcGFyYW0gcmVzb2x2ZXIkXG4gICAqIEBwYXJhbSBwcm9wZXJ0eVxuICAgKiBAcHJvdGVjdGVkXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0KFxuICAgIHJlc29sdmVyJDogT2JzZXJ2YWJsZTxhbnk+LFxuICAgIHByb3BlcnR5OiBzdHJpbmdcbiAgKTogT2JzZXJ2YWJsZTx1bmtub3duPiB7XG4gICAgcmV0dXJuIHJlc29sdmVyJC5waXBlKHN3aXRjaE1hcCgoc2VydmljZSkgPT4gc2VydmljZVtwcm9wZXJ0eV0pKTtcbiAgfVxuXG4gIGNyZWF0ZTxUIGV4dGVuZHMgb2JqZWN0Pih7XG4gICAgZmFjYWRlLFxuICAgIGZlYXR1cmUsXG4gICAgbWV0aG9kcyxcbiAgICBwcm9wZXJ0aWVzLFxuICAgIGFzeW5jLFxuICB9OiBGYWNhZGVEZXNjcmlwdG9yPFQ+KTogVCB7XG4gICAgY29uc3QgcmVzb2x2ZXIkID0gdGhpcy5nZXRSZXNvbHZlcihmZWF0dXJlLCBmYWNhZGUsIGFzeW5jKTtcblxuICAgIGNvbnN0IHJlc3VsdDogYW55ID0gbmV3IChjbGFzcyBleHRlbmRzIChmYWNhZGUgYXMgYW55KSB7fSkoKTtcbiAgICAobWV0aG9kcyA/PyBbXSkuZm9yRWFjaCgobWV0aG9kKSA9PiB7XG4gICAgICByZXN1bHRbbWV0aG9kXSA9ICguLi5hcmdzOiBhbnlbXSkgPT5cbiAgICAgICAgdGhpcy5jYWxsKHJlc29sdmVyJCwgbWV0aG9kIGFzIHN0cmluZywgYXJncyk7XG4gICAgfSk7XG4gICAgKHByb3BlcnRpZXMgPz8gW10pLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XG4gICAgICByZXN1bHRbcHJvcGVydHldID0gdGhpcy5nZXQocmVzb2x2ZXIkLCBwcm9wZXJ0eSBhcyBzdHJpbmcpO1xuICAgIH0pO1xuXG4gICAgcmVzdWx0W1BST1hZX0ZBQ0FERV9JTlNUQU5DRV9QUk9QXSA9IHRydWU7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIGlzUHJveHlGYWNhZGVJbnN0YW5jZSB0ZXN0cyBpZiB0aGUgcHJvdmlkZWQgZmFjYWRlIGlzIGxhYmVsZWQgYXMgYSBwcm94eSBpbnN0YW5jZS5cbiAgICogRmFjYWRlIHByb3h5IGluc3RhbmNlcyBjb250YWluIGFuIG9iamVjdCBrZXkgdG8gbGFiZWwgdGhlbSBhcyBzdWNoLlxuICAgKiBAcGFyYW0gZmFjYWRlIFRoZSBmYWNhZGUgb2JqZWN0IHRvIGV2YWx1YXRlXG4gICAqL1xuICBpc1Byb3h5RmFjYWRlSW5zdGFuY2UoZmFjYWRlOiBhbnkpIHtcbiAgICByZXR1cm4gISFmYWNhZGU/LltQUk9YWV9GQUNBREVfSU5TVEFOQ0VfUFJPUF07XG4gIH1cbn1cbiJdfQ==