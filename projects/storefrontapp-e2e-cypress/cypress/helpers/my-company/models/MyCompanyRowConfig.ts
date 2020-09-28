export interface MyCompanyRowConfig {
  label: string;
  variableName: string | string[];
  sortLabel?: string;
  link?: string;
  inputType?: string;
  createValue?: string;
  updateValue?: string;
  useDatePipe?: boolean;
  showInTable?: boolean;
  formControlName?: string;
  showInDetails?: boolean;
}
