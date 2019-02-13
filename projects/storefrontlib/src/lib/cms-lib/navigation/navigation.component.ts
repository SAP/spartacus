import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { NavigationComponentService } from './navigation.component.service';
import { NavigationNode } from './navigation-node.model';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() dropdownMode = 'list';
  @Input() node: NavigationNode;

  node$: Observable<NavigationNode>;

  constructor(public service: NavigationComponentService) {
    this.node$ = this.service.getNodes();
  }
}
