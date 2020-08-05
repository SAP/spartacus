declare var build: Build;

interface Build {
  process: BuildProcess;
}

interface BuildProcess {
  env: Env;
}

interface Env {
  SPARTACUS_BASE_URL: string;
  SPARTACUS_API_PREFIX: string;
  SPARTACUS_CDS: boolean;
  SPARTACUS_B2B: boolean;
  SPARTACUS_CDC: boolean;
}
