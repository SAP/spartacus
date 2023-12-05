/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class FormatTimerPipe {
    transform(totalSeconds) {
        if (totalSeconds < 0) {
            totalSeconds = 0;
        }
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        let zeroPaddedMinutes;
        if (minutes < 10) {
            zeroPaddedMinutes = ('00' + minutes).slice(-2);
        }
        else {
            zeroPaddedMinutes = minutes + '';
        }
        const zeroPaddedSeconds = ('00' + seconds).slice(-2);
        return `${zeroPaddedMinutes}:${zeroPaddedSeconds}`;
    }
}
FormatTimerPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormatTimerPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FormatTimerPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: FormatTimerPipe, name: "formatTimer" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: FormatTimerPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'formatTimer',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LXRpbWVyLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9mZWF0dXJlLWxpYnMvYXNtL2NvbXBvbmVudHMvYXNtLXNlc3Npb24tdGltZXIvZm9ybWF0LXRpbWVyLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDOztBQUtwRCxNQUFNLE9BQU8sZUFBZTtJQUMxQixTQUFTLENBQUMsWUFBb0I7UUFDNUIsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLFlBQVksR0FBRyxDQUFDLENBQUM7U0FDbEI7UUFDRCxNQUFNLE9BQU8sR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN0RCxNQUFNLE9BQU8sR0FBVyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQzFDLElBQUksaUJBQXlCLENBQUM7UUFDOUIsSUFBSSxPQUFPLEdBQUcsRUFBRSxFQUFFO1lBQ2hCLGlCQUFpQixHQUFHLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hEO2FBQU07WUFDTCxpQkFBaUIsR0FBRyxPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ2xDO1FBQ0QsTUFBTSxpQkFBaUIsR0FBVyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3RCxPQUFPLEdBQUcsaUJBQWlCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUNyRCxDQUFDOzs0R0FmVSxlQUFlOzBHQUFmLGVBQWU7MkZBQWYsZUFBZTtrQkFIM0IsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsYUFBYTtpQkFDcEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2Zvcm1hdFRpbWVyJyxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWF0VGltZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybSh0b3RhbFNlY29uZHM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgaWYgKHRvdGFsU2Vjb25kcyA8IDApIHtcbiAgICAgIHRvdGFsU2Vjb25kcyA9IDA7XG4gICAgfVxuICAgIGNvbnN0IG1pbnV0ZXM6IG51bWJlciA9IE1hdGguZmxvb3IodG90YWxTZWNvbmRzIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHM6IG51bWJlciA9IHRvdGFsU2Vjb25kcyAlIDYwO1xuICAgIGxldCB6ZXJvUGFkZGVkTWludXRlczogc3RyaW5nO1xuICAgIGlmIChtaW51dGVzIDwgMTApIHtcbiAgICAgIHplcm9QYWRkZWRNaW51dGVzID0gKCcwMCcgKyBtaW51dGVzKS5zbGljZSgtMik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHplcm9QYWRkZWRNaW51dGVzID0gbWludXRlcyArICcnO1xuICAgIH1cbiAgICBjb25zdCB6ZXJvUGFkZGVkU2Vjb25kczogc3RyaW5nID0gKCcwMCcgKyBzZWNvbmRzKS5zbGljZSgtMik7XG4gICAgcmV0dXJuIGAke3plcm9QYWRkZWRNaW51dGVzfToke3plcm9QYWRkZWRTZWNvbmRzfWA7XG4gIH1cbn1cbiJdfQ==