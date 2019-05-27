import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Media } from './media.model';
import { MediaService } from './media.service';

@Component({
  selector: 'cx-media',
  templateUrl: './media.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaComponent implements OnChanges {
  /**
   * The media container can hold multiple media items, so that
   * a specific media (by format) can be used or multiple media
   * can be provided in a `srcset` so the browser will figure out
   * the best media for the device.
   */
  @Input() container: any;

  /**
   * if a media format is given, a media for the given format will be rendered
   */
  @Input() format: string;

  /**
   * A specific alt text for an image, which overrules the alt text
   * from the container data.
   */
  @Input() alt: string;

  /**
   * Once the media is loaded, we emit an event.
   */
  @Output() loaded: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  /**
   * The media contains the info for the UI to create the image. This media
   * object might contain more info once other media types (i.e. video) is supported.
   */
  media: Media;

  /**
   * The `cx-media` component has an `initialized` class as long as the
   * media is being initialized.
   */
  @HostBinding('class.initialized') isInitialized = false;

  /**
   * The `cx-media` component has a `loading` class as long as the
   * media is loaded. Wehn the media is loaded, the `initialized` class
   * is added.
   */
  @HostBinding('class.loading') isLoading = true;

  /**
   * When there's not media provided for the content, or in case an error
   * happened during loading, we add the missing class.
   */
  @HostBinding('class.is-missing') isMissing = false;

  constructor(protected mediaService: MediaService) {}

  ngOnChanges(): void {
    this.create();
  }

  /**
   * Creates the `Media` object
   */
  private create(): void {
    this.media = this.mediaService.getMedia(
      this.container,
      this.format,
      this.alt
    );
    if (!this.media.src) {
      this.handleMissing();
    }
  }

  /**
   * This handler is called from the UI when the image is loaded.
   * The
   */
  loadHandler(): void {
    this.isLoading = false;
    this.isInitialized = true;
    this.loaded.emit(true);
  }

  /**
   * Whenever an error happens during load, we mark the component
   * with css classes to have a missing media.
   */
  errorHandler(): void {
    this.handleMissing();
  }

  private handleMissing() {
    this.isLoading = false;
    this.isInitialized = true;
    this.isMissing = true;
  }
}
