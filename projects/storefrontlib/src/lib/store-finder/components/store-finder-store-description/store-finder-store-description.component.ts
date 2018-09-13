import { Component, OnInit, Input } from '@angular/core';
import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import { StoreDataService } from '../../services';

@Component({
  selector: 'y-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
  styleUrls: ['./store-finder-store-description.component.css']
})
export class StoreFinderStoreDescriptionComponent extends AbstractStoreItemComponent {
  @Input() location: any;

  constructor(protected storeDataService: StoreDataService) {
    super(storeDataService);
  }
}
