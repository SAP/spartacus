import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { from } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Configurator } from '../../core/model/configurator.model';

@Injectable({
  providedIn: 'root',
})
export class ConfiguratorImageGenerationService {
  private serviceUrl = 'http://localhost:3000/api/generate_image';
  private imageUrl: Observable<string> = new ReplaySubject<string>(1);
  private readonly isImagePresent$: Observable<boolean> =
    new ReplaySubject<boolean>(1);
  private readonly isImageGenerationNeeded$: Observable<boolean> =
    new ReplaySubject<boolean>(1);

  constructor() {
    (this.isImagePresent$ as ReplaySubject<boolean>).next(false);
    (this.isImageGenerationNeeded$ as ReplaySubject<boolean>).next(true);
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
          'TT_RACKET_RUBBER'
        );

        if (attributeColor && attributeRubber) {
          const attributes = {
            color: attributeColor.selectedSingleValue,
            rubber: attributeRubber.selectedSingleValue,
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
}
