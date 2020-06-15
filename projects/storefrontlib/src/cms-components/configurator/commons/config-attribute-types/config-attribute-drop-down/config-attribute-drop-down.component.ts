import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { formatNumber } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Configurator, LanguageService } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { Subscription } from 'rxjs';
import { ConfigUtilsLocalizationService } from '../../service/config-localization-utils.service';

@Component({
  selector: 'cx-config-attribute-drop-down',
  templateUrl: './config-attribute-drop-down.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeDropDownComponent implements OnInit, OnDestroy {
  attributeDropDownForm = new FormControl('');
  subscriptions = new Subscription();
  locale: string;

  constructor(
    public uiKeyGenerator: ConfigUIKeyGeneratorService,
    public languageService: LanguageService,
    public utilsService: ConfigUtilsLocalizationService
  ) {}

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  internalAttribute: Configurator.Attribute;

  @Output() selectionChange = new EventEmitter<ConfigFormUpdateEvent>();

  ngOnInit() {
    this.attributeDropDownForm.setValue(this.attribute.selectedSingleValue);

    this.subscriptions.add(
      this.languageService.getActive().subscribe((language) => {
        this.locale = this.utilsService.getLanguage(language);
        if (this.attribute.isNumeric) {
          this.internalAttribute = { ...this.attribute, values: [] };

          this.attribute.values.forEach((element) => {
            let internalNumber: string;

            internalNumber = formatNumber(
              Number(
                element.valueDisplay
                  .replace(/,/g, '.')
                  .replace(/\.(?=.*\.)/g, '')
              ),
              this.locale
            );

            this.internalAttribute.values.push({
              ...element,
              valueDisplay: internalNumber,
            });
          });
        } else {
          this.internalAttribute = this.attribute;
        }
      })
    );
  }

  onSelect() {
    const event: ConfigFormUpdateEvent = {
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        selectedSingleValue: this.attributeDropDownForm.value,
        uiType: this.attribute.uiType,
      },
      groupId: this.group,
    };

    this.selectionChange.emit(event);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
