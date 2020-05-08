import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Configurator, GenericConfigurator } from "@spartacus/core";

@Component({
  selector: "cx-config-attribute-footer",
  templateUrl: "./config-attribute-footer.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigAttributeFooterComponent {
  constructor() {
  }

  @Input() attribute: Configurator.Attribute;
  @Input() ownerType: GenericConfigurator.OwnerType;

  showRequiredMessage(): boolean {
    if (this.ownerType === GenericConfigurator.OwnerType.CART_ENTRY
      && this.attribute.required
      && this.attribute.incomplete
      && this.attribute.uiType === Configurator.UiType.STRING && !this.attribute.userInput
    ) {
      return true;
    }
    return false;
  }

  getRequiredMessageKey(): string {
    return "configurator.attribute.defaultRequiredMessage";
  }
}
