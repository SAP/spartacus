import { Injectable } from '@angular/core';
import { CmsStructureModel } from '../model/page.model';
import { CMSPage } from '../../occ/index';

@Injectable({
  providedIn: 'root'
})
export abstract class Adapter {
  abstract convert(source: CMSPage, target: CmsStructureModel): void;
}
