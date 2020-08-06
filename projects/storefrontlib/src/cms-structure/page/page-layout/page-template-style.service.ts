import { ComponentRef, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { PageLayoutService } from './page-layout.service';

/**
 * Service that adds the page template as a className to the application root element. If the root
 * element is cx-storefront, the resulting DOM would look like:
 *
 * ```html
 * <cx-storefront class="LandingPageTemplate">
 *  [...]
 * <cx-storefront>
 * ```
 */
@Injectable({ providedIn: 'root' })
export class PageTemplateStyleService implements OnDestroy {
  /**
   * Keeps the subscriptions for this service so that we can unsubscribe on destroy.
   */
  protected subscription = new Subscription();

  /**
   * Holds the current page template, so we can remove previous page templates from the element classList.
   */
  protected currentTemplate: string;

  constructor(protected pageLayoutService: PageLayoutService) {}

  initialize(ref: ComponentRef<any>): void {
    const el: HTMLElement = ref.location.nativeElement;

    this.subscription.add(
      this.pageLayoutService.templateName$
        .pipe(distinctUntilChanged())
        .subscribe((template) => this.addStyleClass(el, template))
    );
  }

  /**
   * Adds the page template as a style class to the given element. If any page template
   * was added before, we clean it up.
   */
  protected addStyleClass(el: HTMLElement, template: string): void {
    // clean up previous template class binding
    if (this.currentTemplate) {
      el.classList?.remove(this.currentTemplate);
    }
    if (template) {
      this.currentTemplate = template;
      el.classList.add(this.currentTemplate);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
