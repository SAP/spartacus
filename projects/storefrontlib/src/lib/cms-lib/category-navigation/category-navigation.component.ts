import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'cx-category-navigation',
  templateUrl: './category-navigation.component.html',
  styleUrls: ['./category-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryNavigationComponent extends NavigationComponent {}
