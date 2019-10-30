import { Injectable, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { GroupSkipperSlotConfig } from '../config';
import { CmsService, Page } from '../../cms';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class GroupSkipperService {
  private renderer: Renderer2;
  ob$ = this.cmsService.getCurrentPage().subscribe((page: Page) => {
    const cmsSlots = page.slots;
    const cmsSlotNames: string[] = Object.keys(cmsSlots);
    const configSlots = this.slotConfig.groupSkipper.slots;
    configSlots.forEach(configSlot => {
      if (cmsSlotNames.includes(configSlot.slot)) {
        setTimeout(() => {
          this.renderAnchorForSlot(configSlot.slot, configSlot.title);
        }, 1000);
      }
    });
  });

  constructor(
    private slotConfig: GroupSkipperSlotConfig,
    private cmsService: CmsService,
    rendererFactory: RendererFactory2,
    @Inject(DOCUMENT) private document
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  createGroupSkipperAnchor(
    renderer: Renderer2,
    element: HTMLElement,
    title: string
  ): void {
    renderer.setAttribute(element, 'tabindex', '-1');

    const anchor: Element = renderer.createElement(`a`);
    anchor.setAttribute('tabindex', '0');
    anchor.textContent = `Skip to ${title}`;
    this.addListeners(anchor, element);

    setTimeout(() => {
      const groupSkipperEl: Element = element.ownerDocument
        .getElementsByTagName('cx-group-skipper')
        .item(0);
      renderer.appendChild(groupSkipperEl, anchor);
    }, 1000);
  }

  private addListeners(anchor: Element, skipToEl: HTMLElement) {
    anchor.addEventListener('click', (e: MouseEvent) => {
      this.skipToElementEvent(e, skipToEl);
    });
    anchor.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.skipToElementEvent(e, skipToEl);
      }
    });
  }

  private skipToElementEvent(event: Event, element: HTMLElement) {
    event.preventDefault();
    element.focus();
  }

  renderAnchorForSlot(slotName: string, title: string): void {
    const slotEl: HTMLElement = <HTMLElement>(
      this.document.getElementsByClassName(slotName).item(0)
    );
    this.createGroupSkipperAnchor(this.renderer, slotEl, title);
  }
}
