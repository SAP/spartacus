import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cxHighlight' })
export class HighlightPipe implements PipeTransform {
  transform(text: string, match?: string): string {
    if (!match) {
      return text;
    }
    return text.replace(
      match.trim(),
      `<span class="highlight">${match.trim()}</span>`
    );
  }
}
