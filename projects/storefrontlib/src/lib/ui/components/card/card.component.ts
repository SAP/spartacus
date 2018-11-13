import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface Card {
  header?: string;
  title?: string;
  textBold?: string;
  text?: Array<any>;
  img?: string;
  actions?: Array<any>;
  deleteMsg?: string;
}

@Component({
  selector: 'cx-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output()
  deleteCard: EventEmitter<number> = new EventEmitter();
  @Output()
  setDefaultCard: EventEmitter<number> = new EventEmitter();
  @Output()
  sendCard: EventEmitter<number> = new EventEmitter();
  @Output()
  editCard: EventEmitter<number> = new EventEmitter();

  @Input()
  border = false;

  @Input()
  editMode = false;

  @Input()
  isDefault = false;

  @Input()
  content: Card;
  @Input()
  fitToContainer = false;

  // ACTIONS

  setEditMode() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  delete() {
    this.deleteCard.emit(1);
  }

  setDefault() {
    this.isDefault = true;
    this.setDefaultCard.emit(2);
  }

  send() {
    this.sendCard.emit(3);
  }

  edit() {
    this.editCard.emit(4);
  }

  constructor() {}

  ngOnInit() {}
}
