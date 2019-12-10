import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkipLinkService } from '../service/skip-link.service';

@Component({
  selector: 'cx-skip-link',
  templateUrl: './skip-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipLinkComponent {
  links$ = this.skipLinkService.skippers;

  constructor(private skipLinkService: SkipLinkService) {}

  go(link, event: MouseEvent) {
    this.skipLinkService.go(link.target, link.position, event);
  }

  /**
   * Hides the skip link by removing the focus.
   */
  blur(event: MouseEvent): void {
    (<HTMLElement>event.target).blur();
  }

  tabNext(event: MouseEvent): void {
    if (this.isElement((<HTMLElement>event.target).nextSibling)) {
      (<HTMLElement>(<HTMLElement>event.target).nextSibling).focus();
    }
  }
  tabPrev(event: MouseEvent): void {
    if (this.isElement((<HTMLElement>event.target).previousSibling)) {
      (<HTMLElement>(<HTMLElement>event.target).previousSibling).focus();
    }
  }

  private isElement(element: Node): boolean {
    return !!element && element instanceof HTMLElement;
  }
}
