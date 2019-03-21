import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxTranslate' })
export class MockTranslatePipe implements PipeTransform {
  transform(key: any, options: object = {}): string {
    const optionsString = Object.keys(options)
      .sort()
      .map(optionName => `${optionName}:${options[optionName]}`)
      .join(' ');
    return optionsString ? `${key} ${optionsString}` : key;
  }
}
