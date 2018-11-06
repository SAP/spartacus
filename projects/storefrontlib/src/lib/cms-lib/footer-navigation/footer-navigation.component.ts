import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'cx-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  styleUrls: ['./footer-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterNavigationComponent extends NavigationComponent {}
