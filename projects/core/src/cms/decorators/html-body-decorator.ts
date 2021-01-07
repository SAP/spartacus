import { Injectable, Renderer2 } from '@angular/core';
import { Applicable, Priority } from '../../util';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export abstract class HtmlBodyDecorator implements Applicable {
  /**
   * Add attributes to the HTML body element dynamically
   * @param element: HTML body element
   * @param renderer
   * @param cmsPage: CMS Page content
   */
  abstract decorate(
    element: Element,
    renderer?: Renderer2,
    cmsPage?: Page
  ): void;

  abstract hasMatch?(...params): boolean;

  abstract getPriority?(): Priority;
}
