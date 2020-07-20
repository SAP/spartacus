import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

const variantConfigPageSelectore = '.VariantConfigurationTemplate';
/**
 * Handles the focus of the configuration UI.
 */
@Injectable({ providedIn: 'root' })
export class ConfigUIFocusService {
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  renderer: Renderer2;
  focusedElement: Element;

  focuseElement() {
    //if an object outside of the variant page is focused do nothing
    if (
      !this.renderer
        .selectRootElement(variantConfigPageSelectore, true)
        .contains(document.activeElement) //TODO: Change to renderer2
    ) {
      return;
    }

    if (this.focusedElement) {
      //TODO: Change to renderer2
      console.warn(this.focusedElement.id);
      document.getElementById(this.focusedElement.id)?.focus();
    }
  }

  setActiveFocusedElement() {
    const focusedElement = document.activeElement;

    if (
      this.renderer
        .selectRootElement(variantConfigPageSelectore, true)
        .contains(focusedElement)
    ) {
      this.focusedElement = focusedElement;
    }
  }
}
