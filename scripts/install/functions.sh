#!/usr/bin/env bash

# Prints header
function printh {
    local input="$1"
    local len=$((${#1}+2))
    printf "\033[32m" # start green color
    printf "\n+"
    printf -- "-%.0s" $(seq 1 $len)
    printf "+\n| $input |\n+"
    printf -- "-%.0s" $(seq 1 $len)
    printf "+\n\n"
    printf "\033[0m" # end green color
}

function delete_dir {
    local dir="${1}"
    if [ -d ${dir} ]; then
        echo "deleting directory ./${dir}"
        rm -rf ${dir}
    fi
}

function cmd_clean {
    printh "Cleaning old spartacus installation workspace"

    delete_dir ${BASE_DIR}
    delete_dir storage

    yarn cache clean
}

function prepare_install {
    cmd_clean

    printh "Installing installation script prerequisites"

    VERDACCIO_PID=`lsof -nP -i4TCP:4873 | grep LISTEN | tr -s ' ' | cut -d ' ' -f 2`
    if [[ -n ${VERDACCIO_PID} ]]; then
        echo "Verdaccio is already running with PID: ${VERDACCIO_PID}. Killing it."
        kill ${VERDACCIO_PID}
    fi

    npm i -g verdaccio@5
    npm i -g npm-cli-login
    npm i -g serve@13.0.4
    npm i -g pm2
    npm i -g concurrently
    npm i -g @angular/cli@${ANGULAR_CLI_VERSION}

    ng config -g cli.packageManager yarn

    mkdir -p ${INSTALLATION_DIR}
    ng analytics off
}

function clone_repo {
    printh "Cloning Spartacus installation repo."

    echo "Cloning from ${SPARTACUS_REPO_URL}. Currently in `pwd`"
    ls -l ${BASE_DIR}

    git clone -b ${BRANCH} ${SPARTACUS_REPO_URL} ${CLONE_DIR} --depth 1
}

function update_projects_versions {

    projects=$@
    if [[ "${SPARTACUS_VERSION}" == "next" ]] || [[ "${SPARTACUS_VERSION}" == "latest" ]]; then
        SPARTACUS_VERSION="999.999.999"
    fi

    printh "Updating all library versions to ${SPARTACUS_VERSION}"
    for i in ${projects}
        do
            (cd "${CLONE_DIR}/${i}" && pwd && sed -i -E 's/"version": "[^"]+/"version": "'"${SPARTACUS_VERSION}"'/g' package.json);
        done
}

function create_shell_app {
    ( cd ${INSTALLATION_DIR} && ng new ${1} --style scss --no-routing)
}

function add_b2b {
    if [ "${ADD_B2B_LIBS}" = true ] ; then
        ng add @spartacus/organization@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
        ng add @spartacus/checkout --skip-confirmation --no-interactive --features "Checkout-B2B" --features "Checkout-Scheduled-Replenishment"
    fi
}

function add_cdc {
  if [ "$ADD_CDC" = true ] ; then
        ng add @spartacus/cdc@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
    fi
}

function add_epd_visualization {
    if [ "$ADD_EPD_VISUALIZATION" = true ] ; then
        ng add @spartacus/epd-visualization --base-url ${EPD_VISUALIZATION_BASE_URL} --skip-confirmation --no-interactive
    fi
}

function add_product_configurator {
    ng add @spartacus/product-configurator@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
    ng add @spartacus/product-configurator --skip-confirmation --no-interactive --features "Textfield-Configurator" --features "VC-Configurator"

    if [ "$ADD_CPQ" = true ] ; then
        ng add @spartacus/product-configurator --skip-confirmation --no-interactive --features "CPQ-Configurator"
    fi
}

# Don't install b2b features here (use add_b2b function for that)
function add_feature_libs {
  ng add @spartacus/tracking --skip-confirmation --no-interactive --features "TMS-GTM" --features "TMS-AEPL"
  ng add @spartacus/qualtrics@${SPARTACUS_VERSION} --skip-confirmation --no-interactive
}

function add_spartacus_csr {
    local IS_NPM_INSTALL="$2"   
    ( cd ${INSTALLATION_DIR}/${1}
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        create_npmrc ${CSR_APP_NAME}
    fi
    if [ "$BASE_SITE" = "" ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --skip-confirmation --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --url-parameters ${URL_PARAMETERS} --no-interactive
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --skip-confirmation --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --base-site ${BASE_SITE} --url-parameters ${URL_PARAMETERS} --no-interactive
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        remove_npmrc
    fi
    )
}

function add_spartacus_ssr {
    local IS_NPM_INSTALL="$2"
    ( cd ${INSTALLATION_DIR}/${1}
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        create_npmrc ${SSR_APP_NAME}
    fi
    
    if [ "$BASE_SITE" = "" ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --url-parameters ${URL_PARAMETERS} --ssr --no-interactive --skip-confirmation
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --base-site ${BASE_SITE} --url-parameters ${URL_PARAMETERS} --ssr --no-interactive --skip-confirmation
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    remove_npmrc
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        remove_npmrc
    fi
    )
}

function add_spartacus_ssr_pwa {
    local IS_NPM_INSTALL="$2"
    ( cd ${INSTALLATION_DIR}/${1}
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        create_npmrc ${SSR_PWA_APP_NAME}
    fi
    if [ "$BASE_SITE" = "" ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --url-parameters ${URL_PARAMETERS} --ssr --pwa --no-interactive --skip-confirmation
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwrite-app-component --base-url ${BACKEND_URL} --occ-prefix ${OCC_PREFIX} --base-site ${BASE_SITE} --url-parameters ${URL_PARAMETERS} --ssr --pwa --no-interactive --skip-confirmation
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    if [ ! -z "$IS_NPM_INSTALL" ] ; then
        remove_npmrc
    fi
    )
}

function create_apps {
    local IS_NPM_INSTALL="${1}"
    echo "create_apps is_npm_install: ${IS_NPM_INSTALL}"
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app install (no port defined)"
    else
        printh "Installing csr app"
        create_shell_app ${CSR_APP_NAME}
        add_spartacus_csr ${CSR_APP_NAME} ${IS_NPM_INSTALL}
    fi
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app install (no port defined)"
    else
        printh "Installing ssr app"
        create_shell_app ${SSR_APP_NAME}
        add_spartacus_ssr ${SSR_APP_NAME} ${IS_NPM_INSTALL}
    fi
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with pwa app install (no port defined)"
    else
        printh "Installing ssr app (with pwa support)"
        create_shell_app ${SSR_PWA_APP_NAME}
        add_spartacus_ssr_pwa ${SSR_PWA_APP_NAME} ${IS_NPM_INSTALL}
    fi
}

function publish_dist_package {
    local PKG_NAME=${1};
    printh "Creating ${PKG_NAME} npm package"
    ( cd ${CLONE_DIR}/dist/${PKG_NAME} && yarn publish --new-version ${SPARTACUS_VERSION} --registry http://localhost:4873/ --no-git-tag-version )
}

function publish_package {
    local PKG_NAME=${1};
    printh "Creating ${PKG_NAME} npm package"
    ( cd ${CLONE_DIR}/projects/${PKG_NAME} && yarn publish --new-version ${SPARTACUS_VERSION} --registry http://localhost:4873/ --no-git-tag-version )
}

function restore_clone {
    if [ ${BRANCH} == 'develop' ]; then
        pushd ../.. > /dev/null
        for path in ${SPARTACUS_PROJECTS[@]}
        do
            if [ -f "${path}/package.json-E" ]; then
                rm ${path}/package.json-E
            fi
        done
        git checkout .
        popd > /dev/null
    fi
}

function install_from_sources {
    printh "Installing @spartacus/*@${SPARTACUS_VERSION} from sources"

    prepare_install

    npm set @spartacus:registry http://localhost:4873/

    printh "Cloning Spartacus source code and installing dependencies."
    clone_repo
    ( cd ${CLONE_DIR} && yarn install && yarn build:libs)

    printh "Updating projects versions."
    update_projects_versions ${SPARTACUS_PROJECTS[@]}

    verdaccio --config ./config.yaml &

    VERDACCIO_PID=$!
    echo "verdaccio PID: ${VERDACCIO_PID}"

    sleep 15

    (npm-cli-login -u verdaccio-user -p 1234abcd -e verdaccio-user@spartacus.com -r http://localhost:4873)

    local dist_packages=(
        'core'
        'storefrontlib'
        'assets'
        'checkout'
        'product'
        'setup'
        'cart'
        'order'
        'asm'
        'user'
        'organization'
        'storefinder'
        'tracking'
        'qualtrics'
        'smartedit'
        'cds'
        'cdc'
        'epd-visualization'
        'product-configurator'
    )

    local packages=(
        'storefrontstyles'
        'schematics'
    )

    for package in ${dist_packages[@]}; do
        publish_dist_package ${package}
    done

    for package in ${packages[@]}; do
        publish_package ${package}
    done

    create_apps

    sleep 5

    (kill ${VERDACCIO_PID} || echo "Verdaccio not running on PID ${VERDACCIO_PID}. Was it already runnig before starting the script?")

    npm set @spartacus:registry https://registry.npmjs.org/

    restore_clone

    echo "Finished: npm @spartacus:registry set back to https://registry.npmjs.org/"
}

function install_from_npm {
    printh "Installing Spartacus from npm libraries"
  
    if [ -z "${NPM_URL}" ]; then
        echo "Please fill NPM_URL"
    else
        prepare_install

        #flag true to specify install is from npm
        create_apps true

        remove_npm_token
    fi
    
}

function build_csr {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app build (No port defined)"
    else
        printh "Building csr app"
        ( cd ${INSTALLATION_DIR}/${CSR_APP_NAME} && yarn build --configuration production )
    fi
}

function build_ssr {
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app build (No port defined)"
    else
        printh "Building ssr app"
        ( cd ${INSTALLATION_DIR}/${SSR_APP_NAME} && yarn build && yarn build:ssr )
    fi
}

function build_ssr_pwa {
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with PWA app build (No port defined)"
    else
        printh "Building ssr app with PWA"
        ( cd ${INSTALLATION_DIR}/${SSR_PWA_APP_NAME} && yarn build && yarn build:ssr )
    fi
}

function start_csr_unix {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app start (no port defined)"
    else
        build_csr
        printh "Starting csr app"
        pm2 start --name "${CSR_APP_NAME}-${CSR_PORT}" serve -- ${INSTALLATION_DIR}/${CSR_APP_NAME}/dist/${CSR_APP_NAME}/ --single -p ${CSR_PORT}
    fi
}

function start_ssr_unix {
     if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app start (no port defined)"
    else
        build_ssr
        printh "Starting ssr app"
        ( cd ${INSTALLATION_DIR}/${SSR_APP_NAME} && export PORT=${SSR_PORT} && export NODE_TLS_REJECT_UNAUTHORIZED=0 && pm2 start --name "${SSR_APP_NAME}-${SSR_PORT}" dist/${SSR_APP_NAME}/server/main.js )
    fi
}

function start_ssr_pwa_unix {
     if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr (with pwa support) app start (no port defined)"
    else
        build_ssr_pwa
        printh "Starting ssr app (with pwa support)"
        ( cd ${INSTALLATION_DIR}/${SSR_PWA_APP_NAME} && export PORT=${SSR_PWA_PORT} && export NODE_TLS_REJECT_UNAUTHORIZED=0 && pm2 start --name "${SSR_PWA_APP_NAME}-${SSR_PWA_PORT}" dist/${SSR_PWA_APP_NAME}/server/main.js )
    fi
}

function start_windows_apps {
    build_csr
    concurrently "serve ${INSTALLATION_DIR}/${CSR_APP_NAME}/dist/csr --single -p ${CSR_PORT}" --names "${CSR_APP_NAME}-{CSR_PORT}}"
}

function start_apps {
    if [[ "${OSTYPE}" == "cygwin" ]]; then
        start_windows_apps
    elif [[ "${OSTYPE}" == "msys" ]]; then
        start_windows_apps
    elif [[ "${OSTYPE}" == "win32" ]]; then
        start_windows_apps
    else
        start_csr_unix
        start_ssr_unix
        start_ssr_pwa_unix
    fi
}

function stop_apps {
    pm2 stop "${CSR_APP_NAME}-${CSR_PORT}"
    pm2 stop "${SSR_APP_NAME}-${SSR_PORT}"
    pm2 stop "${SSR_PWA_APP_NAME}-${SSR_PORT}"
}

function cmd_help {
    echo "Usage: run [command]"
    echo "Available commands are:"
    echo " install (from sources)"
    echo " install_npm (from latest npm packages)"
    echo " start"
    echo " stop"
    echo " help"
}

function create_npmrc {   
    local NPMRC_CONTENT="always-auth=${NPM_ALWAYS_AUTH}\n@spartacus:registry=${NPM_URL}\n$(echo ${NPM_URL} | sed 's/https://g'):_auth=${NPM_TOKEN}\nemail=${NPM_EMAIL}\n"
    if [ -z "$NPM_TOKEN" ] ; then
        echo "NPM_TOKEN is empty"
    fi
    if [ -z "$NPM_EMAIL" ] ; then
        echo "NPM_EMAIL is empty"
    fi    
    echo "creating .npmrc file in ${1} folder"    
    printf $NPMRC_CONTENT > .npmrc
    echo "Spartacus registry url for ${1} app: $(npm config get '@spartacus:registry')"   
}

function remove_npmrc {   
    if [ -f "./.npmrc" ]; then
        echo 'removing .npmrc file'
        rm -rf .npmrc
    fi
}

function remove_npm_token {
    if [[ -f "./config.sh" &&  ! -z "${NPM_TOKEN}" ]]; then
        echo 'removing NPM_TOKEN value from config.sh'
        sed -i'' -e 's/NPM_TOKEN=.*/NPM_TOKEN=/g' config.sh
    fi
}