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
      pageName,
      parameters
    } = this.dynamicUrlRecognizerService.getPageAndParameters(dynamicUrl); // spike todo - should get page names and parameters objects for nested routes

    if (!pageName) {
      return [dynamicUrl];
    }
    return this.pathService.transform([pageName], [parameters]); // spike todo - should use recognized page names and parameters objects for nested routes
  }
}
