import {
  DecimalPipe,
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
import { take } from 'rxjs/operators';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
@Component({
  selector: 'cx-config-attribute-numeric-input-field',
  templateUrl: './config-attribute-numeric-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeNumericInputFieldComponent implements OnInit {
  attributeInputForm;
  numericFormatPattern;

  constructor(
    public uiKeyGenerator: ConfigUIKeyGeneratorService,
    public languageService: LanguageService
  ) {}

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() inputChange = new EventEmitter<ConfigFormUpdateEvent>();

  compilePatternForValidationMessage() {
    this.numericFormatPattern = '##,###.###';
  }

  ngOnInit() {
    this.compilePatternForValidationMessage();

    this.attributeInputForm = new FormControl('', [
      this.numberFormatValidator(
        this.attribute.numDecimalPlaces,
        this.attribute.numTotalLength
      ),
    ]);
    this.languageService
      .getActive()
      .pipe(take(1))
      .subscribe((language) => {
        //locales based on languages only
        const decimalPipe: DecimalPipe = new DecimalPipe(language);
        const numDecimalPlaces = this.attribute.numDecimalPlaces;
        this.attributeInputForm.setValue(
          decimalPipe.transform(
            this.attribute.userInput,
            '1.' + numDecimalPlaces + '-' + numDecimalPlaces
          )
        );
      });
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
    numberDecimalPlaces: number,
    numberTotalPlaces: number
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      //const format = getLocaleNumberFormat('de-CH', NumberFormatStyle.Decimal);
      const groupingSeparator = getLocaleNumberSymbol('en', NumberSymbol.Group);
      const decimalSeparator = getLocaleNumberSymbol(
        'en',
        NumberSymbol.Decimal
      );

      const numericValue: string = control.value;
      if (numericValue) {
        const woGrouping = numericValue.replace(groupingSeparator, '');
        const splitParts = woGrouping.split(decimalSeparator);
        if (splitParts.length > 2) {
          return { wrongFormat: '' };
        }
        if (splitParts.length === 1) {
          return woGrouping.length > numberTotalPlaces
            ? { wrongFormat: { value: control.value } }
            : null;
        }
        return woGrouping.length + splitParts[1].length > numberTotalPlaces ||
          splitParts[1].length > numberDecimalPlaces
          ? { wrongFormat: { value: control.value } }
          : null;
      }
      return null;
    };
  }
}
