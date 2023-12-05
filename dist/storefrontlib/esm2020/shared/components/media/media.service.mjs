/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { ImageLoadingStrategy, } from './media.model';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
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
export class MediaService {
    constructor(config) {
        this.config = config;
    }
    /**
     * Returns a `Media` object with the main media (`src`) and various media (`src`)
     * for specific formats.
     */
    getMedia(mediaContainer, format, alt, role) {
        if (!mediaContainer) {
            return;
        }
        const mainMedia = mediaContainer.url
            ? mediaContainer
            : this.resolveMedia(mediaContainer, format);
        return {
            src: this.resolveAbsoluteUrl(mainMedia?.url ?? ''),
            alt: alt ?? mainMedia?.altText,
            role: role ?? mainMedia?.role,
            srcset: this.resolveSrcSet(mediaContainer, format),
        };
    }
    /**
     * Reads the loading strategy from the `MediaConfig`.
     *
     * Defaults to `ImageLoadingStrategy.EAGER`.
     */
    get loadingStrategy() {
        return (this.config?.imageLoadingStrategy ??
            ImageLoadingStrategy.EAGER);
    }
    /**
     * Creates the media formats in a logical sorted order. The map contains the
     * format key and the format size information. We do this only once for performance
     * benefits.
     */
    get sortedFormats() {
        const mediaFormats = this.config?.mediaFormats;
        if (!this._sortedFormats && mediaFormats) {
            this._sortedFormats = Object.keys(mediaFormats)
                .map((key) => ({
                code: key,
                size: mediaFormats[key],
            }))
                .sort((a, b) => a.size.width && b.size.width && a.size.width > b.size.width ? 1 : -1);
        }
        return this._sortedFormats ?? [];
    }
    /**
     * Creates the media formats in a reversed sorted order.
     */
    get reversedFormats() {
        if (!this._reversedFormats) {
            this._reversedFormats = this.sortedFormats.slice().reverse();
        }
        return this._reversedFormats;
    }
    /**
     * Resolves the right media for the given format. The fo
     */
    resolveMedia(media, format) {
        return media[this.resolveFormat(media, format)];
    }
    /**
     * Validates the format against the given mediaContainer. If there is no format available,
     * or if the mediaContainer doesn't contain a media for the given media, the most optimal
     * format is resolved. If even that is not possible, the first format is returned.
     */
    resolveFormat(mediaContainer, format) {
        if (format && mediaContainer[format]) {
            return format;
        }
        return (this.resolveBestFormat(mediaContainer) || Object.keys(mediaContainer)[0]);
    }
    /**
     * Returns the media format code with the best size.
     */
    resolveBestFormat(media) {
        return this.reversedFormats.find((format) => media.hasOwnProperty(format.code))?.code;
    }
    /**
     * Returns a set of media for the available media formats. Additionally, the configured media
     * format width is added to the srcset, so that browsers can select the appropriate media.
     *
     * The optional maxFormat indicates that only sources till a certain format should be added
     * to the srcset.
     */
    resolveSrcSet(media, maxFormat) {
        if (!media) {
            return undefined;
        }
        // Only create srcset images that are smaller than the given `maxFormat` (if any)
        let formats = this.sortedFormats;
        const max = formats.findIndex((f) => f.code === maxFormat);
        if (max > -1) {
            formats = formats.slice(0, max + 1);
        }
        const srcset = formats.reduce((set, format) => {
            const image = media[format.code];
            if (!!image) {
                if (set) {
                    set += ', ';
                }
                set += `${this.resolveAbsoluteUrl(image.url ?? '')} ${format.size.width}w`;
            }
            return set;
        }, '');
        return srcset === '' ? undefined : srcset;
    }
    /**
     * Resolves the absolute URL for the given url. In most cases, this URL represents
     * the relative URL on the backend. In that case, we prefix the url with the baseUrl.
     *
     * When we have receive an absolute URL, we return the URL as-is. An absolute URL might also
     * start with double slash, which is used to resolve media cross from http and https.
     */
    resolveAbsoluteUrl(url) {
        return !url || url.startsWith('http') || url.startsWith('//')
            ? url
            : this.getBaseUrl() + url;
    }
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
    getBaseUrl() {
        return (this.config.backend?.media?.baseUrl ??
            this.config.backend?.occ?.baseUrl ??
            '');
    }
}
MediaService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MediaService, deps: [{ token: i1.Config }], target: i0.ɵɵFactoryTarget.Injectable });
MediaService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MediaService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MediaService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Config }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL2NvbXBvbmVudHMvbWVkaWEvbWVkaWEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQ0wsb0JBQW9CLEdBSXJCLE1BQU0sZUFBZSxDQUFDOzs7QUFFdkI7Ozs7Ozs7Ozs7O0dBV0c7QUFJSCxNQUFNLE9BQU8sWUFBWTtJQVF2QixZQUFzQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFFeEM7OztPQUdHO0lBQ0gsUUFBUSxDQUNOLGNBQXVDLEVBQ3ZDLE1BQWUsRUFDZixHQUFZLEVBQ1osSUFBYTtRQUViLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBRUQsTUFBTSxTQUFTLEdBQVUsY0FBYyxDQUFDLEdBQUc7WUFDekMsQ0FBQyxDQUFDLGNBQWM7WUFDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBZ0MsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoRSxPQUFPO1lBQ0wsR0FBRyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLEVBQUUsR0FBRyxJQUFJLEVBQUUsQ0FBQztZQUNsRCxHQUFHLEVBQUUsR0FBRyxJQUFJLFNBQVMsRUFBRSxPQUFPO1lBQzlCLElBQUksRUFBRSxJQUFJLElBQUksU0FBUyxFQUFFLElBQUk7WUFDN0IsTUFBTSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQztTQUNuRCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxJQUFJLGVBQWU7UUFDakIsT0FBTyxDQUNKLElBQUksQ0FBQyxNQUFzQixFQUFFLG9CQUFvQjtZ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IFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZywgSW1hZ2UgfSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgTWVkaWFDb25maWcgfSBmcm9tICcuL21lZGlhLmNvbmZpZyc7XG5pbXBvcnQge1xuICBJbWFnZUxvYWRpbmdTdHJhdGVneSxcbiAgTWVkaWEsXG4gIE1lZGlhQ29udGFpbmVyLFxuICBNZWRpYUZvcm1hdFNpemUsXG59IGZyb20gJy4vbWVkaWEubW9kZWwnO1xuXG4vKipcbiAqIFNlcnZpY2Ugd2hpY2ggZ2VuZXJhdGVzIG1lZGlhIFVSTHMuIEl0IGxldmVyYWdlIHRoZSBNZWRpYUNvbnRhaW5lciBhbmQgTWVkaWFGb3JtYXRzIHNvXG4gKiB0aGF0IFVSTHMgYW5kIHNpemVzIGFyZSBnZW5lcmF0ZWQgZm9yIHRoZSBzYW1lIG1lZGlhLiBUaGlzIGhlbHBzIHRvIGltcHJvdmUgcGVyZm9ybWFuY2VcbiAqIGFjcm9zcyBkaWZmZXJlbmNlIGRldmljZXMgYW5kIGxheW91dHMuXG4gKlxuICogTWVkaWEgZm9ybWF0cyBhcmUgb3B0aW9uYWwsIGJ1dCBoaWdobHkgcmVjb21tZW5kZWQuIFRoZSBmb3JtYXQgd2lsbCBoZWxwIHRoZSBicm93c2VyIHRvXG4gKiBpZGVudGlmeSB0aGUgcmlnaHQgbWVkaWEgZm9yIHRoZSByaWdodCBleHBlcmllbmNlLlxuICpcbiAqIFRoZSBNZWRpYVNlcnZpY2Ugd2lsbCBnZW5lcmF0ZSBhYnNvbHV0ZSBVUkxzIGluIGNhc2UgcmVsYXRpdmUgVVJMcyBhcmUgcHJvdmlkZWQgZm9yIHRoZSBNZWRpYS5cbiAqIFRoZSBiYXNlVXJsIGlzIHJlYWQgZnJvbSB0aGUgYG9jY0NvbmZpZy5iYWNrZW5kLm1lZGlhLmJhc2VVcmxgIG9yXG4gKiBgb2NjQ29uZmlnLmJhY2tlbmQub2NjLmJhc2VVcmxgLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWVkaWFTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFRoZSBtZWRpYSBmb3JtYXRzIHNvcnRlZCBieSBzaXplLiBUaGUgbWVkaWEgZm9ybWF0IHJlcHJlc2VudGluZyB0aGUgc21hbGxlc3RcbiAgICogc2l6ZSBpcyBzb3J0ZWQgb24gdG9wLlxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydGVkRm9ybWF0czogeyBjb2RlOiBzdHJpbmc7IHNpemU6IE1lZGlhRm9ybWF0U2l6ZSB9W107XG4gIHByaXZhdGUgX3JldmVyc2VkRm9ybWF0czogeyBjb2RlOiBzdHJpbmc7IHNpemU6IE1lZGlhRm9ybWF0U2l6ZSB9W107XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGNvbmZpZzogQ29uZmlnKSB7fVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgYE1lZGlhYCBvYmplY3Qgd2l0aCB0aGUgbWFpbiBtZWRpYSAoYHNyY2ApIGFuZCB2YXJpb3VzIG1lZGlhIChgc3JjYClcbiAgICogZm9yIHNwZWNpZmljIGZvcm1hdHMuXG4gICAqL1xuICBnZXRNZWRpYShcbiAgICBtZWRpYUNvbnRhaW5lcj86IE1lZGlhQ29udGFpbmVyIHwgSW1hZ2UsXG4gICAgZm9ybWF0Pzogc3RyaW5nLFxuICAgIGFsdD86IHN0cmluZyxcbiAgICByb2xlPzogc3RyaW5nXG4gICk6IE1lZGlhIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAoIW1lZGlhQ29udGFpbmVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWFpbk1lZGlhOiBJbWFnZSA9IG1lZGlhQ29udGFpbmVyLnVybFxuICAgICAgPyBtZWRpYUNvbnRhaW5lclxuICAgICAgOiB0aGlzLnJlc29sdmVNZWRpYShtZWRpYUNvbnRhaW5lciBhcyBNZWRpYUNvbnRhaW5lciwgZm9ybWF0KTtcblxuICAgIHJldHVybiB7XG4gICAgICBzcmM6IHRoaXMucmVzb2x2ZUFic29sdXRlVXJsKG1haW5NZWRpYT8udXJsID8/ICcnKSxcbiAgICAgIGFsdDogYWx0ID8/IG1haW5NZWRpYT8uYWx0VGV4dCxcbiAgICAgIHJvbGU6IHJvbGUgPz8gbWFpbk1lZGlhPy5yb2xlLFxuICAgICAgc3Jjc2V0OiB0aGlzLnJlc29sdmVTcmNTZXQobWVkaWFDb250YWluZXIsIGZvcm1hdCksXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWFkcyB0aGUgbG9hZGluZyBzdHJhdGVneSBmcm9tIHRoZSBgTWVkaWFDb25maWdgLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byBgSW1hZ2VMb2FkaW5nU3RyYXRlZ3kuRUFHRVJgLlxuICAgKi9cbiAgZ2V0IGxvYWRpbmdTdHJhdGVneSgpOiBJbWFnZUxvYWRpbmdTdHJhdGVneSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmNvbmZpZyBhcyBNZWRpYUNvbmZpZyk/LmltYWdlTG9hZGluZ1N0cmF0ZWd5ID8/XG4gICAgICBJbWFnZUxvYWRpbmdTdHJhdGVneS5FQUdFUlxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVkaWEgZm9ybWF0cyBpbiBhIGxvZ2ljYWwgc29ydGVkIG9yZGVyLiBUaGUgbWFwIGNvbnRhaW5zIHRoZVxuICAgKiBmb3JtYXQga2V5IGFuZCB0aGUgZm9ybWF0IHNpemUgaW5mb3JtYXRpb24uIFdlIGRvIHRoaXMgb25seSBvbmNlIGZvciBwZXJmb3JtYW5jZVxuICAgKiBiZW5lZml0cy5cbiAgICovXG4gIHByb3RlY3RlZCBnZXQgc29ydGVkRm9ybWF0cygpOiB7IGNvZGU6IHN0cmluZzsgc2l6ZTogTWVkaWFGb3JtYXRTaXplIH1bXSB7XG4gICAgY29uc3QgbWVkaWFGb3JtYXRzID0gdGhpcy5jb25maWc/Lm1lZGlhRm9ybWF0cztcbiAgICBpZiAoIXRoaXMuX3NvcnRlZEZvcm1hdHMgJiYgbWVkaWFGb3JtYXRzKSB7XG4gICAgICB0aGlzLl9zb3J0ZWRGb3JtYXRzID0gT2JqZWN0LmtleXMobWVkaWFGb3JtYXRzKVxuICAgICAgICAubWFwKChrZXkpID0+ICh7XG4gICAgICAgICAgY29kZToga2V5LFxuICAgICAgICAgIHNpemU6IG1lZGlhRm9ybWF0c1trZXldLFxuICAgICAgICB9KSlcbiAgICAgICAgLnNvcnQoKGEsIGIpID0+XG4gICAgICAgICAgYS5zaXplLndpZHRoICYmIGIuc2l6ZS53aWR0aCAmJiBhLnNpemUud2lkdGggPiBiLnNpemUud2lkdGggPyAxIDogLTFcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NvcnRlZEZvcm1hdHMgPz8gW107XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyB0aGUgbWVkaWEgZm9ybWF0cyBpbiBhIHJldmVyc2VkIHNvcnRlZCBvcmRlci5cbiAgICovXG4gIHByb3RlY3RlZCBnZXQgcmV2ZXJzZWRGb3JtYXRzKCk6IHsgY29kZTogc3RyaW5nOyBzaXplOiBNZWRpYUZvcm1hdFNpemUgfVtdIHtcbiAgICBpZiAoIXRoaXMuX3JldmVyc2VkRm9ybWF0cykge1xuICAgICAgdGhpcy5fcmV2ZXJzZWRGb3JtYXRzID0gdGhpcy5zb3J0ZWRGb3JtYXRzLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fcmV2ZXJzZWRGb3JtYXRzO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc29sdmVzIHRoZSByaWdodCBtZWRpYSBmb3IgdGhlIGdpdmVuIGZvcm1hdC4gVGhlIGZvXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzb2x2ZU1lZGlhKG1lZGlhOiBNZWRpYUNvbnRhaW5lciwgZm9ybWF0Pzogc3RyaW5nKTogSW1hZ2Uge1xuICAgIHJldHVybiBtZWRpYVt0aGlzLnJlc29sdmVGb3JtYXQobWVkaWEsIGZvcm1hdCldO1xuICB9XG5cbiAgLyoqXG4gICAqIFZhbGlkYXRlcyB0aGUgZm9ybWF0IGFnYWluc3QgdGhlIGdpdmVuIG1lZGlhQ29udGFpbmVyLiBJZiB0aGVyZSBpcyBubyBmb3JtYXQgYXZhaWxhYmxlLFxuICAgKiBvciBpZiB0aGUgbWVkaWFDb250YWluZXIgZG9lc24ndCBjb250YWluIGEgbWVkaWEgZm9yIHRoZSBnaXZlbiBtZWRpYSwgdGhlIG1vc3Qgb3B0aW1hbFxuICAgKiBmb3JtYXQgaXMgcmVzb2x2ZWQuIElmIGV2ZW4gdGhhdCBpcyBub3QgcG9zc2libGUsIHRoZSBmaXJzdCBmb3JtYXQgaXMgcmV0dXJuZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzb2x2ZUZvcm1hdChcbiAgICBtZWRpYUNvbnRhaW5lcjogTWVkaWFDb250YWluZXIsXG4gICAgZm9ybWF0Pzogc3RyaW5nXG4gICk6IHN0cmluZyB7XG4gICAgaWYgKGZvcm1hdCAmJiBtZWRpYUNvbnRhaW5lcltmb3JtYXRdKSB7XG4gICAgICByZXR1cm4gZm9ybWF0O1xuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5yZXNvbHZlQmVzdEZvcm1hdChtZWRpYUNvbnRhaW5lcikgfHwgT2JqZWN0LmtleXMobWVkaWFDb250YWluZXIpWzBdXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBtZWRpYSBmb3JtYXQgY29kZSB3aXRoIHRoZSBiZXN0IHNpemUuXG4gICAqL1xuICBwcm90ZWN0ZWQgcmVzb2x2ZUJlc3RGb3JtYXQoXG4gICAgbWVkaWE6IE1lZGlhQ29udGFpbmVyIHwgSW1hZ2VcbiAgKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5yZXZlcnNlZEZvcm1hdHMuZmluZCgoZm9ybWF0KSA9PlxuICAgICAgbWVkaWEuaGFzT3duUHJvcGVydHkoZm9ybWF0LmNvZGUpXG4gICAgKT8uY29kZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgc2V0IG9mIG1lZGlhIGZvciB0aGUgYXZhaWxhYmxlIG1lZGlhIGZvcm1hdHMuIEFkZGl0aW9uYWxseSwgdGhlIGNvbmZpZ3VyZWQgbWVkaWFcbiAgICogZm9ybWF0IHdpZHRoIGlzIGFkZGVkIHRvIHRoZSBzcmNzZXQsIHNvIHRoYXQgYnJvd3NlcnMgY2FuIHNlbGVjdCB0aGUgYXBwcm9wcmlhdGUgbWVkaWEuXG4gICAqXG4gICAqIFRoZSBvcHRpb25hbCBtYXhGb3JtYXQgaW5kaWNhdGVzIHRoYXQgb25seSBzb3VyY2VzIHRpbGwgYSBjZXJ0YWluIGZvcm1hdCBzaG91bGQgYmUgYWRkZWRcbiAgICogdG8gdGhlIHNyY3NldC5cbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlU3JjU2V0KFxuICAgIG1lZGlhOiBNZWRpYUNvbnRhaW5lciB8IEltYWdlLFxuICAgIG1heEZvcm1hdD86IHN0cmluZ1xuICApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICghbWVkaWEpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gT25seSBjcmVhdGUgc3Jjc2V0IGltYWdlcyB0aGF0IGFyZSBzbWFsbGVyIHRoYW4gdGhlIGdpdmVuIGBtYXhGb3JtYXRgIChpZiBhbnkpXG4gICAgbGV0IGZvcm1hdHMgPSB0aGlzLnNvcnRlZEZvcm1hdHM7XG4gICAgY29uc3QgbWF4OiBudW1iZXIgPSBmb3JtYXRzLmZpbmRJbmRleCgoZikgPT4gZi5jb2RlID09PSBtYXhGb3JtYXQpO1xuICAgIGlmIChtYXggPiAtMSkge1xuICAgICAgZm9ybWF0cyA9IGZvcm1hdHMuc2xpY2UoMCwgbWF4ICsgMSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3Jjc2V0ID0gZm9ybWF0cy5yZWR1Y2UoKHNldCwgZm9ybWF0KSA9PiB7XG4gICAgICBjb25zdCBpbWFnZSA9IChtZWRpYSBhcyBNZWRpYUNvbnRhaW5lcilbZm9ybWF0LmNvZGVdO1xuICAgICAgaWYgKCEhaW1hZ2UpIHtcbiAgICAgICAgaWYgKHNldCkge1xuICAgICAgICAgIHNldCArPSAnLCAnO1xuICAgICAgICB9XG4gICAgICAgIHNldCArPSBgJHt0aGlzLnJlc29sdmVBYnNvbHV0ZVVybChpbWFnZS51cmwgPz8gJycpfSAke1xuICAgICAgICAgIGZvcm1hdC5zaXplLndpZHRoXG4gICAgICAgIH13YDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZXQ7XG4gICAgfSwgJycpO1xuXG4gICAgcmV0dXJuIHNyY3NldCA9PT0gJycgPyB1bmRlZmluZWQgOiBzcmNzZXQ7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZXMgdGhlIGFic29sdXRlIFVSTCBmb3IgdGhlIGdpdmVuIHVybC4gSW4gbW9zdCBjYXNlcywgdGhpcyBVUkwgcmVwcmVzZW50c1xuICAgKiB0aGUgcmVsYXRpdmUgVVJMIG9uIHRoZSBiYWNrZW5kLiBJbiB0aGF0IGNhc2UsIHdlIHByZWZpeCB0aGUgdXJsIHdpdGggdGhlIGJhc2VVcmwuXG4gICAqXG4gICAqIFdoZW4gd2UgaGF2ZSByZWNlaXZlIGFuIGFic29sdXRlIFVSTCwgd2UgcmV0dXJuIHRoZSBVUkwgYXMtaXMuIEFuIGFic29sdXRlIFVSTCBtaWdodCBhbHNvXG4gICAqIHN0YXJ0IHdpdGggZG91YmxlIHNsYXNoLCB3aGljaCBpcyB1c2VkIHRvIHJlc29sdmUgbWVkaWEgY3Jvc3MgZnJvbSBodHRwIGFuZCBodHRwcy5cbiAgICovXG4gIHByb3RlY3RlZCByZXNvbHZlQWJzb2x1dGVVcmwodXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiAhdXJsIHx8IHVybC5zdGFydHNXaXRoKCdodHRwJykgfHwgdXJsLnN0YXJ0c1dpdGgoJy8vJylcbiAgICAgID8gdXJsXG4gICAgICA6IHRoaXMuZ2V0QmFzZVVybCgpICsgdXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBiYXNlIFVSTCBpcyBlaXRoZXIgZHJpdmVuIGJ5IGEgc3BlY2lmaWMgYGJhY2tlbmQubWVkaWEuYmFzZVVybGAsIG9yIGJ5IHRoZVxuICAgKiBgYmFja2VuZC5vY2MuYmFzZVVybGAuXG4gICAqXG4gICAqIFRoZSBgYmFja2VuZC5tZWRpYS5iYXNlVXJsYCBjYW4gYmUgdXNlZCB0byBsb2FkIG1lZGlhIGZyb20gYSBkaWZmZXJlbnQgbG9jYXRpb24uXG4gICAqXG4gICAqIEluIENvbW1lcmNlIENsb3VkLCBhIGRpZmZlcmVudCBsb2NhdGlvbiBjb3VsZCBtZWFuIGEgZGlmZmVyZW50IFwiYXNwZWN0XCIuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGVtcHR5IHN0cmluZyBpbiBjYXNlIG5vIGNvbmZpZyBpcyBwcm92aWRlZC5cbiAgICovXG4gIHByb3RlY3RlZCBnZXRCYXNlVXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuY29uZmlnLmJhY2tlbmQ/Lm1lZGlhPy5iYXNlVXJsID8/XG4gICAgICB0aGlzLmNvbmZpZy5iYWNrZW5kPy5vY2M/LmJhc2VVcmwgPz9cbiAgICAgICcnXG4gICAgKTtcbiAgfVxufVxuIl19