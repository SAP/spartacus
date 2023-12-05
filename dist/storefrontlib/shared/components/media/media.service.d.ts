import { Config, Image } from '@spartacus/core';
import { ImageLoadingStrategy, Media, MediaContainer, MediaFormatSize } from './media.model';
import * as i0 from "@angular/core";
/**
 * Service which generates media URLs. It leverage the MediaContainer and MediaFormats so
 * that URLs and sizes are generated for the same media. This helps to improve performance
 * across difference devices and layouts.
 *
 * Media formats are optional, but highly recommended. The format will help the browser to
 * identify the right media for the right experience.
 *
 * The MediaService will generate absolute URLs in case relative URLs are provided for the Media.
 * The baseUrl is read from the `occConfig.backend.media.baseUrl` or
 * `occConfig.backend.occ.baseUrl`.
 */
export declare class MediaService {
    protected config: Config;
    /**
     * The media formats sorted by size. The media format representing the smallest
     * size is sorted on top.
     */
    private _sortedFormats;
    private _reversedFormats;
    constructor(config: Config);
    /**
     * Returns a `Media` object with the main media (`src`) and various media (`src`)
     * for specific formats.
     */
    getMedia(mediaContainer?: MediaContainer | Image, format?: string, alt?: string, role?: string): Media | undefined;
    /**
     * Reads the loading strategy from the `MediaConfig`.
     *
     * Defaults to `ImageLoadingStrategy.EAGER`.
     */
    get loadingStrategy(): ImageLoadingStrategy;
    /**
     * Creates the media formats in a logical sorted order. The map contains the
     * format key and the format size information. We do this only once for performance
     * benefits.
     */
    protected get sortedFormats(): {
        code: string;
        size: MediaFormatSize;
    }[];
    /**
     * Creates the media formats in a reversed sorted order.
     */
    protected get reversedFormats(): {
        code: string;
        size: MediaFormatSize;
    }[];
    /**
     * Resolves the right media for the given format. The fo
     */
    protected resolveMedia(media: MediaContainer, format?: string): Image;
    /**
     * Validates the format against the given mediaContainer. If there is no format available,
     * or if the mediaContainer doesn't contain a media for the given media, the most optimal
     * format is resolved. If even that is not possible, the first format is returned.
     */
    protected resolveFormat(mediaContainer: MediaContainer, format?: string): string;
    /**
     * Returns the media format code with the best size.
     */
    protected resolveBestFormat(media: MediaContainer | Image): string | undefined;
    /**
     * Returns a set of media for the available media formats. Additionally, the configured media
     * format width is added to the srcset, so that browsers can select the appropriate media.
     *
     * The optional maxFormat indicates that only sources till a certain format should be added
     * to the srcset.
     */
    protected resolveSrcSet(media: MediaContainer | Image, maxFormat?: string): string | undefined;
    /**
     * Resolves the absolute URL for the given url. In most cases, this URL represents
     * the relative URL on the backend. In that case, we prefix the url with the baseUrl.
     *
     * When we have receive an absolute URL, we return the URL as-is. An absolute URL might also
     * start with double slash, which is used to resolve media cross from http and https.
     */
    protected resolveAbsoluteUrl(url: string): string;
    /**
     * The base URL is either driven by a specific `backend.media.baseUrl`, or by the
     * `backend.occ.baseUrl`.
     *
     * The `backend.media.baseUrl` can be used to load media from a different location.
     *
     * In Commerce Cloud, a different location could mean a different "aspect".
     *
     * Defaults to empty string in case no config is provided.
     */
    protected getBaseUrl(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<MediaService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MediaService>;
}
