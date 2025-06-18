const token = process.env.CONTINUUM_REGISTRY_TOKEN;

if (!token) {
  console.warn(
    '\nWarning: CONTINUUM_REGISTRY_TOKEN not found. Continuum package will not be installed.\n'
  );
  process.exit(0);
}
