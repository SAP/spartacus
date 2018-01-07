import { TestBed, inject } from "@angular/core/testing";
import { DefaultPageService } from "./default-page.service";
import { ConfigService } from "../config.service";
import { PageType } from "../../routing/models/page-context.model";

export class MockConfigService {
  defaultPageIdForType = {
    PRODUCT_PAGE: ["testPage"]
  };
}

fdescribe("DefaultPageService", () => {
  let service: DefaultPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DefaultPageService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(DefaultPageService);
  });

  it(
    "should DefaultPageService is injected",
    inject([DefaultPageService], (service: DefaultPageService) => {
      expect(service).toBeTruthy();
    })
  );

  describe("getDefaultPageIdsBytype", () => {
    it("should get the default pageId", () => {
      const result: string[] = service.getDefaultPageIdsBytype(
        PageType.PRODUCT_PAGE
      );
      expect(result).toEqual(["testPage"]);
    });
  });
});
