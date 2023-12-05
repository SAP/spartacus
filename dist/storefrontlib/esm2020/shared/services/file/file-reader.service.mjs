/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export class FileReaderService {
    /**
     * Load text file
     *
     * @param file text file to extract the data
     * @returns Observable from file reader
     */
    loadTextFile(file) {
        return new Observable((observer) => {
            const fileReader = new FileReader();
            fileReader.readAsText(file);
            fileReader.onload = () => {
                observer.next(fileReader.result);
                observer.complete();
            };
            fileReader.onerror = (error) => {
                fileReader.abort();
                observer.error(error);
            };
        });
    }
}
FileReaderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileReaderService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
FileReaderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileReaderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FileReaderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1yZWFkZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL3NlcnZpY2VzL2ZpbGUvZmlsZS1yZWFkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsVUFBVSxFQUFZLE1BQU0sTUFBTSxDQUFDOztBQUs1QyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCOzs7OztPQUtHO0lBQ0gsWUFBWSxDQUFDLElBQVU7UUFDckIsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFFBQTBCLEVBQUUsRUFBRTtZQUNuRCxNQUFNLFVBQVUsR0FBZSxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ2hELFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDNUIsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ3ZCLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQWdCLENBQUMsQ0FBQztnQkFDM0MsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3RCLENBQUMsQ0FBQztZQUNGLFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDN0IsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNuQixRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OEdBcEJVLGlCQUFpQjtrSEFBakIsaUJBQWlCLGNBRmhCLE1BQU07MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBGaWxlUmVhZGVyU2VydmljZSB7XG4gIC8qKlxuICAgKiBMb2FkIHRleHQgZmlsZVxuICAgKlxuICAgKiBAcGFyYW0gZmlsZSB0ZXh0IGZpbGUgdG8gZXh0cmFjdCB0aGUgZGF0YVxuICAgKiBAcmV0dXJucyBPYnNlcnZhYmxlIGZyb20gZmlsZSByZWFkZXJcbiAgICovXG4gIGxvYWRUZXh0RmlsZShmaWxlOiBGaWxlKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8c3RyaW5nPikgPT4ge1xuICAgICAgY29uc3QgZmlsZVJlYWRlcjogRmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICBmaWxlUmVhZGVyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgb2JzZXJ2ZXIubmV4dChmaWxlUmVhZGVyLnJlc3VsdCBhcyBzdHJpbmcpO1xuICAgICAgICBvYnNlcnZlci5jb21wbGV0ZSgpO1xuICAgICAgfTtcbiAgICAgIGZpbGVSZWFkZXIub25lcnJvciA9IChlcnJvcikgPT4ge1xuICAgICAgICBmaWxlUmVhZGVyLmFib3J0KCk7XG4gICAgICAgIG9ic2VydmVyLmVycm9yKGVycm9yKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==