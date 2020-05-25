import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator, LanguageService } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeNumericInputFieldService } from './config-attribute-numeric-input-field.service';

@Component({
  selector: 'cx-config-attribute-numeric-input-field',
  templateUrl: './config-attribute-numeric-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeNumericInputFieldComponent implements OnInit {
  attributeInputForm: FormControl;
  numericFormatPattern;
  locale: string;

  constructor(
    public uiKeyGenerator: ConfigUIKeyGeneratorService,
    public languageService: LanguageService,
    public configAttributeNumericInputFieldService: ConfigAttributeNumericInputFieldService
  ) {}

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() inputChange = new EventEmitter<ConfigFormUpdateEvent>();

  mustDisplayValidationMessage(): boolean {
    const wrongFormat: boolean =
      (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
      this.attributeInputForm.errors?.wrongFormat;

    return wrongFormat;
  }

  determineCurrentLocale() {
    //locales are available as languages in the commerce backend
    this.languageService
      .getActive()
      .subscribe((language) => (this.locale = language))
      .unsubscribe();
  }

  ngOnInit() {
    this.determineCurrentLocale();

    this.attributeInputForm = new FormControl('', [
      this.configAttributeNumericInputFieldService.getNumberFormatValidator(
        this.locale,
        this.attribute.numDecimalPlaces,
        this.attribute.numTotalLength
      ),
    ]);

    const numDecimalPlaces = this.attribute.numDecimalPlaces;

    this.numericFormatPattern = this.configAttributeNumericInputFieldService.getPatternForValidationMessage(
      numDecimalPlaces,
      this.attribute.numTotalLength,
      this.locale
    );

    if (this.attribute.userInput) {
      this.attributeInputForm.setValue(
        this.configAttributeNumericInputFieldService.getFormattedInput(
          this.attribute.userInput,
          this.locale,
          numDecimalPlaces
        )
      );
    }
  }

  onChange() {
    const event: ConfigFormUpdateEvent = this.createEventFromInput();

    if (!this.attributeInputForm.invalid) {
      this.inputChange.emit(event);
    }
  }

  createEventFromInput(): ConfigFormUpdateEvent {
    return {
      productCode: this.ownerKey,
      changedAttribute: {
        name: this.attribute.name,
        userInput: this.attributeInputForm.value,
        uiType: this.attribute.uiType,
      },
      groupId: this.group,
    };
  }
}
