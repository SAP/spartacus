import { CmsConfig } from "@spartacus/core";
import { HeaderComponent } from "./header.component";

export const accountSummaryHeaderCmsConfig: CmsConfig = {
    cmsComponents: {
        AccountSummaryHeaderComponent: {
            component: HeaderComponent,
        }
    }
};
