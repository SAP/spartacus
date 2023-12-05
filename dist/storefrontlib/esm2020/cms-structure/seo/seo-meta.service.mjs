/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import { isNotNullable, } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@spartacus/core";
import * as i3 from "./page-meta-link.service";
export class SeoMetaService {
    constructor(ngTitle, ngMeta, pageMetaService, pageMetaLinkService) {
        this.ngTitle = ngTitle;
        this.ngMeta = ngMeta;
        this.pageMetaService = pageMetaService;
        this.pageMetaLinkService = pageMetaLinkService;
    }
    init() {
        this.subscription = this.pageMetaService
            .getMeta()
            .pipe(filter(isNotNullable))
            .subscribe((meta) => (this.meta = meta));
    }
    set meta(meta) {
        this.title = meta.title;
        this.description = meta.description;
        this.image = meta.image;
        this.robots = meta.robots;
        this.canonicalUrl = meta.canonicalUrl;
    }
    set title(title) {
        this.ngTitle.setTitle(title || '');
    }
    set description(value) {
        if (value) {
            this.addTag({ name: 'description', content: value || '' });
        }
        else {
            this.ngMeta.removeTag('name="description"');
        }
    }
    set image(imageUrl) {
        if (imageUrl) {
            this.addTag({ name: 'og:image', content: imageUrl });
        }
        else {
            this.ngMeta.removeTag('name="og:image"');
        }
    }
    set robots(value) {
        if (value && value.length > 0) {
            this.addTag({ name: 'robots', content: value.join(', ') });
        }
    }
    /**
     * Add the canonical Url to the head of the page.
     *
     * If the canonical url already exists the link is removed. This is quite
     * unlikely though, since canonical links are (typically) only added in SSR.
     */
    set canonicalUrl(url) {
        this.pageMetaLinkService?.setCanonicalLink(url);
    }
    addTag(meta) {
        if (meta.content) {
            this.ngMeta.updateTag(meta);
        }
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
SeoMetaService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SeoMetaService, deps: [{ token: i1.Title }, { token: i1.Meta }, { token: i2.PageMetaService }, { token: i3.PageMetaLinkService }], target: i0.ɵɵFactoryTarget.Injectable });
SeoMetaService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SeoMetaService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: SeoMetaService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Title }, { type: i1.Meta }, { type: i2.PageMetaService }, { type: i3.PageMetaLinkService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VvLW1ldGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvY21zLXN0cnVjdHVyZS9zZW8vc2VvLW1ldGEuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztHQUlHO0FBRUgsT0FBTyxFQUFFLFVBQVUsRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUV0RCxPQUFPLEVBQ0wsYUFBYSxHQUlkLE1BQU0saUJBQWlCLENBQUM7QUFFekIsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7OztBQU14QyxNQUFNLE9BQU8sY0FBYztJQUN6QixZQUNZLE9BQWMsRUFDZCxNQUFZLEVBQ1osZUFBZ0MsRUFDaEMsbUJBQXlDO1FBSHpDLFlBQU8sR0FBUCxPQUFPLENBQU87UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFNO1FBQ1osb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQ2hDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBc0I7SUFDbEQsQ0FBQztJQUlKLElBQUk7UUFDRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlO2FBQ3JDLE9BQU8sRUFBRTthQUNULElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDM0IsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBYyxJQUFJLENBQUMsSUFBYztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxJQUFjLEtBQUssQ0FBQyxLQUF5QjtRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQWMsV0FBVyxDQUFDLEtBQXlCO1FBQ2pELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVELElBQWMsS0FBSyxDQUFDLFFBQTRCO1FBQzlDLElBQUksUUFBUSxFQUFFO1lBQ1osSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDMUM7SUFDSCxDQUFDO0lBRUQsSUFBYyxNQUFNLENBQUMsS0FBbUM7UUFDdEQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsSUFBYyxZQUFZLENBQUMsR0FBdUI7UUFDaEQsSUFBSSxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFUyxNQUFNLENBQUMsSUFBb0I7UUFDbkMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztJQUNILENBQUM7OzJHQXZFVSxjQUFjOytHQUFkLGNBQWMsY0FGYixNQUFNOzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFNQRFgtRmlsZUNvcHlyaWdodFRleHQ6IDIwMjMgU0FQIFNwYXJ0YWN1cyB0ZWFtIDxzcGFydGFjdXMtdGVhbUBzYXAuY29tPlxuICpcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNZXRhLCBNZXRhRGVmaW5pdGlvbiwgVGl0bGUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7XG4gIGlzTm90TnVsbGFibGUsXG4gIFBhZ2VNZXRhLFxuICBQYWdlTWV0YVNlcnZpY2UsXG4gIFBhZ2VSb2JvdHNNZXRhLFxufSBmcm9tICdAc3BhcnRhY3VzL2NvcmUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBQYWdlTWV0YUxpbmtTZXJ2aWNlIH0gZnJvbSAnLi9wYWdlLW1ldGEtbGluay5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNlb01ldGFTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIG5nVGl0bGU6IFRpdGxlLFxuICAgIHByb3RlY3RlZCBuZ01ldGE6IE1ldGEsXG4gICAgcHJvdGVjdGVkIHBhZ2VNZXRhU2VydmljZTogUGFnZU1ldGFTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBwYWdlTWV0YUxpbmtTZXJ2aWNlPzogUGFnZU1ldGFMaW5rU2VydmljZVxuICApIHt9XG5cbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICBpbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5wYWdlTWV0YVNlcnZpY2VcbiAgICAgIC5nZXRNZXRhKClcbiAgICAgIC5waXBlKGZpbHRlcihpc05vdE51bGxhYmxlKSlcbiAgICAgIC5zdWJzY3JpYmUoKG1ldGEpID0+ICh0aGlzLm1ldGEgPSBtZXRhKSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0IG1ldGEobWV0YTogUGFnZU1ldGEpIHtcbiAgICB0aGlzLnRpdGxlID0gbWV0YS50aXRsZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gbWV0YS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmltYWdlID0gbWV0YS5pbWFnZTtcbiAgICB0aGlzLnJvYm90cyA9IG1ldGEucm9ib3RzO1xuICAgIHRoaXMuY2Fub25pY2FsVXJsID0gbWV0YS5jYW5vbmljYWxVcmw7XG4gIH1cblxuICBwcm90ZWN0ZWQgc2V0IHRpdGxlKHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcbiAgICB0aGlzLm5nVGl0bGUuc2V0VGl0bGUodGl0bGUgfHwgJycpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHNldCBkZXNjcmlwdGlvbih2YWx1ZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLmFkZFRhZyh7IG5hbWU6ICdkZXNjcmlwdGlvbicsIGNvbnRlbnQ6IHZhbHVlIHx8ICcnIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5nTWV0YS5yZW1vdmVUYWcoJ25hbWU9XCJkZXNjcmlwdGlvblwiJyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHNldCBpbWFnZShpbWFnZVVybDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKGltYWdlVXJsKSB7XG4gICAgICB0aGlzLmFkZFRhZyh7IG5hbWU6ICdvZzppbWFnZScsIGNvbnRlbnQ6IGltYWdlVXJsIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm5nTWV0YS5yZW1vdmVUYWcoJ25hbWU9XCJvZzppbWFnZVwiJyk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHNldCByb2JvdHModmFsdWU6IFBhZ2VSb2JvdHNNZXRhW10gfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodmFsdWUgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5hZGRUYWcoeyBuYW1lOiAncm9ib3RzJywgY29udGVudDogdmFsdWUuam9pbignLCAnKSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSBjYW5vbmljYWwgVXJsIHRvIHRoZSBoZWFkIG9mIHRoZSBwYWdlLlxuICAgKlxuICAgKiBJZiB0aGUgY2Fub25pY2FsIHVybCBhbHJlYWR5IGV4aXN0cyB0aGUgbGluayBpcyByZW1vdmVkLiBUaGlzIGlzIHF1aXRlXG4gICAqIHVubGlrZWx5IHRob3VnaCwgc2luY2UgY2Fub25pY2FsIGxpbmtzIGFyZSAodHlwaWNhbGx5KSBvbmx5IGFkZGVkIGluIFNTUi5cbiAgICovXG4gIHByb3RlY3RlZCBzZXQgY2Fub25pY2FsVXJsKHVybDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5wYWdlTWV0YUxpbmtTZXJ2aWNlPy5zZXRDYW5vbmljYWxMaW5rKHVybCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWRkVGFnKG1ldGE6IE1ldGFEZWZpbml0aW9uKTogdm9pZCB7XG4gICAgaWYgKG1ldGEuY29udGVudCkge1xuICAgICAgdGhpcy5uZ01ldGEudXBkYXRlVGFnKG1ldGEpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==