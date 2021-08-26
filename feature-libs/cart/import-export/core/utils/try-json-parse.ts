import { isDevMode } from '@angular/core';

export function tryParseJson(jsonString: string) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    if (isDevMode()) {
      console.warn('Text is not parsable to JSON format', e);
    }
  }
}
