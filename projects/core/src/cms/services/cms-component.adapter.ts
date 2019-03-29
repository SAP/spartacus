import { Injectable } from '@angular/core';
import { CmsComponent } from '../../occ/occ-models/cms-component.models';

@Injectable({
  providedIn: 'root',
})
export abstract class CmsComponentAdapter<T> {
  abstract adapt(source: T): CmsComponent;
}
