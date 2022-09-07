# These are the default configs
# DON'T EDIT THIS FILE
# If you want to use different values, create a file named 'config.sh'
# If present, 'config.sh' will be used as well in addition to 'config.default.sh' (to override variables).

# Url of the hybris backend
# Will replace default host (https://localhost:9002) as a backend endpoint
# Make sure you specify the full url for the backend (https://[host]:[port]
BACKEND_URL="https://40.76.109.9:9002"

# A comma separated list of base sites.
# When empty, the base sites will not be explicitly specified in spartacus-configuration.module.ts
BASE_SITE=

OCC_PREFIX="/occ/v2/"

URL_PARAMETERS="baseSite,language,currency"

declare -A SPARTACUS_PROJECTS=(
        [dist/core]="projects/core"
        [dist/assets]="projects/assets"
        [dist/storefrontlib]="projects/storefrontlib"
        [projects/storefrontstyles]="projects/storefrontstyles"
        [projects/schematics]="projects/schematics"
        [dist/cds]="integration-libs/cds"
        [dist/cdc]="integration-libs/cdc"
        [dist/epd-visualization]="integration-libs/epd-visualization"
        [dist/setup]="core-libs/setup"
        [dist/asm]="feature-libs/asm"
        [dist/organization]="feature-libs/organization"
        [dist/storefinder]="feature-libs/storefinder"
        [dist/checkout]="feature-libs/checkout"
        [dist/smartedit]="feature-libs/smartedit"
        [dist/product]="feature-libs/product"
        [dist/product-configurator]="feature-libs/product-configurator"
        [dist/qualtrics]="feature-libs/qualtrics"
        [dist/cart]="feature-libs/cart"
        [dist/order]="feature-libs/order"
        [dist/user]="feature-libs/user"
        [dist/tracking]="feature-libs/tracking"
        )

SPARTACUS_REPO_URL="https://github.com/SAP/spartacus.git"
BRANCH='develop'

# custom location for the installation output
# BASE_DIR='/tmp/'

# other locations
CLONE_DIR="clone"
INSTALLATION_DIR="apps"
E2E_TEST_DIR=${CLONE_DIR}/projects/storefrontapp-e2e-cypress

ANGULAR_CLI_VERSION='^13.3.0'
SPARTACUS_VERSION='latest'

CSR_PORT="4200"
SSR_PORT="4100"
SSR_PWA_PORT=

CSR_APP_NAME="csr"
SSR_APP_NAME="ssr"
SSR_PWA_APP_NAME="ssr-pwa"

ADD_B2B_LIBS=false

ADD_CPQ=false
ADD_CDC=false
# config.epd-visualization.sh contains default values to use in your config.sh when ADD_EPD_VISUALIZATION is true.
ADD_EPD_VISUALIZATION=false

# The base URL (origin) of the SAP EPD Fiori launchpad
EPD_VISUALIZATION_BASE_URL=

# Patch App Module, to redirect "/product/<code>" to "/product/<code>/<name>". B2B Tests are not passing otherwise.
PATCH_APP_MODULE=false