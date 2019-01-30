import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { NavigationService } from './navigation.service';
import { NavigationNode } from './navigation-node.model';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input() dropdownMode = 'list';
  @Input() node: any;

  node$: Observable<NavigationNode>;

  constructor(private navigationService: NavigationService) {
    this.node$ = this.navigationService.getNodes();
  }

  getComponentData() {
    return this.navigationService.getComponentData();
  }
}
