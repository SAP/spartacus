import { Injectable } from '@angular/core';
import { AutoFocusService } from '../autofocus/auto-focus.service';
import { MOVE_FOCUS, TabFocusConfig } from '../keyboard-focus.model';

@Injectable({
  providedIn: 'root',
})
export class TabFocusService extends AutoFocusService {
  /**
   * Moves to the next (or previous) tab.
   */
  moveTab(
    host: HTMLElement,
    config: TabFocusConfig,
    increment: number,
    event: KeyboardEvent
  ): void {
    if (config?.tab) {
      const next =
        config.tab === 'scroll'
          ? this.findNextScrollable(host, config, increment)
          : this.findNext(host, config, increment);

      next?.focus();

      event.preventDefault();
      event.stopPropagation();
    }
  }

  /**
   * builds out virtual slides out of the full scrollable area, to allow
   * for maximum flexibility for the underlying layout without using hardcoded
   * slide sizes.
   */
  protected findNextScrollable(
    host: HTMLElement,
    config: TabFocusConfig,
    increment: MOVE_FOCUS
  ): HTMLElement {
    const active = this.getActiveChild(host, config);

    if (!active) {
      return;
    }
    // slide count
    const virtualSlideCount = Math.round(host.scrollWidth / host.clientWidth);

    // find current virtual slide
    const currentVirtualSlide = Math.round(
      active.offsetLeft / (host.scrollWidth / virtualSlideCount)
    );

    let nextVirtualSlide = currentVirtualSlide + increment;
    if (
      increment === MOVE_FOCUS.NEXT &&
      nextVirtualSlide >= virtualSlideCount
    ) {
      nextVirtualSlide = 0;
    }
    if (increment === MOVE_FOCUS.PREV && nextVirtualSlide < 0) {
      nextVirtualSlide = virtualSlideCount - 1;
    }

    const firstItemOnNextSlide = this.getChilds(host, config)?.find(
      tab =>
        tab.offsetLeft >=
        (host.scrollWidth / virtualSlideCount) * nextVirtualSlide
    );

    return firstItemOnNextSlide;
  }

  protected findNext(
    host: HTMLElement,
    config: TabFocusConfig,
    increment: MOVE_FOCUS
  ): HTMLElement {
    const childs = this.getChilds(host, config);
    let activeIndex = childs?.findIndex(
      c => c === this.getActiveChild(host, config)
    );

    if (!activeIndex || activeIndex === -1) {
      activeIndex = 0;
    }
    activeIndex += increment;

    if (increment === MOVE_FOCUS.NEXT && activeIndex >= childs?.length) {
      activeIndex = childs.length - 1;
    }
    if (increment === MOVE_FOCUS.PREV && activeIndex < 0) {
      activeIndex = 0;
    }
    return childs ? childs[activeIndex] : undefined;
  }

  /**
   * finds the active child (if any) of the child elements.
   * Defaults to the first child, if no active available.
   */
  protected getActiveChild(
    host: HTMLElement,
    config: TabFocusConfig
  ): HTMLElement {
    const persisted = this.getPersisted(host, config?.group);
    if (persisted) {
      return persisted;
    }
    let index = this.getChilds(host, config)?.findIndex(tab =>
      this.isActive(tab)
    );
    if (!index || index === -1) {
      index = 0;
    }
    return this.getChilds(host, config)[index];
  }

  // considering dropping the config or tab
  protected getChilds(
    host: HTMLElement,
    config: TabFocusConfig
  ): HTMLElement[] {
    if (typeof config.tab === 'string' && config.tab !== 'scroll') {
      return this.selectFocusUtil.query(host, config.tab);
    } else {
      return this.findFocusable(host, true);
    }
  }

  /**
   * returns all focusable child elements of the host element.
   */
  findFocusable(host: HTMLElement, locked = false): HTMLElement[] {
    return this.selectFocusUtil.findFocusable(host, locked);
  }

  protected isActive(el: HTMLElement): boolean {
    const child = document.activeElement;
    const selector = child.tagName;

    return (
      el === child ||
      !!Array.from(el.querySelectorAll(selector)).find(e => e === child)
    );
  }
}
