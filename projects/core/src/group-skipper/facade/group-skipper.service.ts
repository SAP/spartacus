import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Inject,
  OnDestroy,
} from '@angular/core';
import { GroupSkipperConfig, GroupSkipperElement } from '../config';
import { CmsService, Page } from '../../cms';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Injectable()
export class GroupSkipperService implements OnDestroy {
  private renderer: Renderer2;
  private pageSub: Subscription = this.cmsService
    .getCurrentPage()
    .subscribe((page: Page) => {
      this.pageSubscription(page);
    });

  constructor(
    private config: GroupSkipperConfig,
    private cmsService: CmsService,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnDestroy(): void {
    this.pageSub.unsubscribe();
  }

  pageSubscription(page) {
    this.clearSkippers(this.getGroupSkipperEl());

    const cmsTemplate: string = page.template;
    const cmsSlots: string[] = Object.keys(page.slots);

    const skipperElements: GroupSkipperElement[] = this.config.groupSkipper;

    skipperElements.forEach((element: GroupSkipperElement) => {
      if (cmsSlots.includes(element.id) || element.id === cmsTemplate) {
        setTimeout(() => {
          this.renderSkipperForTemplate(element.id, element.title);
        });
      }
    });
  }

  renderGroupSkipperElement(element: HTMLElement, title: string): void {
    const anchor: Element = this.renderer.createElement(`a`);
    anchor.setAttribute('tabindex', '0');
    anchor.textContent = `Skip to ${title}`;
    this.enableFocusOnNonTabElement(element);
    this.addSkipperListeners(anchor, element);
    this.renderer.appendChild(this.getGroupSkipperEl(), anchor);
  }

  private enableFocusOnNonTabElement(element: HTMLElement): void {
    this.renderer.setAttribute(element, 'tabindex', '-1');
  }

  private renderSkipperForTemplate(name: string, title: string): void {
    const slotEl: HTMLElement = <HTMLElement>(
      this.document.getElementsByClassName(name).item(0)
    );
    const isTemplateOrSlot =
      slotEl.tagName === 'cx-page-template' || 'cx-page-slot';
    if (isTemplateOrSlot) {
      this.renderGroupSkipperElement(slotEl, title);
    }
  }

  private addSkipperListeners(anchor: Element, skipToEl: HTMLElement): void {
    anchor.addEventListener('click', (event: MouseEvent) => {
      this.skipToElement(event, skipToEl);
    });
    anchor.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.skipToElement(event, skipToEl);
      }
    });
  }

  private skipToElement(event: Event, element: HTMLElement): void {
    event.preventDefault();
    element.focus();
  }

  private clearSkippers(groupSkipperEl: Element): void {
    if (groupSkipperEl) {
      while (groupSkipperEl.children && groupSkipperEl.children.item(0)) {
        groupSkipperEl.children.item(0).remove();
      }
    }
  }

  private getGroupSkipperEl(): Element {
    return this.document.getElementsByTagName('cx-group-skipper').item(0);
  }
}
