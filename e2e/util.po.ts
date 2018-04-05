import { browser, element, by } from 'protractor';
import { print } from 'util';

export class E2EUtil {
  /**
   * Get a cms component given the component uid and the selector name.
   * @param componentUid The component-uid as it shows in the "y-component-wrapper"
   * @param componentSelector The selector declared on the component (used to identify the html tag)
   */
  static getComponent(componentUid: string, componentSelector: string) {
    // e.g.: <y-component-wrapper _ngcontent-c6="" _nghost-c11="" ng-reflect-component-type="SimpleBannerComponent" ng-reflect-component-uid="SiteLogoComponent">
    var componentWrapper = element(
      by.css(`[ng-reflect-component-uid=${componentUid}]`)
    );
    // e.g.: <y-banner _nghost-c19="" style="flex-direction: row; box-sizing: border-box; display: flex;" class="ng-star-inserted">
    var component = componentWrapper.element(by.css(componentSelector));
    return component;
  }
}
