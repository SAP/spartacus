import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { TabLink } from './tab-link.model';

@Component({
  selector: 'cx-fake-tabs',
  templateUrl: './fake-tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FakeTabsComponent {
  @Input()
  links: Array<TabLink>;

  @Input()
  code?: string;

  @Input()
  routerBackLink: TabLink;

  getLinks() {
    return this.code
      ? this.links.map((link) => ({
          ...link,
          params: link.params ?? { code: this.code },
        }))
      : this.links;
  }
}
