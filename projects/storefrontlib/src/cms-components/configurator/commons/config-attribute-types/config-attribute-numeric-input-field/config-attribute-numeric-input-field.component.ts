import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn } from '@angular/forms';
import { Configurator, CxDecimalPipe } from '@spartacus/core';
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

  constructor(
    public uiKeyGenerator: ConfigUIKeyGeneratorService,
    public cxDecimalPipe: CxDecimalPipe
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
    this.numericFormatPattern = this.cxDecimalPipe
      .transform(input, '1.' + decimalPlaces + '-' + decimalPlaces)
      .replace(/9/g, '#');
  }

  ngOnInit() {
    //locales based on languages only

    this.attributeInputForm = new FormControl('', [
      this.numberFormatValidator(
        this.cxDecimalPipe.getLang(),
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
      this.cxDecimalPipe.transform(
        this.attribute.userInput,
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

  numberFormatValidator(
    locale: string,
    numberDecimalPlaces: number,
    numberTotalPlaces: number
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const groupingSeparator = getLocaleNumberSymbol(
        locale,
        NumberSymbol.Group
      );
      const decimalSeparator = getLocaleNumberSymbol(
        locale,
        NumberSymbol.Decimal
      );

      const numericValue: string = control.value;
      if (numericValue) {
        const search: RegExp = new RegExp('/' + groupingSeparator, 'g');
        const woGrouping = numericValue.replace(search, '');

        const splitParts = woGrouping.split(decimalSeparator);
        if (splitParts.length > 2) {
          return { wrongFormat: { value: control.value } };
        }
        if (splitParts.length === 1) {
          return woGrouping.length > numberTotalPlaces
            ? { wrongFormat: { value: control.value } }
            : null;
        }

        return splitParts[0].length + splitParts[1].length >
          numberTotalPlaces || splitParts[1].length > numberDecimalPlaces
          ? { wrongFormat: { value: control.value } }
          : null;
      }
      return null;
    };
  }
}
