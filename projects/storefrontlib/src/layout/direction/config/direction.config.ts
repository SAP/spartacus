import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { Direction } from './direction.model';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class DirectionConfig {
  /**
   * The layout direction can be used to setup the html with an instruction for text and layout direction.
   * Besides the default html direction modes (auto, ltr and rtl), we also support an auto detect mode, which
   * maps the active language to a configurable list of rtl and/or ltr language.
   */
  direction?: Direction;
}
