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
}
