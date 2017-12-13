import { OccCmsService } from "./occ-cms.service";
import { ComponentMapperService } from "./component-mapper.service";
import { DefaultPageService } from "./default-page.service";

export const services: any[] = [
  OccCmsService,
  ComponentMapperService,
  DefaultPageService
];

export * from "./occ-cms.service";
export * from "./component-mapper.service";
export * from "./default-page.service";
