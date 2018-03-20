import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractCmsComponent } from '../../cms/components/abstract-cms-component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'y-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  styleUrls: ['./footer-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterNavigationComponent extends NavigationComponent {
  static componentName = 'FooterNavigationComponent';
}
