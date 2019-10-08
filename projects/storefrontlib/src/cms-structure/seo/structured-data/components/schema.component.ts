import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { SchemaService } from '../schema.service';

/**
 * Collects page data and transformes it into structural data,
 * following schema's from schema.org. We're using json-ld data structure,
 * as it's not coupled to the UI, and can be written in pure JSON format.
 *
 * The lower level `cx-json-ld` component is used to write the script
 * tag into the html.
 *
 * The script will only be written once, and only in SSR or dev mode,
 * as there's no point in collecting and writing the data at
 * application runtime.
 */
@Component({
  selector: 'cx-schema',
  template: '<cx-json-ld [schema]="load() | async"></cx-json-ld>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemaComponent {
  constructor(private schemaService: SchemaService) {}

  load(): Observable<{}> {
    return this.schemaService.load();
  }
}
