import { getLocaleId } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Configurator, LanguageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { ConfigFormUpdateEvent } from '../../config-form/config-form.event';
import { ConfigUIKeyGeneratorService } from '../../service/config-ui-key-generator.service';
import { ConfigAttributeNumericInputFieldService } from './config-attribute-numeric-input-field.service';

@Component({
  selector: 'cx-config-attribute-numeric-input-field',
  templateUrl: './config-attribute-numeric-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAttributeNumericInputFieldComponent
  implements OnInit, OnDestroy {
  attributeInputForm: FormControl;
  numericFormatPattern;
  locale: string;
  subscriptions = new Subscription();

  constructor(
    public uiKeyGenerator: ConfigUIKeyGeneratorService,
    public languageService: LanguageService,
    public configAttributeNumericInputFieldService: ConfigAttributeNumericInputFieldService
  ) {}

  @Input() attribute: Configurator.Attribute;
  @Input() group: string;
  @Input() ownerKey: string;

  @Output() inputChange = new EventEmitter<ConfigFormUpdateEvent>();

  public mustDisplayValidationMessage(): boolean {
    const wrongFormat: boolean =
      (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
      this.attributeInputForm.errors?.wrongFormat;

    return wrongFormat;
  }

  ngOnInit() {
    //locales are available as languages in the commerce backend
    this.subscriptions.add(
      this.languageService.getActive().subscribe((language) => {
        this.locale = this.getLanguage(language);
        this.attributeInputForm = new FormControl('', [
          this.configAttributeNumericInputFieldService.getNumberFormatValidator(
            this.locale,
            this.attribute.numDecimalPlaces,
            this.attribute.numTotalLength,
            this.attribute.negativeAllowed
          ),
        ]);
        const numDecimalPlaces = this.attribute.numDecimalPlaces;
        this.numericFormatPattern = this.configAttributeNumericInputFieldService.getPatternForValidationMessage(
          numDecimalPlaces,
          this.attribute.numTotalLength,
          this.attribute.negativeAllowed,
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
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onChange() {
    const event: ConfigFormUpdateEvent = this.createEventFromInput();

    if (!this.attributeInputForm.invalid) {
      this.inputChange.emit(event);
    }
  }

  protected createEventFromInput(): ConfigFormUpdateEvent {
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

  private getLanguage(locale: string): string {
    try {
      getLocaleId(locale);
      return locale;
    } catch {
      this.reportMissingLocaleData(locale);
      return 'en';
    }
  }

  private reportMissingLocaleData(lang: string) {
    if (isDevMode()) {
      console.warn(
        `ConfigAttributeNumericInputFieldComponent: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}
