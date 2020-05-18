import {
  formatNumber,
  getLocaleNumberSymbol,
  NumberSymbol,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Configurator, LanguageService } from '@spartacus/core';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';

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
    public languageService: LanguageService
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

  compilePatternForValidationMessage(
    decimalPlaces: number,
    totalLength: number
  ) {
    let input: string = 10 ** totalLength - 1 + '';
    if (decimalPlaces > 0) {
      input =
        input.substring(0, totalLength - decimalPlaces) +
        '.' +
        input.substring(totalLength - decimalPlaces, totalLength);
    }
    const inputAsNumber: number = Number(input);
    this.numericFormatPattern = formatNumber(
      inputAsNumber,
      this.locale,
      '1.' + decimalPlaces + '-' + decimalPlaces
    ).replace(/9/g, '#');
  }

  ngOnInit() {
    this.determineCurrentLocale();

    this.attributeInputForm = new FormControl('', [
      this.numberFormatValidator(
        this.locale,
        this.attribute.numDecimalPlaces,
        this.attribute.numTotalLength
      ),
    ]);

    const numDecimalPlaces = this.attribute.numDecimalPlaces;

    this.compilePatternForValidationMessage(
      numDecimalPlaces,
      this.attribute.numTotalLength
    );

    this.attributeInputForm.setValue(
      formatNumber(
        Number(this.attribute.userInput),
        this.locale,
        '1.' + numDecimalPlaces + '-' + numDecimalPlaces
      )
    );
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

  createValidationError(isError: boolean): { [key: string]: any } | null {
    return isError ? { wrongFormat: {} } : null;
  }

  performValidationAccordingToMetaData(
    input: string,
    groupingSeparator: string,
    decimalSeparator: string,
    numberTotalPlaces: number,
    numberDecimalPlaces: number
  ): boolean {
    const search: RegExp = new RegExp(groupingSeparator, 'g');
    const woGrouping = input.replace(search, '');

    const splitParts = woGrouping.split(decimalSeparator);
    if (splitParts.length > 2) {
      return true;
    }
    if (splitParts.length === 1) {
      return woGrouping.length > numberTotalPlaces;
    }
    return (
      splitParts[0].length + splitParts[1].length > numberTotalPlaces ||
      splitParts[1].length > numberDecimalPlaces
    );
  }

  numberFormatValidator(
    locale: string,
    numberDecimalPlaces: number,
    numberTotalPlaces: number
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const input: string = control.value;
      if (input) {
        //allowed: only numbers and separators

        const groupingSeparator = getLocaleNumberSymbol(
          locale,
          NumberSymbol.Group
        );
        const decimalSeparator = getLocaleNumberSymbol(
          locale,
          NumberSymbol.Decimal
        );

        const expressionOnlyNumericalInput: RegExp = new RegExp(
          '^[0123456789' + groupingSeparator + decimalSeparator + ']+$'
        );
        if (!expressionOnlyNumericalInput.test(input)) {
          return this.createValidationError(true);
        }
        return this.createValidationError(
          this.performValidationAccordingToMetaData(
            input,
            groupingSeparator,
            decimalSeparator,
            numberTotalPlaces,
            numberDecimalPlaces
          )
        );
      }
      return null;
    };
  }
}
