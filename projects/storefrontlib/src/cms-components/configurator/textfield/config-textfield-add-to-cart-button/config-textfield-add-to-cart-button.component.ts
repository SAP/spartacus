import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
} from '@spartacus/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-config-textfield-add-to-cart-button',
  templateUrl: './config-textfield-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldAddToCartButtonComponent implements OnInit {
  constructor(
    private configuratorTextfieldService: ConfiguratorTextfieldService
  ) {}

  @Input() configuration$: Observable<ConfiguratorTextfield.Configuration>;

  ngOnInit(): void {}

  onAddToCart() {
    console.log('Add To cart Clicked');
    console.log(this.configuratorTextfieldService);
    //this.configuratorTextfieldService.addToCart();
  }
}
