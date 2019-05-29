import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationNode } from './navigation-node.model';
import { NavigationComponentService } from './navigation.component.service';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() dropdownMode = 'list';
  @Input() node: NavigationNode;

  node$: Observable<NavigationNode> = this.service.createNavigation();

  constructor(public service: NavigationComponentService) {}
}
