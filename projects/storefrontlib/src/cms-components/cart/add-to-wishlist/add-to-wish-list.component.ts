import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-add-to-wishlist',
  templateUrl: './add-to-wish-list.component.html',
})
export class AddToWishListComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  add() {
    return true;
  }

  remove() {
    return false;
  }
}
