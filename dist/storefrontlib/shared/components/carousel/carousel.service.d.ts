import { WindowRef } from '@spartacus/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class CarouselService {
    private winRef;
    constructor(winRef: WindowRef);
    /**
     * The number of items per slide is calculated by the help of
     * the item width and the available width of the host element.
     * This appoach makes it possible to place the carousel in different
     * layouts. Instead of using the page breakpoints, the host size is
     * taken into account.
     *
     * Since there's no element resize API available, we use the
     * window `resize` event, so that we can adjust the number of items
     * whenever the window got resized.
     */
    getItemsPerSlide(nativeElement: HTMLElement, itemWidth: string): Observable<number>;
    /**
     * Calculates the number of items per given hostSize.  calculated based on the given
     * intended size in pixels or percentages. The
     *
     * @param availableWidth The available width in pixels for the carousel items.
     * @param itemWidth The width per carousel item, in px or percentage.
     */
    private calculateItems;
    static ɵfac: i0.ɵɵFactoryDeclaration<CarouselService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CarouselService>;
}
