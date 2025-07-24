import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorImageGenerationService {
  private readonly serviceUrl = 'http://localhost:3000/api/generate_image';
  private readonly serviceUrlSketch =
    'http://localhost:3000/api/generate_sketch_image';
  private readonly imageUrl: Observable<string> = new ReplaySubject<string>(1);
  private readonly imageUrlSketch: Observable<string> =
    new ReplaySubject<string>(1);
  private readonly isImagePresent$: Observable<boolean> =
    new ReplaySubject<boolean>(1);
  private readonly isImageGenerationNeeded$: Observable<boolean> =
    new ReplaySubject<boolean>(1);

  constructor() {
    (this.isImagePresent$ as ReplaySubject<boolean>).next(false);
    (this.isImageGenerationNeeded$ as ReplaySubject<boolean>).next(true);
    this.generateSketchImage();
  }

  /**
   * Generates an image based on the attributes provided
   * @param expMode
   */
  protected generateImage(attributes: any): void {
    (this.isImagePresent$ as ReplaySubject<boolean>).next(false);
    from(
      fetch(this.serviceUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attributes),
      })
    )
      .pipe(
        switchMap((response) => from(response.json())),
        take(1)
      )
      .subscribe((data) => {
        if (data && data.imageUrl) {
          (this.imageUrl as ReplaySubject<string>).next(data.imageUrl);
          (this.isImagePresent$ as ReplaySubject<boolean>).next(true);
        } else {
          (this.imageUrl as ReplaySubject<string>).next('');
          (this.isImagePresent$ as ReplaySubject<boolean>).next(false);
        }
      });
  }

  /**
   * Generates sketch image.
   */
  protected generateSketchImage(): void {
    from(
      fetch(this.serviceUrlSketch, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
      .pipe(
        switchMap((response) => from(response.json())),
        take(1)
      )
      .subscribe((data) => {
        if (data?.imageUrl) {
          (this.imageUrlSketch as ReplaySubject<string>).next(data.imageUrl);
        }
      });
  }

  protected getAttributeFromConfiguration(
    configuration: Configurator.Configuration,
    attributeName: string
  ): Configurator.Attribute | undefined {
    return configuration.flatGroups
      .flatMap((group) => group.attributes)
      .find((attribute) => attribute?.name === attributeName);
  }

  checkForImageGenerationOnChanges(
    configuration: Configurator.Configuration
  ): void {
    this.isImageGenerationNeeded$.pipe(take(1)).subscribe((isNeeded) => {
      if (isNeeded) {
        this.setImageGenerationNeeded(false);
        const attributeColor = this.getAttributeFromConfiguration(
          configuration,
          'TT_RUBBER_COLOR'
        );
        const attributeRubber = this.getAttributeFromConfiguration(
          configuration,
          'TT_RUBBER'
        );

        const attributeType = this.getAttributeFromConfiguration(
          configuration,
          'TT_TYPE'
        );
        if (attributeColor && attributeRubber && attributeType) {
          //all attributes that influence the image generation are in one group,
          //otherwise we would need to access the overview or cache the relevant attributes
          //in this service
          const attributes = {
            color: attributeColor.selectedSingleValue,
            rubber: attributeRubber.selectedSingleValue,
            type: attributeType.selectedSingleValue,
          };
          this.generateImage(attributes);
        }
      }
    });
  }

  isImagePresent(): Observable<boolean> {
    return this.isImagePresent$;
  }

  setImageGenerationNeeded(imageGenerationNeeded: boolean): void {
    (this.isImageGenerationNeeded$ as ReplaySubject<boolean>).next(
      imageGenerationNeeded
    );
  }

  getImageUrl(): Observable<string> {
    return this.imageUrl;
  }

  getImageUrlSketch(): Observable<string> {
    return this.imageUrlSketch;
  }
}
