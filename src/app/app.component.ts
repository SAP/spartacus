import { Component } from '@angular/core';
import { RouteEvents } from './router/route-events';

@Component({
    selector: 'y-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private events: RouteEvents)
    {}
}
