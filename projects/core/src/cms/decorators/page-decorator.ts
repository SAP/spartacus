import { Injectable, Renderer2 } from '@angular/core';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export abstract class PageDecorator {
  /**
   * Add attributes to the given element dynamically
   * @param cmsPage: CMS Page content
   */
  abstract decorate(
    element: Element,
    renderer: Renderer2,
    cmsPage?: Page
  ): void;
}
