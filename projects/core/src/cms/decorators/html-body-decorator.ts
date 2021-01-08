import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Applicable, Priority } from '../../util';
import { WindowRef } from '../../window/window-ref';
import { Page } from '../model/page.model';

@Injectable({
  providedIn: 'root',
})
export abstract class HtmlBodyDecorator implements Applicable {
  protected renderer: Renderer2;
  protected element: Element;

  constructor(rendererFactory: RendererFactory2, winRef: WindowRef) {
    this.renderer = rendererFactory.createRenderer('body', null);
    this.element = winRef.document.body;
  }

  /**
   * Add attributes to the HTML body element dynamically
   * @param cmsPage: CMS Page content
   */
  abstract decorate(cmsPage?: Page): void;

  abstract hasMatch?(...params): boolean;

  abstract getPriority?(): Priority;
}
