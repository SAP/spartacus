import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { GroupSkipperConfig, GroupSkipperElement } from '../config/index';
import { CmsService, Page } from '../../cms/index';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslationService } from '../../i18n';

@Injectable()
export class GroupSkipperService implements OnInit, OnDestroy {
  private renderer: Renderer2;
  pageChangeSub: Subscription;

  constructor(
    protected config: GroupSkipperConfig,
    protected cmsService: CmsService,
    protected translation: TranslationService,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  ngOnInit(): void {
    this.pageChangeSub = this.cmsService
      .getCurrentPage()
      .subscribe((page: Page) => {
        this.onPageChange(page);
      });
  }

  ngOnDestroy(): void {
    this.pageChangeSub.unsubscribe();
  }

  onPageChange(page: Page): void {
    this.clearSkippers(this.getGroupSkipperEl());
    this.renderSkippersForTemplateAndSlots(this.config, page);
  }

  renderSkippersForTemplateAndSlots(
    config: GroupSkipperConfig,
    page: Page
  ): void {
    const skipperElements: GroupSkipperElement[] = config.groupSkipperElements;
    const cmsTemplate: string = page.template;
    const cmsSlotKeys: string[] = Object.keys(page.slots);
    skipperElements.forEach((element: GroupSkipperElement) => {
      if (cmsTemplate === element.name || cmsSlotKeys.includes(element.name)) {
        this.renderSkipperForTemplateOrSlot(element.name, element.title);
      }
    });
  }

  renderGroupSkipperElement(element: HTMLElement, title: string): void {
    const anchor: Element = this.renderer.createElement(`a`);
    anchor.setAttribute('tabindex', '0');
    this.translation
      .translate('groupSkipper.skipTo', {
        title: title,
      })
      .subscribe((text: string) => {
        anchor.textContent = text;
        this.enableFocusOnNonTabElement(element);
        this.addSkipperListeners(anchor, element);
        this.renderer.appendChild(this.getGroupSkipperEl(), anchor);
      });
  }

  enableFocusOnNonTabElement(element: HTMLElement): void {
    this.renderer.setAttribute(element, 'tabindex', '-1');
  }

  renderSkipperForTemplateOrSlot(name: string, title: string): void {
    const el: HTMLElement = <HTMLElement>(
      this.document.getElementsByClassName(name).item(0)
    );
    const isTemplateOrSlot =
      el && (el.tagName === 'cx-page-layout' || 'cx-page-slot');
    if (isTemplateOrSlot) {
      this.renderGroupSkipperElement(el, title);
    }
  }

  addSkipperListeners(anchor: Element, skipToEl: HTMLElement): void {
    anchor.addEventListener('click', (event: MouseEvent) => {
      this.skipToElement(event, skipToEl);
    });
    anchor.addEventListener('keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        this.skipToElement(event, skipToEl);
      }
    });
  }

  skipToElement(event: Event, element: HTMLElement): void {
    event.preventDefault();
    element.focus();
  }

  clearSkippers(groupSkipperEl: Element): void {
    if (groupSkipperEl) {
      while (groupSkipperEl.children && groupSkipperEl.children.item(0)) {
        groupSkipperEl.children.item(0).remove();
      }
    }
  }

  getGroupSkipperEl(): Element {
    return this.document.getElementsByTagName('cx-group-skipper').item(0);
  }
}
