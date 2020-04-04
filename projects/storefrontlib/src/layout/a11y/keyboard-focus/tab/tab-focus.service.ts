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
    increment: MOVE_FOCUS,
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

    const firstItemOnNextSlide = this.getChildren(host, config)?.find(
      (tab) =>
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
    const childs = this.getChildren(host, config);
    let activeIndex = childs?.findIndex(
      (c) => c === this.getActiveChild(host, config)
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
   * Returns the active focusable child element. If there's no active
   * focusable child element, the first focusable child is returned.
   */
  protected getActiveChild(
    host: HTMLElement,
    config: TabFocusConfig
  ): HTMLElement {
    const persisted = this.getPersisted(host, config?.group);
    if (persisted) {
      return persisted;
    }
    const children = this.getChildren(host, config);
    let index = children.findIndex((tab) => this.isActive(tab));
    if (!index || index === -1) {
      index = 0;
    }
    return children[index];
  }

  protected getChildren(
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
   * Returns all focusable child elements of the host element.
   *
   * @param host The host element is used to query child focusable elements.
   * @param locked Indicates if locked elements (tabindex=-1) should be returned, defaults to false.
   * @param invisible Indicates if invisible child elements should be returned, defaults to false.
   */
  findFocusable(
    host: HTMLElement,
    locked = false,
    invisible = false
  ): HTMLElement[] {
    return this.selectFocusUtil.findFocusable(host, locked, invisible);
  }

  protected isActive(el: HTMLElement): boolean {
    const child = document.activeElement;
    const selector = child.tagName;

    return (
      el === child ||
      !!Array.from(el.querySelectorAll(selector)).find((e) => e === child)
    );
  }
}
