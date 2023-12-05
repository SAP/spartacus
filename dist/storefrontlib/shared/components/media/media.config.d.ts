import { ImageLoadingStrategy, MediaFormatSize } from './media.model';
import * as i0 from "@angular/core";
/**
 * Provides configuration specific to Media, such as images. This is used to optimize
 * rendering of the media, SEO and performance.
 */
export declare abstract class MediaConfig {
    /**
     * Media _format_ configuration holds the size of the media's assigned to
     * a format.
     */
    mediaFormats?: {
        /**
         * Represents the media format code, that is the key to distinguish different
         * media in a container.
         */
        [format: string]: MediaFormatSize;
    };
    /**
     * Indicates how the browser should load the image. There's only one
     * global strategy for all media cross media in Spartacus.
     *
     * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img for more
     * information.
     *
     * If the `lazy` strategy is in place, the `loading="lazy"` attribute is added to the
     * img element.
     */
    imageLoadingStrategy?: ImageLoadingStrategy;
    static ɵfac: i0.ɵɵFactoryDeclaration<MediaConfig, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MediaConfig>;
}
declare module '@spartacus/core' {
    interface Config extends MediaConfig {
    }
}
