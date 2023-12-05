import { EventEmitter } from '@angular/core';
import { ICON_TYPE } from '../../../cms-components/misc/index';
import * as i0 from "@angular/core";
/**
 * Star rating component can be used to view existing ratings as well
 * as create new ratings. The component can be used for any ratings.
 */
export declare class StarRatingComponent {
    protected initialRate: number;
    icon: ICON_TYPE;
    /**
     * The rating component can be used in disabled mode,
     * so that the interaction is not provided.
     *
     * Defaults to true.
     */
    disabled: boolean;
    /**
     * The rating is used to color the rating stars. It can have a
     * precise number. The rating number is used for a CSS custom property
     * (AKA css variable) value. The actually coloring is done in CSS.
     */
    rating: number;
    /**
     * Emits the given rating when the user clicks on a star.
     */
    change: EventEmitter<number>;
    setRate(value: number): void;
    reset(): void;
    saveRate(rating: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StarRatingComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<StarRatingComponent, "cx-star-rating", never, { "disabled": "disabled"; "rating": "rating"; }, { "change": "change"; }, never, never, false, never>;
}
