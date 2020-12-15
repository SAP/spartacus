import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
})
export class ConfiguratorAttributeProductCardComponent
  implements OnDestroy, OnInit {
  quantity = new FormControl(1);
  private sub: Subscription;

  @Input() disabledAction: boolean;
  @Input() multiSelect = false;
  @Input() product: Configurator.Value;
  @Output() handleSelect = new EventEmitter<string>();
  @Output() handleDeselect = new EventEmitter<string>();

  ngOnInit() {
    this.sub = this.quantity.valueChanges.subscribe((value) => {
      if (!value) {
        this.onHandleDeselect();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onHandleSelect(): void {
    this.handleSelect.emit(this.product.valueCode);
  }

  onHandleDeselect(): void {
    this.handleDeselect.emit(this.product.valueCode);
  }
}
