/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, isDevMode, Pipe, } from '@angular/core';
import { LoggerService } from '../logger';
import { ObjectComparisonUtils } from '../util/object-comparison-utils';
import * as i0 from "@angular/core";
import * as i1 from "./translation.service";
export class TranslatePipe {
    constructor(service, cd) {
        this.service = service;
        this.cd = cd;
        this.logger = inject(LoggerService);
    }
    transform(input, options = {}) {
        if (!input) {
            if (isDevMode()) {
                this.logger.error(`The given input for the cxTranslate pipe (${input}) is invalid and cannot be translated`);
            }
            return '';
        }
        if (input.raw) {
            return input.raw ?? '';
        }
        const key = typeof input === 'string' ? input : input.key;
        if (typeof input !== 'string') {
            options = { ...options, ...input.params };
        }
        this.translate(key, options);
        return this.translatedValue;
    }
    translate(key, options) {
        if (key !== this.lastKey ||
            !ObjectComparisonUtils.shallowEqualObjects(options, this.lastOptions)) {
            this.lastKey = key;
            this.lastOptions = options;
            if (this.sub) {
                this.sub.unsubscribe();
            }
            this.sub = this.service
                .translate(key, options, true)
                .subscribe((val) => this.markForCheck(val));
        }
    }
    markForCheck(value) {
        this.translatedValue = value;
        this.cd.markForCheck();
    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
TranslatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TranslatePipe, deps: [{ token: i1.TranslationService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Pipe });
TranslatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.9", ngImport: i0, type: TranslatePipe, name: "cxTranslate", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TranslatePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'cxTranslate', pure: false }]
        }], ctorParameters: function () { return [{ type: i1.TranslationService }, { type: i0.ChangeDetectorRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3NyYy9pMThuL3RyYW5zbGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFFVCxJQUFJLEdBRUwsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUMxQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7O0FBS3hFLE1BQU0sT0FBTyxhQUFhO0lBUXhCLFlBQ1ksT0FBMkIsRUFDM0IsRUFBcUI7UUFEckIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsT0FBRSxHQUFGLEVBQUUsQ0FBbUI7UUFKdkIsV0FBTSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUt0QyxDQUFDO0lBRUosU0FBUyxDQUNQLEtBQTRCLEVBQzVCLFVBQThCLEVBQUU7UUFFaEMsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLElBQUksU0FBUyxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2YsNkNBQTZDLEtBQUssdUNBQXVDLENBQzFGLENBQUM7YUFDSDtZQUNELE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxJQUFLLEtBQXNCLENBQUMsR0FBRyxFQUFFO1lBQy9CLE9BQVEsS0FBc0IsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1NBQzFDO1FBRUQsTUFBTSxHQUFHLEdBQUcsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7UUFDMUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7WUFDN0IsT0FBTyxHQUFHLEVBQUUsR0FBRyxPQUFPLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDM0M7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDOUIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxHQUFRLEVBQUUsT0FBZTtRQUN6QyxJQUNFLEdBQUcsS0FBSyxJQUFJLENBQUMsT0FBTztZQUNwQixDQUFDLHFCQUFxQixDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQ3JFO1lBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7WUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7WUFFM0IsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDeEI7WUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPO2lCQUNwQixTQUFTLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7aUJBQzdCLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FBQyxLQUFhO1FBQ2hDLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1FBQzdCLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7MEdBakVVLGFBQWE7d0dBQWIsYUFBYTsyRkFBYixhQUFhO2tCQUR6QixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIGluamVjdCxcbiAgaXNEZXZNb2RlLFxuICBPbkRlc3Ryb3ksXG4gIFBpcGUsXG4gIFBpcGVUcmFuc2Zvcm0sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2dnZXJTZXJ2aWNlIH0gZnJvbSAnLi4vbG9nZ2VyJztcbmltcG9ydCB7IE9iamVjdENvbXBhcmlzb25VdGlscyB9IGZyb20gJy4uL3V0aWwvb2JqZWN0LWNvbXBhcmlzb24tdXRpbHMnO1xuaW1wb3J0IHsgVHJhbnNsYXRhYmxlLCBUcmFuc2xhdGFibGVQYXJhbXMgfSBmcm9tICcuL3RyYW5zbGF0YWJsZSc7XG5pbXBvcnQgeyBUcmFuc2xhdGlvblNlcnZpY2UgfSBmcm9tICcuL3RyYW5zbGF0aW9uLnNlcnZpY2UnO1xuXG5AUGlwZSh7IG5hbWU6ICdjeFRyYW5zbGF0ZScsIHB1cmU6IGZhbHNlIH0pXG5leHBvcnQgY2xhc3MgVHJhbnNsYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0sIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgbGFzdEtleTogc3RyaW5nO1xuICBwcml2YXRlIGxhc3RPcHRpb25zOiBvYmplY3Q7XG4gIHByaXZhdGUgdHJhbnNsYXRlZFZhbHVlOiBzdHJpbmc7XG4gIHByaXZhdGUgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgcHJvdGVjdGVkIGxvZ2dlciA9IGluamVjdChMb2dnZXJTZXJ2aWNlKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgc2VydmljZTogVHJhbnNsYXRpb25TZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjZDogQ2hhbmdlRGV0ZWN0b3JSZWZcbiAgKSB7fVxuXG4gIHRyYW5zZm9ybShcbiAgICBpbnB1dDogVHJhbnNsYXRhYmxlIHwgc3RyaW5nLFxuICAgIG9wdGlvbnM6IFRyYW5zbGF0YWJsZVBhcmFtcyA9IHt9XG4gICk6IHN0cmluZyB7XG4gICAgaWYgKCFpbnB1dCkge1xuICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmVycm9yKFxuICAgICAgICAgIGBUaGUgZ2l2ZW4gaW5wdXQgZm9yIHRoZSBjeFRyYW5zbGF0ZSBwaXBlICgke2lucHV0fSkgaXMgaW52YWxpZCBhbmQgY2Fubm90IGJlIHRyYW5zbGF0ZWRgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgaWYgKChpbnB1dCBhcyBUcmFuc2xhdGFibGUpLnJhdykge1xuICAgICAgcmV0dXJuIChpbnB1dCBhcyBUcmFuc2xhdGFibGUpLnJhdyA/PyAnJztcbiAgICB9XG5cbiAgICBjb25zdCBrZXkgPSB0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnID8gaW5wdXQgOiBpbnB1dC5rZXk7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdGlvbnMgPSB7IC4uLm9wdGlvbnMsIC4uLmlucHV0LnBhcmFtcyB9O1xuICAgIH1cblxuICAgIHRoaXMudHJhbnNsYXRlKGtleSwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlZFZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSB0cmFuc2xhdGUoa2V5OiBhbnksIG9wdGlvbnM6IG9iamVjdCkge1xuICAgIGlmIChcbiAgICAgIGtleSAhPT0gdGhpcy5sYXN0S2V5IHx8XG4gICAgICAhT2JqZWN0Q29tcGFyaXNvblV0aWxzLnNoYWxsb3dFcXVhbE9iamVjdHMob3B0aW9ucywgdGhpcy5sYXN0T3B0aW9ucylcbiAgICApIHtcbiAgICAgIHRoaXMubGFzdEtleSA9IGtleTtcbiAgICAgIHRoaXMubGFzdE9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgICBpZiAodGhpcy5zdWIpIHtcbiAgICAgICAgdGhpcy5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3ViID0gdGhpcy5zZXJ2aWNlXG4gICAgICAgIC50cmFuc2xhdGUoa2V5LCBvcHRpb25zLCB0cnVlKVxuICAgICAgICAuc3Vic2NyaWJlKCh2YWwpID0+IHRoaXMubWFya0ZvckNoZWNrKHZhbCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbWFya0ZvckNoZWNrKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRyYW5zbGF0ZWRWYWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdWIpIHtcbiAgICAgIHRoaXMuc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=