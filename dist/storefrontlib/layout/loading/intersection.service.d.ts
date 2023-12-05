import { Observable } from 'rxjs';
import { LayoutConfig } from '../config/layout-config';
import { IntersectionOptions } from './intersection.model';
import * as i0 from "@angular/core";
export type IntersectingCondition = (entry: IntersectionObserverEntry) => boolean;
/**
 * The IntersectionService uses the native IntersectionObserver (v2), which
 * can be used to implement pre-loading and deferred loading of DOM content.
 *
 */
export declare class IntersectionService {
    protected config: LayoutConfig;
    constructor(config: LayoutConfig);
    /**
     * Returns an Observable that emits only once a boolean value whenever
     * the given element has shown in the view port.
     *
     * The returned observable will only emit the first value. The
     * observable must be cleaned up either way, since the value might never emit; it
     * depends on whether the element appears in the view port.
     *
     * @param element - HTML element
     * @param options - Allows to specify an optional root margin, in order to fire before the element shows up in the viewport
     * @param intersectingCondition - Allows to specify an intersecting condition.
     * If this parameter is not set, then the transition state of the element will be verified whenever the element intersects the view port.
     * @returns Element intersects?
     */
    isIntersected(element: HTMLElement, options?: IntersectionOptions, intersectingCondition?: IntersectingCondition): Observable<boolean>;
    /**
     * Returns an observable that emits for every change of intersection of a given element.
     *
     * @param element - HTML element
     * @param options - Allows to specify an optional root margin, in order to fire before the element shows up in the viewport
     * @param intersectingCondition - Allows to specify an intersecting condition.
     * If this parameter is not set, then the transition state of the element will be verified whenever the element intersects the view port.
     * @returns Element intersects?
     */
    isIntersecting(element: HTMLElement, options?: IntersectionOptions, intersectingCondition?: IntersectingCondition): Observable<boolean>;
    /**
     * Indicates whenever the element intersects the view port. An optional margin
     * is used to intersects before the element shows up in the viewport.
     * A value is emitted each time the element intersects.
     */
    private intersects;
    private createIntersectionObservable;
    private getRootMargin;
    static ɵfac: i0.ɵɵFactoryDeclaration<IntersectionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<IntersectionService>;
}
