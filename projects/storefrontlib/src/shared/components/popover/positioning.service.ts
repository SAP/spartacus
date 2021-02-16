import { Injectable } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { PopoverPosition, PopoverPositionArray } from './popover.model';

@Injectable({
  providedIn: 'root',
})
export class PositioningService {
  protected get allowedPlacements(): Array<PopoverPositionArray> {
    return [
      'top',
      'bottom',
      'left',
      'right',
      'top-left',
      'top-right',
      'bottom-left',
      'bottom-right',
      'left-top',
      'left-bottom',
      'right-top',
      'right-bottom',
    ];
  }

  protected get placementSeparator(): RegExp {
    return /\s+/;
  }

  protected get window(): Window {
    return this.winRef.nativeWindow;
  }

  constructor(protected winRef: WindowRef) {}

  protected getAllStyles(element: HTMLElement) {
    return this.window?.getComputedStyle(element);
  }

  protected getStyle(element: HTMLElement, prop: string): string {
    return this.getAllStyles(element)[prop];
  }

  protected isStaticPositioned(element: HTMLElement): boolean {
    return (this.getStyle(element, 'position') || 'static') === 'static';
  }

  protected offsetParent(element: HTMLElement): HTMLElement {
    let offsetParentEl =
      <HTMLElement>element.offsetParent || document.documentElement;

    while (
      offsetParentEl &&
      offsetParentEl !== document.documentElement &&
      this.isStaticPositioned(offsetParentEl)
    ) {
      offsetParentEl = <HTMLElement>offsetParentEl.offsetParent;
    }

    return offsetParentEl || document.documentElement;
  }

  protected position(element: HTMLElement, round = true): ClientRect {
    let elPosition: ClientRect;
    let parentOffset: ClientRect = {
      width: 0,
      height: 0,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    };

    if (this.getStyle(element, 'position') === 'fixed') {
      elPosition = element.getBoundingClientRect();
      elPosition = {
        top: elPosition.top,
        bottom: elPosition.bottom,
        left: elPosition.left,
        right: elPosition.right,
        height: elPosition.height,
        width: elPosition.width,
      };
    } else {
      const offsetParentEl = this.offsetParent(element);

      elPosition = this.offset(element, false);

      if (offsetParentEl !== document.documentElement) {
        parentOffset = this.offset(offsetParentEl, false);
      }

      parentOffset.top += offsetParentEl.clientTop;
      parentOffset.left += offsetParentEl.clientLeft;
    }

    elPosition.top -= parentOffset.top;
    elPosition.bottom -= parentOffset.top;
    elPosition.left -= parentOffset.left;
    elPosition.right -= parentOffset.left;

    if (round) {
      elPosition.top = Math.round(elPosition.top);
      elPosition.bottom = Math.round(elPosition.bottom);
      elPosition.left = Math.round(elPosition.left);
      elPosition.right = Math.round(elPosition.right);
    }

    return elPosition;
  }

  protected offset(element: HTMLElement, round = true): ClientRect {
    const elBcr = element.getBoundingClientRect();
    const viewportOffset = {
      top: this.window?.pageYOffset - document.documentElement.clientTop,
      left: this.window?.pageXOffset - document.documentElement.clientLeft,
    };

    let elOffset = {
      height: elBcr.height || element.offsetHeight,
      width: elBcr.width || element.offsetWidth,
      top: elBcr.top + viewportOffset.top,
      bottom: elBcr.bottom + viewportOffset.top,
      left: elBcr.left + viewportOffset.left,
      right: elBcr.right + viewportOffset.left,
    };

    if (round) {
      elOffset.height = Math.round(elOffset.height);
      elOffset.width = Math.round(elOffset.width);
      elOffset.top = Math.round(elOffset.top);
      elOffset.bottom = Math.round(elOffset.bottom);
      elOffset.left = Math.round(elOffset.left);
      elOffset.right = Math.round(elOffset.right);
    }

    return elOffset;
  }

