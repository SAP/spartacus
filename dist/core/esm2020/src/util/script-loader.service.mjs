/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as i0 from "@angular/core";
export var ScriptPlacement;
(function (ScriptPlacement) {
    ScriptPlacement["HEAD"] = "head";
    ScriptPlacement["BODY"] = "body";
})(ScriptPlacement || (ScriptPlacement = {}));
export class ScriptLoader {
    constructor(document, platformId) {
        this.document = document;
        this.platformId = platformId;
    }
    /**
     * Embeds a javascript from an external URL.
     *
     * @param embedOptions
     * src: URL for the script to be loaded
     * params: additional parameters to be attached to the given URL
     * attributes: the attributes of HTML script tag (exclude src)
     * callback: a function to be invoked after the script has been loaded
     * errorCallback: function to be invoked after error during script loading
     * placement: HTML body or head where script will be placed
     */
    embedScript(embedOptions) {
        const { src, params, attributes, callback, errorCallback, placement = ScriptPlacement.HEAD, } = embedOptions;
        const isSSR = isPlatformServer(this.platformId);
        if ((callback || errorCallback) && isSSR) {
            return;
        }
        const source = params ? src + this.parseParams(params) : src;
        if (!isSSR && this.hasScript(source)) {
            return;
        }
        const script = this.document.createElement('script');
        script.src = source;
        script.async = true;
        script.defer = true;
        if (attributes) {
            Object.keys(attributes).forEach((key) => {
                // custom attributes
                if (key.startsWith('data-')) {
                    script.setAttribute(key, attributes[key]);
                }
                else {
                    script[key] = attributes[key];
                }
            });
        }
        if (callback) {
            script.addEventListener('load', callback);
        }
        if (errorCallback) {
            script.addEventListener('error', errorCallback);
        }
        placement === ScriptPlacement.HEAD
            ? this.document.head.appendChild(script)
            : this.document.body.appendChild(script);
    }
    /**
     * Indicates if the script is already added to the DOM.
     */
    hasScript(src) {
        return !!this.document.querySelector(`script[src="${src}"]`);
    }
    /**
     * Parses the given object with parameters to a string "param1=value1&param2=value2"
     * @param params object containing parameters
     */
    parseParams(params) {
        let result = '';
        const keysArray = Object.keys(params);
        if (keysArray.length > 0) {
            result =
                '?' +
                    keysArray
                        .map((key) => encodeURI(key) + '=' + encodeURI(params[key]))
                        .join('&');
        }
        return result;
    }
}
ScriptLoader.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScriptLoader, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Injectable });
ScriptLoader.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScriptLoader, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: ScriptLoader, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zcmMvdXRpbC9zY3JpcHQtbG9hZGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRWhFLE1BQU0sQ0FBTixJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDekIsZ0NBQWEsQ0FBQTtJQUNiLGdDQUFhLENBQUE7QUFDZixDQUFDLEVBSFcsZUFBZSxLQUFmLGVBQWUsUUFHMUI7QUFLRCxNQUFNLE9BQU8sWUFBWTtJQUN2QixZQUM4QixRQUFhLEVBQ1YsVUFBa0I7UUFEckIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUNWLGVBQVUsR0FBVixVQUFVLENBQVE7SUFDaEQsQ0FBQztJQUVKOzs7Ozs7Ozs7O09BVUc7SUFDSSxXQUFXLENBQUMsWUFPbEI7UUFDQyxNQUFNLEVBQ0osR0FBRyxFQUNILE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNSLGFBQWEsRUFDYixTQUFTLEdBQUcsZUFBZSxDQUFDLElBQUksR0FDakMsR0FBRyxZQUFZLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxRQUFRLElBQUksYUFBYSxDQUFDLElBQUksS0FBSyxFQUFFO1lBQ3hDLE9BQU87U0FDUjtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUM3RCxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBRUQsTUFBTSxNQUFNLEdBQXNCLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRXBCLElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEMsb0JBQW9CO2dCQUNwQixJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzNCLE1BQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFLFVBQVUsQ0FBQyxHQUFtQixDQUFDLENBQUMsQ0FBQztpQkFDM0Q7cUJBQU07b0JBQ0osTUFBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxHQUFtQixDQUFDLENBQUM7aUJBQ3hEO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUVELElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMzQztRQUNELElBQUksYUFBYSxFQUFFO1lBQ2pCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7U0FDakQ7UUFFRCxTQUFTLEtBQUssZUFBZSxDQUFDLElBQUk7WUFDaEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDeEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7O09BRUc7SUFDTyxTQUFTLENBQUMsR0FBWTtRQUM5QixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVEOzs7T0FHRztJQUNLLFdBQVcsQ0FBQyxNQUFjO1FBQ2hDLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNoQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDeEIsTUFBTTtnQkFDSixHQUFHO29CQUNILFNBQVM7eUJBQ04sR0FBRyxDQUNGLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDTixTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBbUIsQ0FBQyxDQUFDLENBQ2hFO3lCQUNBLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNoQjtRQUNELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O3lHQWpHVSxZQUFZLGtCQUViLFFBQVEsYUFDUixXQUFXOzZHQUhWLFlBQVksY0FGWCxNQUFNOzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzswQkFHSSxNQUFNOzJCQUFDLFFBQVE7OzBCQUNmLE1BQU07MkJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERPQ1VNRU5ULCBpc1BsYXRmb3JtU2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgUExBVEZPUk1fSUQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGVudW0gU2NyaXB0UGxhY2VtZW50IHtcbiAgSEVBRCA9ICdoZWFkJyxcbiAgQk9EWSA9ICdib2R5Jyxcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNjcmlwdExvYWRlciB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByb3RlY3RlZCBkb2N1bWVudDogYW55LFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHByb3RlY3RlZCBwbGF0Zm9ybUlkOiBPYmplY3RcbiAgKSB7fVxuXG4gIC8qKlxuICAgKiBFbWJlZHMgYSBqYXZhc2NyaXB0IGZyb20gYW4gZXh0ZXJuYWwgVVJMLlxuICAgKlxuICAgKiBAcGFyYW0gZW1iZWRPcHRpb25zXG4gICAqIHNyYzogVVJMIGZvciB0aGUgc2NyaXB0IHRvIGJlIGxvYWRlZFxuICAgKiBwYXJhbXM6IGFkZGl0aW9uYWwgcGFyYW1ldGVycyB0byBiZSBhdHRhY2hlZCB0byB0aGUgZ2l2ZW4gVVJMXG4gICAqIGF0dHJpYnV0ZXM6IHRoZSBhdHRyaWJ1dGVzIG9mIEhUTUwgc2NyaXB0IHRhZyAoZXhjbHVkZSBzcmMpXG4gICAqIGNhbGxiYWNrOiBhIGZ1bmN0aW9uIHRvIGJlIGludm9rZWQgYWZ0ZXIgdGhlIHNjcmlwdCBoYXMgYmVlbiBsb2FkZWRcbiAgICogZXJyb3JDYWxsYmFjazogZnVuY3Rpb24gdG8gYmUgaW52b2tlZCBhZnRlciBlcnJvciBkdXJpbmcgc2NyaXB0IGxvYWRpbmdcbiAgICogcGxhY2VtZW50OiBIVE1MIGJvZHkgb3IgaGVhZCB3aGVyZSBzY3JpcHQgd2lsbCBiZSBwbGFjZWRcbiAgICovXG4gIHB1YmxpYyBlbWJlZFNjcmlwdChlbWJlZE9wdGlvbnM6IHtcbiAgICBzcmM6IHN0cmluZztcbiAgICBwYXJhbXM/OiBPYmplY3Q7XG4gICAgYXR0cmlidXRlcz86IE9iamVjdDtcbiAgICBjYWxsYmFjaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgZXJyb3JDYWxsYmFjaz86IEV2ZW50TGlzdGVuZXI7XG4gICAgcGxhY2VtZW50PzogU2NyaXB0UGxhY2VtZW50O1xuICB9KTogdm9pZCB7XG4gICAgY29uc3Qge1xuICAgICAgc3JjLFxuICAgICAgcGFyYW1zLFxuICAgICAgYXR0cmlidXRlcyxcbiAgICAgIGNhbGxiYWNrLFxuICAgICAgZXJyb3JDYWxsYmFjayxcbiAgICAgIHBsYWNlbWVudCA9IFNjcmlwdFBsYWNlbWVudC5IRUFELFxuICAgIH0gPSBlbWJlZE9wdGlvbnM7XG5cbiAgICBjb25zdCBpc1NTUiA9IGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKTtcbiAgICBpZiAoKGNhbGxiYWNrIHx8IGVycm9yQ2FsbGJhY2spICYmIGlzU1NSKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlID0gcGFyYW1zID8gc3JjICsgdGhpcy5wYXJzZVBhcmFtcyhwYXJhbXMpIDogc3JjO1xuICAgIGlmICghaXNTU1IgJiYgdGhpcy5oYXNTY3JpcHQoc291cmNlKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHNjcmlwdDogSFRNTFNjcmlwdEVsZW1lbnQgPSB0aGlzLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgIHNjcmlwdC5zcmMgPSBzb3VyY2U7XG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQuZGVmZXIgPSB0cnVlO1xuXG4gICAgaWYgKGF0dHJpYnV0ZXMpIHtcbiAgICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAvLyBjdXN0b20gYXR0cmlidXRlc1xuICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoJ2RhdGEtJykpIHtcbiAgICAgICAgICBzY3JpcHQuc2V0QXR0cmlidXRlKGtleSwgYXR0cmlidXRlc1trZXkgYXMga2V5b2Ygb2JqZWN0XSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgKHNjcmlwdCBhcyBhbnkpW2tleV0gPSBhdHRyaWJ1dGVzW2tleSBhcyBrZXlvZiBvYmplY3RdO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgc2NyaXB0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3JDYWxsYmFjayk7XG4gICAgfVxuXG4gICAgcGxhY2VtZW50ID09PSBTY3JpcHRQbGFjZW1lbnQuSEVBRFxuICAgICAgPyB0aGlzLmRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KVxuICAgICAgOiB0aGlzLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgaWYgdGhlIHNjcmlwdCBpcyBhbHJlYWR5IGFkZGVkIHRvIHRoZSBET00uXG4gICAqL1xuICBwcm90ZWN0ZWQgaGFzU2NyaXB0KHNyYz86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyYz1cIiR7c3JjfVwiXWApO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyB0aGUgZ2l2ZW4gb2JqZWN0IHdpdGggcGFyYW1ldGVycyB0byBhIHN0cmluZyBcInBhcmFtMT12YWx1ZTEmcGFyYW0yPXZhbHVlMlwiXG4gICAqIEBwYXJhbSBwYXJhbXMgb2JqZWN0IGNvbnRhaW5pbmcgcGFyYW1ldGVyc1xuICAgKi9cbiAgcHJpdmF0ZSBwYXJzZVBhcmFtcyhwYXJhbXM6IE9iamVjdCk6IHN0cmluZyB7XG4gICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgIGNvbnN0IGtleXNBcnJheSA9IE9iamVjdC5rZXlzKHBhcmFtcyk7XG4gICAgaWYgKGtleXNBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICByZXN1bHQgPVxuICAgICAgICAnPycgK1xuICAgICAgICBrZXlzQXJyYXlcbiAgICAgICAgICAubWFwKFxuICAgICAgICAgICAgKGtleSkgPT5cbiAgICAgICAgICAgICAgZW5jb2RlVVJJKGtleSkgKyAnPScgKyBlbmNvZGVVUkkocGFyYW1zW2tleSBhcyBrZXlvZiBvYmplY3RdKVxuICAgICAgICAgIClcbiAgICAgICAgICAuam9pbignJicpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59XG4iXX0=