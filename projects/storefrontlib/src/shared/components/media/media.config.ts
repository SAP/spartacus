import { MediaFormatSize } from './media.model';
import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

/**
 * Provides configuration specific to Media, such as images. This is used to optimize
 * rendering of the media, SEO and performance.
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class MediaConfig {
  /**
   * Media _format_ configuration holds the size of the media's assigned to
   * a format.
   */
  mediaFormats?: {
    /**
     * Represents the media format code, that is the key to distinguish different
     * media in a container.
     */
    [format: string]: MediaFormatSize;
  };
}
