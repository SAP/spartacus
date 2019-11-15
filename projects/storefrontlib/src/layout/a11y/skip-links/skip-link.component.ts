import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SkipLinkScrollPosition } from './config/index';
import { SkipLinkService } from './skip-link.service';

@Component({
  selector: 'cx-skip-link',
  templateUrl: './skip-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkipLinkComponent {
  links$ = this.skipLinkService.skippers;

  constructor(private skipLinkService: SkipLinkService) {}

  go(target: HTMLElement, position: SkipLinkScrollPosition, event: MouseEvent) {
    (<HTMLElement>event.target).blur();
    const options: ScrollIntoViewOptions =
      position === SkipLinkScrollPosition.AFTER ? { inline: 'end' } : {};

    target.scrollIntoView(options);
  }
}
