import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationNode } from './navigation-node.model';
import { NavigationComponentService } from './navigation.component.service';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  node$: Observable<NavigationNode> = this.service.createNavigation();

  styleClass$: Observable<string> = this.service
    .getComponentData()
    .pipe(map(d => d.styleClass));

  constructor(public service: NavigationComponentService) {}
}
