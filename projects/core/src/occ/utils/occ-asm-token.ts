import { HttpContextToken } from '@angular/common/http';

export interface OccAsmContext {
  userId?: string;
}

export const OCC_ASM_TOKEN = new HttpContextToken<OccAsmContext | undefined>(
  () => undefined
);
