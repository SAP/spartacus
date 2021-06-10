declare var buildProcess: BuildProcess;

interface BuildProcess {
  env: Env;
}

interface Env {
  CX_BASE_URL: string;
  CX_CDS: boolean;
  CX_CDC: boolean;
  CX_B2B: boolean;
  CX_CPQ: boolean;
}
