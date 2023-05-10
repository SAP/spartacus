#!/usr/bin/env bash

function buildLibsAndStorefront {

  echo '-----'
  echo "Building Spartacus libraries"
  
  npm ci
  
  (cd projects/storefrontapp-e2e-cypress && npm ci)
  
  npm run build:libs 2>&1 | tee build.log
  
  results=$(grep "Warning: Can't resolve all parameters for" build.log || true)
  if [[ -z "${results}" ]]; then
      echo "Success: Spartacus production build was successful."
      rm build.log
  else
      echo "ERROR: Spartacus production build failed. Check the import statements. 'Warning: Can't resolve all parameters for ...' found in the build log."
      rm build.log
      exit 1
  fi
  echo '-----'
  echo "Building Spartacus storefrontapp"
  npm run build
     
}
