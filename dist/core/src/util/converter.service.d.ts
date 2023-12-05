import { InjectionToken, OnDestroy } from '@angular/core';
import { OperatorFunction, Subscription } from 'rxjs';
import { UnifiedInjector } from '../lazy-loading/unified-injector';
import * as i0 from "@angular/core";
/**
 * Converter is used to convert source data model to target data model.
 * By convention, we distinguish two flows:
 *   - *Normalize* is the conversion from backend models to UI models
 *   - *Serialize* is the conversion of UI models to backend models (in case of submitting data to the backend).
 *
 * Converters can be stacked together to to apply decoupled customizations
 */
export interface Converter<SOURCE, TARGET> {
    /**
     * Convert converts source model to target model. Can use optional target parameter,
     * used in case of stacking multiple converters (for example, to implement populator pattern).
     *
     * @param source Source data model
     * @param target Optional, partially converted target model
     */
    convert(source: SOURCE, target?: TARGET): TARGET;
}
export declare class ConverterService implements OnDestroy {
    protected unifiedInjector: UnifiedInjector;
    protected subscriptions: Subscription;
    constructor(unifiedInjector: UnifiedInjector);
    private converters;
    private getConverters;
    /**
     * Will return true if converters for specified token were provided
     */
    hasConverters<S, T>(injectionToken: InjectionToken<Converter<S, T>>): boolean;
    /**
     * Pipeable operator to apply converter logic in a observable stream
     */
    pipeable<S, T>(injectionToken: InjectionToken<Converter<S, T>>): OperatorFunction<S, T>;
    /**
     * Pipeable operator to apply converter logic in a observable stream to collection of items
     */
    pipeableMany<S, T>(injectionToken: InjectionToken<Converter<S, T>>): OperatorFunction<S[], T[]>;
    /**
     * Apply converter logic specified by injection token to source data
     */
    convert<S, T>(source: S, injectionToken: InjectionToken<Converter<S, T>>): T;
    /**
     * Apply converter logic specified by injection token to a collection
     */
    convertMany<S, T>(sources: S[], injectionToken: InjectionToken<Converter<S, T>>): T[];
    private convertSource;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ConverterService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ConverterService>;
}
