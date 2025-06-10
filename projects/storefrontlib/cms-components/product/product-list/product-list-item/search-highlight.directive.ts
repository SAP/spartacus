import { Directive, Input, SimpleChanges, OnChanges, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// parse the string with HTML (with limited possible node types), and then build ourselves the DOM structure using Angular Renderer
@Directive({
  selector: '[cxSearchResultsHighlightInnerHtml]',
  standalone: false
})
export class SearchHighlightDirective implements OnChanges {
  @Input('cxSearchResultsHighlightInnerHtml') htmlString: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('htmlString' in changes) {
      this.render();
    }
  }

  render() {
    const native: HTMLElement = this.el.nativeElement;
    // Clear previous content
    while (native.firstChild) {
      this.renderer.removeChild(native, native.firstChild);
    }

    if (!this.htmlString) { return; }

    if (isPlatformBrowser(this.platformId)) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(this.htmlString, 'text/html');
      this.appendNodes(doc.body.childNodes, native);
    } else {
      native.innerHTML = this.htmlString;
    }
  }

  appendNodes(nodes: NodeListOf<ChildNode>, parent: HTMLElement) {
    nodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        this.renderer.appendChild(parent, this.renderer.createText(node.textContent || ''));
      } else if (
        node.nodeType === Node.ELEMENT_NODE &&
        node.nodeName.toLowerCase() === 'em' &&
        (node as Element).classList.contains('search-results-highlight')
      ) {
        const em = this.renderer.createElement('em');
        this.renderer.addClass(em, 'search-results-highlight');
        this.appendNodes(node.childNodes as NodeListOf<ChildNode>, em);
        this.renderer.appendChild(parent, em);
      }
      // Ignore any other elements for security
    });
  }
}
