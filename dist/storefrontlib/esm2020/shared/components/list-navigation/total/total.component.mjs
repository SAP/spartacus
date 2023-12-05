/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@spartacus/core";
export class TotalComponent {
    get pagination() {
        return this._pagination;
    }
    set pagination(paginationModel) {
        this._pagination = paginationModel ?? { totalResults: 0 };
    }
    /**
     * Current page, starting form page 0
     * */
    get currentPage() {
        return this.pagination?.currentPage ?? 0;
    }
    get pageSize() {
        return this.pagination?.pageSize ?? 0;
    }
    get totalResults() {
        return this.pagination?.totalResults ?? 0;
    }
    get fromItem() {
        return this.currentPage * this.pageSize + 1;
    }
    get toItem() {
        const lastItem = (this.currentPage + 1) * this.pageSize;
        return lastItem > this.totalResults ? this.totalResults : lastItem;
    }
}
TotalComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TotalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TotalComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "15.2.9", type: TotalComponent, selector: "cx-total", inputs: { pagination: "pagination" }, ngImport: i0, template: "<ng-container *ngIf=\"totalResults > 0\">\n  <div>{{ totalResults }} {{ 'common.results' | cxTranslate }}</div>\n  <div class=\"cx-vertical-line-separator\"></div>\n  <div>\n    {{ fromItem }}-{{ toItem }} {{ 'common.of' | cxTranslate }}\n    {{ totalResults }}\n  </div>\n</ng-container>\n", dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "pipe", type: i2.TranslatePipe, name: "cxTranslate" }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: TotalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'cx-total', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"totalResults > 0\">\n  <div>{{ totalResults }} {{ 'common.results' | cxTranslate }}</div>\n  <div class=\"cx-vertical-line-separator\"></div>\n  <div>\n    {{ fromItem }}-{{ toItem }} {{ 'common.of' | cxTranslate }}\n    {{ totalResults }}\n  </div>\n</ng-container>\n" }]
        }], propDecorators: { pagination: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG90YWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9saXN0LW5hdmlnYXRpb24vdG90YWwvdG90YWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvc3RvcmVmcm9udGxpYi9zaGFyZWQvY29tcG9uZW50cy9saXN0LW5hdmlnYXRpb24vdG90YWwvdG90YWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBUTFFLE1BQU0sT0FBTyxjQUFjO0lBR3pCLElBQUksVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsSUFBYSxVQUFVLENBQUMsZUFBNEM7UUFDbEUsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVEOztTQUVLO0lBQ0wsSUFBSSxXQUFXO1FBQ2IsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLFdBQVcsSUFBSSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxVQUFVLEVBQUUsWUFBWSxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixNQUFNLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4RCxPQUFPLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDckUsQ0FBQzs7MkdBaENVLGNBQWM7K0ZBQWQsY0FBYyxzRkNkM0Isb1NBUUE7MkZETWEsY0FBYztrQkFMMUIsU0FBUzsrQkFDRSxVQUFVLG1CQUVILHVCQUF1QixDQUFDLE1BQU07OEJBUWxDLFVBQVU7c0JBQXRCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogU1BEWC1GaWxlQ29weXJpZ2h0VGV4dDogMjAyMyBTQVAgU3BhcnRhY3VzIHRlYW0gPHNwYXJ0YWN1cy10ZWFtQHNhcC5jb20+XG4gKlxuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbk1vZGVsIH0gZnJvbSAnQHNwYXJ0YWN1cy9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY3gtdG90YWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vdG90YWwuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgVG90YWxDb21wb25lbnQge1xuICBwcml2YXRlIF9wYWdpbmF0aW9uOiBQYWdpbmF0aW9uTW9kZWw7XG5cbiAgZ2V0IHBhZ2luYXRpb24oKTogUGFnaW5hdGlvbk1vZGVsIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnaW5hdGlvbjtcbiAgfVxuICBASW5wdXQoKSBzZXQgcGFnaW5hdGlvbihwYWdpbmF0aW9uTW9kZWw6IFBhZ2luYXRpb25Nb2RlbCB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX3BhZ2luYXRpb24gPSBwYWdpbmF0aW9uTW9kZWwgPz8geyB0b3RhbFJlc3VsdHM6IDAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDdXJyZW50IHBhZ2UsIHN0YXJ0aW5nIGZvcm0gcGFnZSAwXG4gICAqICovXG4gIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2luYXRpb24/LmN1cnJlbnRQYWdlID8/IDA7XG4gIH1cblxuICBnZXQgcGFnZVNpemUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wYWdpbmF0aW9uPy5wYWdlU2l6ZSA/PyAwO1xuICB9XG5cbiAgZ2V0IHRvdGFsUmVzdWx0cygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnBhZ2luYXRpb24/LnRvdGFsUmVzdWx0cyA/PyAwO1xuICB9XG5cbiAgZ2V0IGZyb21JdGVtKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlICogdGhpcy5wYWdlU2l6ZSArIDE7XG4gIH1cblxuICBnZXQgdG9JdGVtKCkge1xuICAgIGNvbnN0IGxhc3RJdGVtID0gKHRoaXMuY3VycmVudFBhZ2UgKyAxKSAqIHRoaXMucGFnZVNpemU7XG4gICAgcmV0dXJuIGxhc3RJdGVtID4gdGhpcy50b3RhbFJlc3VsdHMgPyB0aGlzLnRvdGFsUmVzdWx0cyA6IGxhc3RJdGVtO1xuICB9XG59XG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwidG90YWxSZXN1bHRzID4gMFwiPlxuICA8ZGl2Pnt7IHRvdGFsUmVzdWx0cyB9fSB7eyAnY29tbW9uLnJlc3VsdHMnIHwgY3hUcmFuc2xhdGUgfX08L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImN4LXZlcnRpY2FsLWxpbmUtc2VwYXJhdG9yXCI+PC9kaXY+XG4gIDxkaXY+XG4gICAge3sgZnJvbUl0ZW0gfX0te3sgdG9JdGVtIH19IHt7ICdjb21tb24ub2YnIHwgY3hUcmFuc2xhdGUgfX1cbiAgICB7eyB0b3RhbFJlc3VsdHMgfX1cbiAgPC9kaXY+XG48L25nLWNvbnRhaW5lcj5cbiJdfQ==