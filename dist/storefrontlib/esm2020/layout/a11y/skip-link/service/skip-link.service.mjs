/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../config/skip-link.config";
import * as i2 from "../../keyboard-focus/services/keyboard-focus.service";
export class SkipLinkService {
    constructor(config, keyboardFocusService) {
        this.config = config;
        this.keyboardFocusService = keyboardFocusService;
        this.skipLinks$ = new BehaviorSubject([]);
    }
    getSkipLinks() {
        return this.skipLinks$;
    }
    add(key, target) {
        const found = this.config.skipLinks?.find((skipLink) => skipLink.key === key);
        if (found) {
            const existing = this.skipLinks$.value;
            existing.splice(this.getSkipLinkIndexInArray(key), 0, {
                target,
                i18nKey: found.i18nKey,
                position: found.position,
                key,
            });
            this.skipLinks$.next(existing);
        }
    }
    remove(key) {
        const found = this.config.skipLinks?.find((skipLink) => skipLink.key === key);
        if (found) {
            let existing = this.skipLinks$.value;
            existing = existing.filter((skipLink) => skipLink.key !== key);
            this.skipLinks$.next(existing);
        }
    }
    scrollToTarget(skipLink) {
        const target = skipLink.target instanceof HTMLElement
            ? skipLink.target
            : skipLink.target?.parentElement;
        // focus first focusable element in the
        const firstFocusable = this.keyboardFocusService.findFirstFocusable(target) || target;
        // we force a tabindex if not available, to ensure we can focus into the element
        const hasTabindex = firstFocusable?.hasAttribute('tabindex');
        if (!hasTabindex) {
            firstFocusable?.setAttribute('tabindex', '-1');
        }
        firstFocusable?.focus();
        // drop the tmp tabindex
        if (!hasTabindex) {
            firstFocusable?.removeAttribute('tabindex');
        }
    }
    getSkipLinkIndexInArray(key) {
        let index = this.config.skipLinks?.findIndex((skipLink) => skipLink.key === key) ?? 0;
        while (index > 0) {
            index--;
            const previous = this.config.skipLinks?.[index];
            if (previous) {
                const existing = this.skipLinks$.value;
                const found = existing.findIndex((skipLink) => skipLink.key === previous.key);
                if (found > -1) {
                    return found + 1;
                }
            }
        }
        return 0;
    }
}
SkipLinkService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkService, deps: [{ token: i1.SkipLinkConfig }, { token: i2.KeyboardFocusService }], target: i0.ɵɵFactoryTarget.Injectable });
SkipLinkService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SkipLinkService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.SkipLinkConfig }, { type: i2.KeyboardFocusService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tpcC1saW5rLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9zdG9yZWZyb250bGliL2xheW91dC9hMTF5L3NraXAtbGluay9zZXJ2aWNlL3NraXAtbGluay5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0dBSUc7QUFFSCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7Ozs7QUFPbkQsTUFBTSxPQUFPLGVBQWU7SUFHMUIsWUFDWSxNQUFzQixFQUN0QixvQkFBMEM7UUFEMUMsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDdEIseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFzQjtRQUo5QyxlQUFVLEdBQUcsSUFBSSxlQUFlLENBQWEsRUFBRSxDQUFDLENBQUM7SUFLdEQsQ0FBQztJQUVKLFlBQVk7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFXLEVBQUUsTUFBbUI7UUFDbEMsTUFBTSxLQUFLLEdBQXlCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FDN0QsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUNuQyxDQUFDO1FBRUYsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLFFBQVEsR0FBZSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztZQUNuRCxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQ3BELE1BQU07Z0JBQ04sT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN0QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLEdBQUc7YUFDSixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoQztJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsR0FBVztRQUNoQixNQUFNLEtBQUssR0FBeUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUM3RCxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQ25DLENBQUM7UUFFRixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksUUFBUSxHQUFlLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ2pELFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO0lBQ0gsQ0FBQztJQUVELGNBQWMsQ0FBQyxRQUFrQjtRQUMvQixNQUFNLE1BQU0sR0FDVixRQUFRLENBQUMsTUFBTSxZQUFZLFdBQVc7WUFDcEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ2pCLENBQUMsQ0FBRSxRQUFRLENBQUMsTUFBOEIsRUFBRSxhQUFhLENBQUM7UUFFOUQsdUNBQXVDO1FBQ3ZDLE1BQU0sY0FBYyxHQUNsQixJQUFJLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDO1FBRWpFLGdGQUFnRjtRQUNoRixNQUFNLFdBQVcsR0FBRyxjQUFjLEVBQUUsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsY0FBYyxFQUFFLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDaEQ7UUFFRCxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFFeEIsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDaEIsY0FBYyxFQUFFLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUM3QztJQUNILENBQUM7SUFFUyx1QkFBdUIsQ0FBQyxHQUFXO1FBQzNDLElBQUksS0FBSyxHQUNQLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFNUUsT0FBTyxLQUFLLEdBQUcsQ0FBQyxFQUFFO1lBQ2hCLEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxRQUFRLEdBQXlCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEUsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osTUFBTSxRQUFRLEdBQWUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7Z0JBQ25ELE1BQU0sS0FBSyxHQUFXLFFBQVEsQ0FBQyxTQUFTLENBQ3RDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxLQUFLLFFBQVEsQ0FBQyxHQUFHLENBQzVDLENBQUM7Z0JBQ0YsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7b0JBQ2QsT0FBTyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQjthQUNGO1NBQ0Y7UUFDRCxPQUFPLENBQUMsQ0FBQztJQUNYLENBQUM7OzRHQW5GVSxlQUFlO2dIQUFmLGVBQWUsY0FGZCxNQUFNOzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBLZXlib2FyZEZvY3VzU2VydmljZSB9IGZyb20gJy4uLy4uL2tleWJvYXJkLWZvY3VzL3NlcnZpY2VzL2tleWJvYXJkLWZvY3VzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2tpcExpbmssIFNraXBMaW5rQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnL3NraXAtbGluay5jb25maWcnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2tpcExpbmtTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBza2lwTGlua3MkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTa2lwTGlua1tdPihbXSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIGNvbmZpZzogU2tpcExpbmtDb25maWcsXG4gICAgcHJvdGVjdGVkIGtleWJvYXJkRm9jdXNTZXJ2aWNlOiBLZXlib2FyZEZvY3VzU2VydmljZVxuICApIHt9XG5cbiAgZ2V0U2tpcExpbmtzKCk6IE9ic2VydmFibGU8U2tpcExpbmtbXT4ge1xuICAgIHJldHVybiB0aGlzLnNraXBMaW5rcyQ7XG4gIH1cblxuICBhZGQoa2V5OiBzdHJpbmcsIHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBmb3VuZDogU2tpcExpbmsgfCB1bmRlZmluZWQgPSB0aGlzLmNvbmZpZy5za2lwTGlua3M/LmZpbmQoXG4gICAgICAoc2tpcExpbmspID0+IHNraXBMaW5rLmtleSA9PT0ga2V5XG4gICAgKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgY29uc3QgZXhpc3Rpbmc6IFNraXBMaW5rW10gPSB0aGlzLnNraXBMaW5rcyQudmFsdWU7XG4gICAgICBleGlzdGluZy5zcGxpY2UodGhpcy5nZXRTa2lwTGlua0luZGV4SW5BcnJheShrZXkpLCAwLCB7XG4gICAgICAgIHRhcmdldCxcbiAgICAgICAgaTE4bktleTogZm91bmQuaTE4bktleSxcbiAgICAgICAgcG9zaXRpb246IGZvdW5kLnBvc2l0aW9uLFxuICAgICAgICBrZXksXG4gICAgICB9KTtcbiAgICAgIHRoaXMuc2tpcExpbmtzJC5uZXh0KGV4aXN0aW5nKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBmb3VuZDogU2tpcExpbmsgfCB1bmRlZmluZWQgPSB0aGlzLmNvbmZpZy5za2lwTGlua3M/LmZpbmQoXG4gICAgICAoc2tpcExpbmspID0+IHNraXBMaW5rLmtleSA9PT0ga2V5XG4gICAgKTtcblxuICAgIGlmIChmb3VuZCkge1xuICAgICAgbGV0IGV4aXN0aW5nOiBTa2lwTGlua1tdID0gdGhpcy5za2lwTGlua3MkLnZhbHVlO1xuICAgICAgZXhpc3RpbmcgPSBleGlzdGluZy5maWx0ZXIoKHNraXBMaW5rKSA9PiBza2lwTGluay5rZXkgIT09IGtleSk7XG4gICAgICB0aGlzLnNraXBMaW5rcyQubmV4dChleGlzdGluZyk7XG4gICAgfVxuICB9XG5cbiAgc2Nyb2xsVG9UYXJnZXQoc2tpcExpbms6IFNraXBMaW5rKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID1cbiAgICAgIHNraXBMaW5rLnRhcmdldCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgID8gc2tpcExpbmsudGFyZ2V0XG4gICAgICAgIDogKHNraXBMaW5rLnRhcmdldCBhcyBFbGVtZW50IHwgdW5kZWZpbmVkKT8ucGFyZW50RWxlbWVudDtcblxuICAgIC8vIGZvY3VzIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50IGluIHRoZVxuICAgIGNvbnN0IGZpcnN0Rm9jdXNhYmxlID1cbiAgICAgIHRoaXMua2V5Ym9hcmRGb2N1c1NlcnZpY2UuZmluZEZpcnN0Rm9jdXNhYmxlKHRhcmdldCkgfHwgdGFyZ2V0O1xuXG4gICAgLy8gd2UgZm9yY2UgYSB0YWJpbmRleCBpZiBub3QgYXZhaWxhYmxlLCB0byBlbnN1cmUgd2UgY2FuIGZvY3VzIGludG8gdGhlIGVsZW1lbnRcbiAgICBjb25zdCBoYXNUYWJpbmRleCA9IGZpcnN0Rm9jdXNhYmxlPy5oYXNBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgaWYgKCFoYXNUYWJpbmRleCkge1xuICAgICAgZmlyc3RGb2N1c2FibGU/LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICB9XG5cbiAgICBmaXJzdEZvY3VzYWJsZT8uZm9jdXMoKTtcblxuICAgIC8vIGRyb3AgdGhlIHRtcCB0YWJpbmRleFxuICAgIGlmICghaGFzVGFiaW5kZXgpIHtcbiAgICAgIGZpcnN0Rm9jdXNhYmxlPy5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldFNraXBMaW5rSW5kZXhJbkFycmF5KGtleTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBsZXQgaW5kZXg6IG51bWJlciA9XG4gICAgICB0aGlzLmNvbmZpZy5za2lwTGlua3M/LmZpbmRJbmRleCgoc2tpcExpbmspID0+IHNraXBMaW5rLmtleSA9PT0ga2V5KSA/PyAwO1xuXG4gICAgd2hpbGUgKGluZGV4ID4gMCkge1xuICAgICAgaW5kZXgtLTtcbiAgICAgIGNvbnN0IHByZXZpb3VzOiBTa2lwTGluayB8IHVuZGVmaW5lZCA9IHRoaXMuY29uZmlnLnNraXBMaW5rcz8uW2luZGV4XTtcbiAgICAgIGlmIChwcmV2aW91cykge1xuICAgICAgICBjb25zdCBleGlzdGluZzogU2tpcExpbmtbXSA9IHRoaXMuc2tpcExpbmtzJC52YWx1ZTtcbiAgICAgICAgY29uc3QgZm91bmQ6IG51bWJlciA9IGV4aXN0aW5nLmZpbmRJbmRleChcbiAgICAgICAgICAoc2tpcExpbmspID0+IHNraXBMaW5rLmtleSA9PT0gcHJldmlvdXMua2V5XG4gICAgICAgICk7XG4gICAgICAgIGlmIChmb3VuZCA+IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIGZvdW5kICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxufVxuIl19