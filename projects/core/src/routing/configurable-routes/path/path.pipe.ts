import { Pipe, PipeTransform } from '@angular/core';
import { PathService } from './path.service';

type PathPipeArgument = string | (string | object)[];

@Pipe({
  name: 'cxPath'
})
export class PathPipe implements PipeTransform {
  constructor(private pathService: PathService) {}

  transform(argument: PathPipeArgument): string {
    const { pageName, parametersObject } = this.interpretArgument(argument);
    return this.pathService.transform(pageName, parametersObject);
  }

  private interpretArgument(
    argument: PathPipeArgument
  ): { pageName: string; parametersObject: object } {
    return typeof argument === 'string'
      ? {
          // if argument is string => it's a page name
          pageName: argument,
          parametersObject: {}
        }
      : {
          // if argument is array => first element is page name and second element (when present) is parameters object
          pageName: argument[0] as string,
          parametersObject: (argument[1] as object) || {}
        };
  }
}
