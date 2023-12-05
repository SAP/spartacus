/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@spartacus/core";
export class PositioningService {
    constructor(winRef) {
        this.winRef = winRef;
    }
    get allowedPlacements() {
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
    get placementSeparator() {
        return /\s+/;
    }
    get window() {
        return this.winRef.nativeWindow;
    }
    get document() {
        return this.winRef.document;
    }
    getAllStyles(element) {
        return this.window?.getComputedStyle(element);
    }
    getPositionStyleProperty(element) {
        const styles = this.getAllStyles(element);
        if (styles) {
            return styles['position'] || undefined;
        }
    }
    isStaticPositioned(element) {
        return (this.getPositionStyleProperty(element) || 'static') === 'static';
    }
    offsetParent(element) {
        let offsetParentEl = element.offsetParent || this.document.documentElement;
        while (offsetParentEl &&
            offsetParentEl !== this.document.documentElement &&
            this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
        }
        return offsetParentEl || this.document.documentElement;
    }
    position(element, round = true) {
        let elPosition;
        let parentOffset = {
            width: 0,
            height: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
        };
        if (this.getPositionStyleProperty(element) === 'fixed') {
            elPosition = element.getBoundingClientRect();
            elPosition = {
                top: elPosition.top,
                bottom: elPosition.bottom,
                left: elPosition.left,
                right: elPosition.right,
                height: elPosition.height,
                width: elPosition.width,
            };
        }
        else {
            const offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== this.document.documentElement) {
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
    offset(element, round = true) {
        const elBcr = element.getBoundingClientRect();
        const viewportOffset = {
            top: (this.window &&
                this.window.pageYOffset - this.document.documentElement.clientTop) ||
                0,
            left: (this.window &&
                this.window.pageXOffset - this.document.documentElement.clientLeft) ||
                0,
        };
        const elOffset = {
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
      Return false if the element to position is outside the viewport.
    */
    _positionElements(hostElement, targetElement, placement, appendToBody) {
        const [placementPrimary = 'top', placementSecondary = 'center'] = placement.split('-');
        const hostElPosition = appendToBody
            ? this.offset(hostElement, false)
            : this.position(hostElement, false);
        const targetElStyles = this.getAllStyles(targetElement);
        if (targetElStyles) {
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
                    }
                    else {
                        topPosition =
                            hostElPosition.top +
                                hostElPosition.height / 2 -
                                targetElement.offsetHeight / 2;
                    }
                    break;
            }
            targetElement.style.transform = `translate(${Math.round(leftPosition)}px, ${Math.round(topPosition)}px)`;
            // Check if the targetElement is inside the viewport
            const targetElBCR = targetElement.getBoundingClientRect();
            const html = this.document.documentElement;
            const windowHeight = this.window?.innerHeight || html.clientHeight;
            const windowWidth = this.window?.innerWidth || html.clientWidth;
            return (targetElBCR.left >= 0 &&
                targetElBCR.top >= 0 &&
                targetElBCR.right <= windowWidth &&
                targetElBCR.bottom <= windowHeight);
        }
        return false;
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
    positionElements(hostElement, targetElement, placement, appendToBody) {
        const placementVals = Array.isArray(placement)
            ? placement
            : placement.split(this.placementSeparator);
        let hasAuto = placementVals.findIndex((val) => val === 'auto');
        if (hasAuto >= 0) {
            this.allowedPlacements.forEach((obj) => {
                if (placementVals.find((val) => val.search('^' + obj) !== -1) == null) {
                    placementVals.splice(hasAuto++, 1, obj);
                }
            });
        }
        const style = targetElement.style;
        style.position = 'absolute';
        style.top = '0';
        style.left = '0';
        let testPlacement = 'auto';
        let isInViewport = false;
        for (testPlacement of placementVals) {
            if (this._positionElements(hostElement, targetElement, testPlacement, appendToBody)) {
                isInViewport = true;
                break;
            }
        }
        if (!isInViewport) {
            this._positionElements(hostElement, targetElement, testPlacement, appendToBody);
        }
        return testPlacement;
    }
    getPositioningClass(position, autoPositioning) {
        let positionClass = `${position || 'top'}`;
        if (autoPositioning && positionClass !== 'auto') {
            positionClass = `${positionClass} auto`;
        }
        return positionClass;
    }
}
PositioningService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PositioningService, deps: [{ token: i1.WindowRef }], target: i0.ɵɵFactoryTarget.Injectable });
PositioningService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PositioningService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.9", ngImport: i0, type: PositioningService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.WindowRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3N0b3JlZnJvbnRsaWIvc2hhcmVkL3NlcnZpY2VzL3Bvc2l0aW9uaW5nL3Bvc2l0aW9uaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7R0FJRztBQUVILE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQW9CM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUFzQixNQUFpQjtRQUFqQixXQUFNLEdBQU4sTUFBTSxDQUFXO0lBQUcsQ0FBQztJQUUzQyxJQUFjLGlCQUFpQjtRQUM3QixPQUFPO1lBQ0wsS0FBSztZQUNMLFFBQVE7WUFDUixNQUFNO1lBQ04sT0FBTztZQUNQLFVBQVU7WUFDVixXQUFXO1lBQ1gsYUFBYTtZQUNiLGNBQWM7WUFDZCxVQUFVO1lBQ1YsYUFBYTtZQUNiLFdBQVc7WUFDWCxjQUFjO1NBQ2YsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFjLGtCQUFrQjtRQUM5QixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxJQUFjLE1BQU07UUFDbEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQztJQUNsQyxDQUFDO0lBRUQsSUFBYyxRQUFRO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDOUIsQ0FBQztJQUVTLFlBQVksQ0FDcEIsT0FBb0I7UUFFcEIsT0FBTyxJQUFJLENBQUMsTUFBTSxFQUFFLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFUyx3QkFBd0IsQ0FBQyxPQUFvQjtRQUNyRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTFDLElBQUksTUFBTSxFQUFFO1lBQ1YsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUks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RUFDRDtnQkFDQSxZQUFZLEdBQUcsSUFBSSxDQUFDO2dCQUNwQixNQUFNO2FBQ1A7U0FDRjtRQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDakIsSUFBSSxDQUFDLGlCQUFpQixDQUNwQixXQUFXLEVBQ1gsYUFBYSxFQUNiLGFBQWEsRUFDYixZQUFZLENBQ2IsQ0FBQztTQUNIO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztJQUVELG1CQUFtQixDQUNqQixRQUEwQixFQUMxQixlQUF5QjtRQUV6QixJQUFJLGFBQWEsR0FBRyxHQUFHLFFBQVEsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMzQyxJQUFJLGVBQWUsSUFBSSxhQUFhLEtBQUssTUFBTSxFQUFFO1lBQy9DLGFBQWEsR0FBRyxHQUFHLGFBQWEsT0FBTyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQzs7K0dBaFVVLGtCQUFrQjttSEFBbEIsa0JBQWtCLGNBRmpCLE1BQU07MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBTUERYLUZpbGVDb3B5cmlnaHRUZXh0OiAyMDIzIFNBUCBTcGFydGFjdXMgdGVhbSA8c3BhcnRhY3VzLXRlYW1Ac2FwLmNvbT5cbiAqXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJ0BzcGFydGFjdXMvY29yZSc7XG5pbXBvcnQge1xuICBQb3BvdmVyUG9zaXRpb24sXG4gIFBvcG92ZXJQb3NpdGlvbkFycmF5LFxufSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BvcG92ZXIvcG9wb3Zlci5tb2RlbCc7XG5cbi8vIHJlcGxhY2VtZW50IGZvciB0aGUgYENsaWVudFJlY3RgIGZyb20gVHlwZVNjcmlwdCA0LjIsIHdoaWNoIHdhcyByZW1vdmVkIGluIDQuNFxuZXhwb3J0IGludGVyZmFjZSBVSVBvc2l0aW9uUmVjdGFuZ2xlIHtcbiAgYm90dG9tOiBudW1iZXI7XG4gIGhlaWdodDogbnVtYmVyO1xuICBsZWZ0OiBudW1iZXI7XG4gIHJpZ2h0OiBudW1iZXI7XG4gIHRvcDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUG9zaXRpb25pbmdTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHdpblJlZjogV2luZG93UmVmKSB7fVxuXG4gIHByb3RlY3RlZCBnZXQgYWxsb3dlZFBsYWNlbWVudHMoKTogQXJyYXk8UG9wb3ZlclBvc2l0aW9uQXJyYXk+IHtcbiAgICByZXR1cm4gW1xuICAgICAgJ3RvcCcsXG4gICAgICAnYm90dG9tJyxcbiAgICAgICdsZWZ0JyxcbiAgICAgICdyaWdodCcsXG4gICAgICAndG9wLWxlZnQnLFxuICAgICAgJ3RvcC1yaWdodCcsXG4gICAgICAnYm90dG9tLWxlZnQnLFxuICAgICAgJ2JvdHRvbS1yaWdodCcsXG4gICAgICAnbGVmdC10b3AnLFxuICAgICAgJ2xlZnQtYm90dG9tJyxcbiAgICAgICdyaWdodC10b3AnLFxuICAgICAgJ3JpZ2h0LWJvdHRvbScsXG4gICAgXTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgcGxhY2VtZW50U2VwYXJhdG9yKCk6IFJlZ0V4cCB7XG4gICAgcmV0dXJuIC9cXHMrLztcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgd2luZG93KCk6IFdpbmRvdyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMud2luUmVmLm5hdGl2ZVdpbmRvdztcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXQgZG9jdW1lbnQoKTogRG9jdW1lbnQge1xuICAgIHJldHVybiB0aGlzLndpblJlZi5kb2N1bWVudDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRBbGxTdHlsZXMoXG4gICAgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgKTogQ1NTU3R5bGVEZWNsYXJhdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMud2luZG93Py5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBvc2l0aW9uU3R5bGVQcm9wZXJ0eShlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5nZXRBbGxTdHlsZXMoZWxlbWVudCk7XG5cbiAgICBpZiAoc3R5bGVzKSB7XG4gICAgICByZXR1cm4gc3R5bGVzWydwb3NpdGlvbiddIHx8IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgaXNTdGF0aWNQb3NpdGlvbmVkKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLmdldFBvc2l0aW9uU3R5bGVQcm9wZXJ0eShlbGVtZW50KSB8fCAnc3RhdGljJykgPT09ICdzdGF0aWMnO1xuICB9XG5cbiAgcHJvdGVjdGVkIG9mZnNldFBhcmVudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IEhUTUxFbGVtZW50IHtcbiAgICBsZXQgb2Zmc2V0UGFyZW50RWwgPVxuICAgICAgPEhUTUxFbGVtZW50PmVsZW1lbnQub2Zmc2V0UGFyZW50IHx8IHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKFxuICAgICAgb2Zmc2V0UGFyZW50RWwgJiZcbiAgICAgIG9mZnNldFBhcmVudEVsICE9PSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJlxuICAgICAgdGhpcy5pc1N0YXRpY1Bvc2l0aW9uZWQob2Zmc2V0UGFyZW50RWwpXG4gICAgKSB7XG4gICAgICBvZmZzZXRQYXJlbnRFbCA9IDxIVE1MRWxlbWVudD5vZmZzZXRQYXJlbnRFbC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFBhcmVudEVsIHx8IHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgcHJvdGVjdGVkIHBvc2l0aW9uKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBVSVBvc2l0aW9uUmVjdGFuZ2xlIHtcbiAgICBsZXQgZWxQb3NpdGlvbjogVUlQb3NpdGlvblJlY3RhbmdsZTtcbiAgICBsZXQgcGFyZW50T2Zmc2V0OiBVSVBvc2l0aW9uUmVjdGFuZ2xlID0ge1xuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICB0b3A6IDAsXG4gICAgICBib3R0b206IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgcmlnaHQ6IDAsXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmdldFBvc2l0aW9uU3R5bGVQcm9wZXJ0eShlbGVtZW50KSA9PT0gJ2ZpeGVkJykge1xuICAgICAgZWxQb3NpdGlvbiA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBlbFBvc2l0aW9uID0ge1xuICAgICAgICB0b3A6IGVsUG9zaXRpb24udG9wLFxuICAgICAgICBib3R0b206IGVsUG9zaXRpb24uYm90dG9tLFxuICAgICAgICBsZWZ0OiBlbFBvc2l0aW9uLmxlZnQsXG4gICAgICAgIHJpZ2h0OiBlbFBvc2l0aW9uLnJpZ2h0LFxuICAgICAgICBoZWlnaHQ6IGVsUG9zaXRpb24uaGVpZ2h0LFxuICAgICAgICB3aWR0aDogZWxQb3NpdGlvbi53aWR0aCxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG9mZnNldFBhcmVudEVsID0gdGhpcy5vZmZzZXRQYXJlbnQoZWxlbWVudCk7XG5cbiAgICAgIGVsUG9zaXRpb24gPSB0aGlzLm9mZnNldChlbGVtZW50LCBmYWxzZSk7XG5cbiAgICAgIGlmIChvZmZzZXRQYXJlbnRFbCAhPT0gdGhpcy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgcGFyZW50T2Zmc2V0ID0gdGhpcy5vZmZzZXQob2Zmc2V0UGFyZW50RWwsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgcGFyZW50T2Zmc2V0LnRvcCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRUb3A7XG4gICAgICBwYXJlbnRPZmZzZXQubGVmdCArPSBvZmZzZXRQYXJlbnRFbC5jbGllbnRMZWZ0O1xuICAgIH1cblxuICAgIGVsUG9zaXRpb24udG9wIC09IHBhcmVudE9mZnNldC50b3A7XG4gICAgZWxQb3NpdGlvbi5ib3R0b20gLT0gcGFyZW50T2Zmc2V0LnRvcDtcbiAgICBlbFBvc2l0aW9uLmxlZnQgLT0gcGFyZW50T2Zmc2V0LmxlZnQ7XG4gICAgZWxQb3NpdGlvbi5yaWdodCAtPSBwYXJlbnRPZmZzZXQubGVmdDtcblxuICAgIGlmIChyb3VuZCkge1xuICAgICAgZWxQb3NpdGlvbi50b3AgPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24udG9wKTtcbiAgICAgIGVsUG9zaXRpb24uYm90dG9tID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLmJvdHRvbSk7XG4gICAgICBlbFBvc2l0aW9uLmxlZnQgPSBNYXRoLnJvdW5kKGVsUG9zaXRpb24ubGVmdCk7XG4gICAgICBlbFBvc2l0aW9uLnJpZ2h0ID0gTWF0aC5yb3VuZChlbFBvc2l0aW9uLnJpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxQb3NpdGlvbjtcbiAgfVxuXG4gIHByb3RlY3RlZCBvZmZzZXQoZWxlbWVudDogSFRNTEVsZW1lbnQsIHJvdW5kID0gdHJ1ZSk6IFVJUG9zaXRpb25SZWN0YW5nbGUge1xuICAgIGNvbnN0IGVsQmNyID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCB2aWV3cG9ydE9mZnNldCA9IHtcbiAgICAgIHRvcDpcbiAgICAgICAgKHRoaXMud2luZG93ICYmXG4gICAgICAgICAgdGhpcy53aW5kb3cucGFnZVlPZmZzZXQgLSB0aGlzLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRUb3ApIHx8XG4gICAgICAgIDAsXG4gICAgICBsZWZ0OlxuICAgICAgICAodGhpcy53aW5kb3cgJiZcbiAgICAgICAgICB0aGlzLndpbmRvdy5wYWdlWE9mZnNldCAtIHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudExlZnQpIHx8XG4gICAgICAgIDAsXG4gICAgfTtcblxuICAgIGNvbnN0IGVsT2Zmc2V0ID0ge1xuICAgICAgaGVpZ2h0OiBlbEJjci5oZWlnaHQgfHwgZWxlbWVudC5vZmZzZXRIZWlnaHQsXG4gICAgICB3aWR0aDogZWxCY3Iud2lkdGggfHwgZWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgIHRvcDogZWxCY3IudG9wICsgdmlld3BvcnRPZmZzZXQudG9wLFxuICAgICAgYm90dG9tOiBlbEJjci5ib3R0b20gKyB2aWV3cG9ydE9mZnNldC50b3AsXG4gICAgICBsZWZ0OiBlbEJjci5sZWZ0ICsgdmlld3BvcnRPZmZzZXQubGVmdCxcbiAgICAgIHJpZ2h0OiBlbEJjci5yaWdodCArIHZpZXdwb3J0T2Zmc2V0LmxlZnQsXG4gICAgfTtcblxuICAgIGlmIChyb3VuZCkge1xuICAgICAgZWxPZmZzZXQuaGVpZ2h0ID0gTWF0aC5yb3VuZChlbE9mZnNldC5oZWlnaHQpO1xuICAgICAgZWxPZmZzZXQud2lkdGggPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LndpZHRoKTtcbiAgICAgIGVsT2Zmc2V0LnRvcCA9IE1hdGgucm91bmQoZWxPZmZzZXQudG9wKTtcbiAgICAgIGVsT2Zmc2V0LmJvdHRvbSA9IE1hdGgucm91bmQoZWxPZmZzZXQuYm90dG9tKTtcbiAgICAgIGVsT2Zmc2V0LmxlZnQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LmxlZnQpO1xuICAgICAgZWxPZmZzZXQucmlnaHQgPSBNYXRoLnJvdW5kKGVsT2Zmc2V0LnJpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWxPZmZzZXQ7XG4gIH1cblxuICAvKlxuICAgIFJldHVybiBmYWxzZSBpZiB0aGUgZWxlbWVudCB0byBwb3NpdGlvbiBpcyBvdXRzaWRlIHRoZSB2aWV3cG9ydC5cbiAgKi9cbiAgcHJvdGVjdGVkIF9wb3NpdGlvbkVsZW1lbnRzKFxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBwbGFjZW1lbnQ6IHN0cmluZyxcbiAgICBhcHBlbmRUb0JvZHk/OiBib29sZWFuXG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IFtwbGFjZW1lbnRQcmltYXJ5ID0gJ3RvcCcsIHBsYWNlbWVudFNlY29uZGFyeSA9ICdjZW50ZXInXSA9XG4gICAgICBwbGFjZW1lbnQuc3BsaXQoJy0nKTtcblxuICAgIGNvbnN0IGhvc3RFbFBvc2l0aW9uID0gYXBwZW5kVG9Cb2R5XG4gICAgICA/IHRoaXMub2Zmc2V0KGhvc3RFbGVtZW50LCBmYWxzZSlcbiAgICAgIDogdGhpcy5wb3NpdGlvbihob3N0RWxlbWVudCwgZmFsc2UpO1xuICAgIGNvbnN0IHRhcmdldEVsU3R5bGVzID0gdGhpcy5nZXRBbGxTdHlsZXModGFyZ2V0RWxlbWVudCk7XG5cbiAgICBpZiAodGFyZ2V0RWxTdHlsZXMpIHtcbiAgICAgIGNvbnN0IG1hcmdpblRvcCA9IHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luVG9wKTtcbiAgICAgIGNvbnN0IG1hcmdpbkJvdHRvbSA9IHBhcnNlRmxvYXQodGFyZ2V0RWxTdHlsZXMubWFyZ2luQm90dG9tKTtcbiAgICAgIGNvbnN0IG1hcmdpbkxlZnQgPSBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpbkxlZnQpO1xuICAgICAgY29uc3QgbWFyZ2luUmlnaHQgPSBwYXJzZUZsb2F0KHRhcmdldEVsU3R5bGVzLm1hcmdpblJpZ2h0KTtcblxuICAgICAgbGV0IHRvcFBvc2l0aW9uID0gMDtcbiAgICAgIGxldCBsZWZ0UG9zaXRpb24gPSAwO1xuXG4gICAgICBzd2l0Y2ggKHBsYWNlbWVudFByaW1hcnkpIHtcbiAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICB0b3BQb3NpdGlvbiA9XG4gICAgICAgICAgICBob3N0RWxQb3NpdGlvbi50b3AgLVxuICAgICAgICAgICAgKHRhcmdldEVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgbWFyZ2luVG9wICsgbWFyZ2luQm90dG9tKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICB0b3BQb3NpdGlvbiA9IGhvc3RFbFBvc2l0aW9uLnRvcCArIGhvc3RFbFBvc2l0aW9uLmhlaWdodDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgbGVmdFBvc2l0aW9uID1cbiAgICAgICAgICAgIGhvc3RFbFBvc2l0aW9uLmxlZnQgLVxuICAgICAgICAgICAgKHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgbGVmdFBvc2l0aW9uID0gaG9zdEVsUG9zaXRpb24ubGVmdCArIGhvc3RFbFBvc2l0aW9uLndpZHRoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBzd2l0Y2ggKHBsYWNlbWVudFNlY29uZGFyeSkge1xuICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgIHRvcFBvc2l0aW9uID0gaG9zdEVsUG9zaXRpb24udG9wO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgIHRvcFBvc2l0aW9uID1cbiAgICAgICAgICAgIGhvc3RFbFBvc2l0aW9uLnRvcCArXG4gICAgICAgICAgICBob3N0RWxQb3NpdGlvbi5oZWlnaHQgLVxuICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgIGxlZnRQb3NpdGlvbiA9IGhvc3RFbFBvc2l0aW9uLmxlZnQ7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICBsZWZ0UG9zaXRpb24gPVxuICAgICAgICAgICAgaG9zdEVsUG9zaXRpb24ubGVmdCArXG4gICAgICAgICAgICBob3N0RWxQb3NpdGlvbi53aWR0aCAtXG4gICAgICAgICAgICB0YXJnZXRFbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjZW50ZXInOlxuICAgICAgICAgIGlmIChwbGFjZW1lbnRQcmltYXJ5ID09PSAndG9wJyB8fCBwbGFjZW1lbnRQcmltYXJ5ID09PSAnYm90dG9tJykge1xuICAgICAgICAgICAgbGVmdFBvc2l0aW9uID1cbiAgICAgICAgICAgICAgaG9zdEVsUG9zaXRpb24ubGVmdCArXG4gICAgICAgICAgICAgIGhvc3RFbFBvc2l0aW9uLndpZHRoIC8gMiAtXG4gICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQub2Zmc2V0V2lkdGggLyAyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b3BQb3NpdGlvbiA9XG4gICAgICAgICAgICAgIGhvc3RFbFBvc2l0aW9uLnRvcCArXG4gICAgICAgICAgICAgIGhvc3RFbFBvc2l0aW9uLmhlaWdodCAvIDIgLVxuICAgICAgICAgICAgICB0YXJnZXRFbGVtZW50Lm9mZnNldEhlaWdodCAvIDI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXRFbGVtZW50LnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUoJHtNYXRoLnJvdW5kKFxuICAgICAgICBsZWZ0UG9zaXRpb25cbiAgICAgICl9cHgsICR7TWF0aC5yb3VuZCh0b3BQb3NpdGlvbil9cHgpYDtcblxuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHRhcmdldEVsZW1lbnQgaXMgaW5zaWRlIHRoZSB2aWV3cG9ydFxuICAgICAgY29uc3QgdGFyZ2V0RWxCQ1IgPSB0YXJnZXRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgY29uc3QgaHRtbCA9IHRoaXMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gdGhpcy53aW5kb3c/LmlubmVySGVpZ2h0IHx8IGh0bWwuY2xpZW50SGVpZ2h0O1xuICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB0aGlzLndpbmRvdz8uaW5uZXJXaWR0aCB8fCBodG1sLmNsaWVudFdpZHRoO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICB0YXJnZXRFbEJDUi5sZWZ0ID49IDAgJiZcbiAgICAgICAgdGFyZ2V0RWxCQ1IudG9wID49IDAgJiZcbiAgICAgICAgdGFyZ2V0RWxCQ1IucmlnaHQgPD0gd2luZG93V2lkdGggJiZcbiAgICAgICAgdGFyZ2V0RWxCQ1IuYm90dG9tIDw9IHdpbmRvd0hlaWdodFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKlxuICAgKiBBY2NlcHQgdGhlIHBsYWNlbWVudCBhcnJheSBhbmQgYXBwbGllcyB0aGUgYXBwcm9wcmlhdGUgcGxhY2VtZW50IGRlcGVuZGVudCBvbiB0aGUgdmlld3BvcnQuXG4gICAqIFJldHVybnMgdGhlIGFwcGxpZWQgcGxhY2VtZW50LlxuICAgKiBJbiBjYXNlIG9mIGF1dG8gcGxhY2VtZW50LCBwbGFjZW1lbnRzIGFyZSBzZWxlY3RlZCBpbiBvcmRlclxuICAgKiAgICd0b3AnLCAnYm90dG9tJywgJ2xlZnQnLCAncmlnaHQnLFxuICAgKiAgICd0b3AtbGVmdCcsICd0b3AtcmlnaHQnLFxuICAgKiAgICdib3R0b20tbGVmdCcsICdib3R0b20tcmlnaHQnLFxuICAgKiAgICdsZWZ0LXRvcCcsICdsZWZ0LWJvdHRvbScsXG4gICAqICAgJ3JpZ2h0LXRvcCcsICdyaWdodC1ib3R0b20nLlxuICAgKiAqL1xuICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBwbGFjZW1lbnQ6IHN0cmluZyB8IFBvcG92ZXJQb3NpdGlvbiB8IFBvcG92ZXJQb3NpdGlvbkFycmF5LFxuICAgIGFwcGVuZFRvQm9keT86IGJvb2xlYW5cbiAgKTogUG9wb3ZlclBvc2l0aW9uIHtcbiAgICBjb25zdCBwbGFjZW1lbnRWYWxzOiBBcnJheTxQb3BvdmVyUG9zaXRpb24+ID0gQXJyYXkuaXNBcnJheShwbGFjZW1lbnQpXG4gICAgICA/IHBsYWNlbWVudFxuICAgICAgOiAocGxhY2VtZW50LnNwbGl0KHRoaXMucGxhY2VtZW50U2VwYXJhdG9yKSBhcyBBcnJheTxQb3BvdmVyUG9zaXRpb24+KTtcblxuICAgIGxldCBoYXNBdXRvID0gcGxhY2VtZW50VmFscy5maW5kSW5kZXgoKHZhbCkgPT4gdmFsID09PSAnYXV0bycpO1xuICAgIGlmIChoYXNBdXRvID49IDApIHtcbiAgICAgIHRoaXMuYWxsb3dlZFBsYWNlbWVudHMuZm9yRWFjaCgob2JqKSA9PiB7XG4gICAgICAgIGlmIChwbGFjZW1lbnRWYWxzLmZpbmQoKHZhbCkgPT4gdmFsLnNlYXJjaCgnXicgKyBvYmopICE9PSAtMSkgPT0gbnVsbCkge1xuICAgICAgICAgIHBsYWNlbWVudFZhbHMuc3BsaWNlKGhhc0F1dG8rKywgMSwgb2JqIGFzIFBvcG92ZXJQb3NpdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHN0eWxlID0gdGFyZ2V0RWxlbWVudC5zdHlsZTtcbiAgICBzdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgc3R5bGUudG9wID0gJzAnO1xuICAgIHN0eWxlLmxlZnQgPSAnMCc7XG5cbiAgICBsZXQgdGVzdFBsYWNlbWVudDogUG9wb3ZlclBvc2l0aW9uID0gJ2F1dG8nO1xuICAgIGxldCBpc0luVmlld3BvcnQgPSBmYWxzZTtcbiAgICBmb3IgKHRlc3RQbGFjZW1lbnQgb2YgcGxhY2VtZW50VmFscykge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLl9wb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICAgIGhvc3RFbGVtZW50LFxuICAgICAgICAgIHRhcmdldEVsZW1lbnQsXG4gICAgICAgICAgdGVzdFBsYWNlbWVudCxcbiAgICAgICAgICBhcHBlbmRUb0JvZHlcbiAgICAgICAgKVxuICAgICAgKSB7XG4gICAgICAgIGlzSW5WaWV3cG9ydCA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaXNJblZpZXdwb3J0KSB7XG4gICAgICB0aGlzLl9wb3NpdGlvbkVsZW1lbnRzKFxuICAgICAgICBob3N0RWxlbWVudCxcbiAgICAgICAgdGFyZ2V0RWxlbWVudCxcbiAgICAgICAgdGVzdFBsYWNlbWVudCxcbiAgICAgICAgYXBwZW5kVG9Cb2R5XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXN0UGxhY2VtZW50O1xuICB9XG5cbiAgZ2V0UG9zaXRpb25pbmdDbGFzcyhcbiAgICBwb3NpdGlvbj86IFBvcG92ZXJQb3NpdGlvbixcbiAgICBhdXRvUG9zaXRpb25pbmc/OiBib29sZWFuXG4gICk6IHN0cmluZyB7XG4gICAgbGV0IHBvc2l0aW9uQ2xhc3MgPSBgJHtwb3NpdGlvbiB8fCAndG9wJ31gO1xuICAgIGlmIChhdXRvUG9zaXRpb25pbmcgJiYgcG9zaXRpb25DbGFzcyAhPT0gJ2F1dG8nKSB7XG4gICAgICBwb3NpdGlvbkNsYXNzID0gYCR7cG9zaXRpb25DbGFzc30gYXV0b2A7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uQ2xhc3M7XG4gIH1cbn1cbiJdfQ==