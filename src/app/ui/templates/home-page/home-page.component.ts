import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AbstractPage } from '../abstract-page.component';

@Component({
    selector: 'y-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent extends AbstractPage  {

}
