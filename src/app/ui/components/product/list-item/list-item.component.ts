import { Component, Input } from '@angular/core';

@Component({
    selector: 'y-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
    
    @Input() product;

}
