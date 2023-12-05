/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { DatePipe } from '@angular/common';
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class MockDatePipe extends DatePipe {
    // Overload to support stricter type check from angular 11 onwards
    transform(value, format, timezone, locale = 'en') {
        return super.transform(value, format, timezone, locale);
    }
}
MockDatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MockDatePipe, deps: null, target: i0.ɵɵFactoryTarget.Pipe });
MockDatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: MockDatePipe, name: "cxDate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: MockDatePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxDate' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9jay1kYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9pMThuL3Rlc3RpbmcvbW9jay1kYXRlLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFHcEQsTUFBTSxPQUFPLFlBQWEsU0FBUSxRQUFRO0lBRXhDLGtFQUFrRTtJQUNsRSxTQUFTLENBQ1AsS0FBZ0QsRUFDaEQsTUFBZSxFQUNmLFFBQWlCLEVBQ2pCLE1BQU0sR0FBRyxJQUFJO1FBRWIsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELENBQUM7O3lHQVZVLFlBQVk7dUdBQVosWUFBWTsyRkFBWixZQUFZO2tCQUR4QixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IERhdGVQaXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQFBpcGUoeyBuYW1lOiAnY3hEYXRlJyB9KVxuZXhwb3J0IGNsYXNzIE1vY2tEYXRlUGlwZSBleHRlbmRzIERhdGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh2YWx1ZTogYW55LCAuLi5hcmdzOiBhbnlbXSk6IGFueTtcbiAgLy8gT3ZlcmxvYWQgdG8gc3VwcG9ydCBzdHJpY3RlciB0eXBlIGNoZWNrIGZyb20gYW5ndWxhciAxMSBvbndhcmRzXG4gIHRyYW5zZm9ybShcbiAgICB2YWx1ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsXG4gICAgZm9ybWF0Pzogc3RyaW5nLFxuICAgIHRpbWV6b25lPzogc3RyaW5nLFxuICAgIGxvY2FsZSA9ICdlbidcbiAgKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgcmV0dXJuIHN1cGVyLnRyYW5zZm9ybSh2YWx1ZSwgZm9ybWF0LCB0aW1lem9uZSwgbG9jYWxlKTtcbiAgfVxufVxuIl19