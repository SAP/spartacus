# These are the default configs
# DON'T EDIT THIS FILE
# If you want to use different values, create a file named 'config.sh'
# If present, 'config.sh' will be used as well in addition to 'config.default.sh' (to override variables).

# Url of the hybris backend
# Will replace default host (https://localhost:9002) as a backend endpoint
# Make sure you specify the full url for the backend (https://[host]:[port]
BACKEND_URL="https://localhost:9002"

OCC_PREFIX="/occ/v2/"

SPARTACUS_PROJECTS=(
        "core"
        "assets"
        "storefrontlib"
        "storefrontstyles"
        "schematics"
        )

SPARTACUS_REPO_URL="git://github.com/SAP/spartacus.git"
BRANCH='develop'

# custom location for the installation output
# BASE_DIR='/tmp/'

# other locations
CLONE_DIR="clone"
INSTALLATION_DIR="apps"
E2E_TEST_DIR=${CLONE_DIR}/projects/storefrontapp-e2e-cypress

ANGULAR_CLI_VERSION='~10.1.0'
SPARTACUS_VERSION='latest'

CSR_PORT="4200"
SSR_PORT="4100"
SSR_PWA_PORT=