  /*
    Return false if the element to position is outside the viewport
  */
  protected _positionElements(
    hostElement: HTMLElement,
    targetElement: HTMLElement,
    placement: string,
    appendToBody?: boolean
  ): boolean {
    const [
      placementPrimary = 'top',
      placementSecondary = 'center',
    ] = placement.split('-');

    const hostElPosition = appendToBody
      ? this.offset(hostElement, false)
      : this.position(hostElement, false);
    const targetElStyles = this.getAllStyles(targetElement);

    const marginTop = parseFloat(targetElStyles.marginTop);
    const marginBottom = parseFloat(targetElStyles.marginBottom);
    const marginLeft = parseFloat(targetElStyles.marginLeft);
    const marginRight = parseFloat(targetElStyles.marginRight);

    let topPosition = 0;
    let leftPosition = 0;

    switch (placementPrimary) {
      case 'top':
        topPosition =
          hostElPosition.top -
          (targetElement.offsetHeight + marginTop + marginBottom);
        break;
      case 'bottom':
        topPosition = hostElPosition.top + hostElPosition.height;
        break;
      case 'left':
        leftPosition =
          hostElPosition.left -
          (targetElement.offsetWidth + marginLeft + marginRight);
        break;
      case 'right':
        leftPosition = hostElPosition.left + hostElPosition.width;
        break;
    }

    switch (placementSecondary) {
      case 'top':
        topPosition = hostElPosition.top;
        break;
      case 'bottom':
        topPosition =
          hostElPosition.top +
          hostElPosition.height -
          targetElement.offsetHeight;
        break;
      case 'left':
        leftPosition = hostElPosition.left;
        break;
      case 'right':
        leftPosition =
          hostElPosition.left +
          hostElPosition.width -
          targetElement.offsetWidth;
        break;
      case 'center':
        if (placementPrimary === 'top' || placementPrimary === 'bottom') {
          leftPosition =
            hostElPosition.left +
            hostElPosition.width / 2 -
            targetElement.offsetWidth / 2;
        } else {
          topPosition =
            hostElPosition.top +
            hostElPosition.height / 2 -
            targetElement.offsetHeight / 2;
        }
        break;
    }

    /// The translate3d/gpu acceleration render a blurry text on chrome, the next line is commented until a browser fix
    // targetElement.style.transform = `translate3d(${Math.round(leftPosition)}px, ${Math.floor(topPosition)}px, 0px)`;
    targetElement.style.transform = `translate(${Math.round(
      leftPosition
    )}px, ${Math.round(topPosition)}px)`;

    // Check if the targetElement is inside the viewport
    const targetElBCR = targetElement.getBoundingClientRect();
    const html = document.documentElement;
    const windowHeight = this.window?.innerHeight || html.clientHeight;
    const windowWidth = this.window?.innerWidth || html.clientWidth;

    return (
      targetElBCR.left >= 0 &&
      targetElBCR.top >= 0 &&
      targetElBCR.right <= windowWidth &&
      targetElBCR.bottom <= windowHeight
    );
  }

  protected addClassesToTarget(
    targetPlacement: PopoverPosition,
    baseClass,
    classList
  ): Array<string> {
    const [primary, secondary] = targetPlacement.split('-');
    const classes: string[] = [];
    if (baseClass) {
      classes.push(`${baseClass}-${primary}`);
      if (secondary) {
        classes.push(`${baseClass}-${primary}-${secondary}`);
      }

      classes.forEach((classname) => {
        classList.add(classname);
      });
    }
    return classes;
  }

  /*
   * Accept the placement array and applies the appropriate placement dependent on the viewport.
   * Returns the applied placement.
   * In case of auto placement, placements are selected in order
   *   'top', 'bottom', 'left', 'right',
   *   'top-left', 'top-right',
   *   'bottom-left', 'bottom-right',
   *   'left-top', 'left-bottom',
   *   'right-top', 'right-bottom'.
   * */
  positionElements(
    hostElement: HTMLElement,
    targetElement: HTMLElement,
    placement: string | PopoverPosition | PopoverPositionArray,
    appendToBody?: boolean,
    baseClass?: string
  ): PopoverPosition | null {
    let placementVals: Array<PopoverPosition> = Array.isArray(placement)
      ? placement
      : (placement.split(this.placementSeparator) as Array<PopoverPosition>);

    const classList = targetElement.classList;

    // Remove old placement classes to avoid issues
    if (baseClass) {
      this.allowedPlacements.forEach((placementToRemove) => {
        classList.remove(`${baseClass}-${placementToRemove}`);
      });
    }

    // replace auto placement with other placements
    let hasAuto = placementVals.findIndex((val) => val === 'auto');
    if (hasAuto >= 0) {
      this.allowedPlacements.forEach(function (obj) {
        if (placementVals.find((val) => val.search('^' + obj) !== -1) == null) {
          placementVals.splice(hasAuto++, 1, obj as PopoverPosition);
        }
      });
    }

    // coordinates where to position

    // Required for transform:
    const style = targetElement.style;
    style.position = 'absolute';
    style.top = '0';
    style.left = '0';
    style['will-change'] = 'transform';

    let testPlacement: PopoverPosition | null = null;
    let isInViewport = false;
    for (testPlacement of placementVals) {
      let addedClasses = this.addClassesToTarget(
        testPlacement,
        baseClass,
        classList
      );

      if (
        this._positionElements(
          hostElement,
          targetElement,
          testPlacement,
          appendToBody
        )
      ) {
        isInViewport = true;
        break;
      }

      // Remove the baseClasses for further calculation
      if (baseClass) {
        addedClasses.forEach((classname) => {
          classList.remove(classname);
        });
      }
    }

    if (!isInViewport) {
      // If nothing match, the first placement is the default one
      testPlacement = placementVals[0];
      this.addClassesToTarget(testPlacement, baseClass, classList);
      this._positionElements(
        hostElement,
        targetElement,
        testPlacement,
        appendToBody
      );
    }

    return testPlacement;
  }
}
