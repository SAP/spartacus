import { Injectable } from '@angular/core';
import { PathPipeService } from './path-pipe.service';
import { DynamicUrlRecognizerService } from './dynamic-url-recognizer.service';

@Injectable()
export class DynamicUrlPipeService {
  constructor(
    private pathService: PathPipeService,
    private dynamicUrlRecognizerService: DynamicUrlRecognizerService
  ) {}

  transform(dynamicUrl: string): string[] {
    const {
      nestedRoutesNames,
      nestedRoutesParams
    } = this.dynamicUrlRecognizerService.getNestedRoutes(dynamicUrl);

    if (!nestedRoutesNames) {
      return [dynamicUrl];
    }
    return this.pathService.transform(nestedRoutesNames, nestedRoutesParams);
  }
}
