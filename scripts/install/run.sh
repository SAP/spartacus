#!/usr/bin/env bash
set -e

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
        echo "It seems Verdaccio is already running with PID: ${VERDACCIO_PID}. Killing it."
        kill ${VERDACCIO_PID}
    fi

    npm config set @spartacus:registry https://registry.npmjs.org/

    printh "Installing installation script npm required packages"

    npm i -g verdaccio@4
    npm i -g serve
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

function install_from_npm {
    printh "Installing Spartacus from npm libraries"

    prepare_install

    create_apps
}

function create_shell_app {
    ( cd ${INSTALLATION_DIR} && ng new ${1} --style=scss --routing=false)
}

function add_b2b {
    if [ "${ADD_B2B_LIBS}" = true ] ; then
        ng add @spartacus/organization@${SPARTACUS_VERSION} --interactive false
    fi
}

function add_cdc {
  if [ "$ADD_CDC" = true ] ; then
        ng add @spartacus/cdc@${SPARTACUS_VERSION} --interactive false
    fi
}

function add_product_configurator {
    local FEATURES=(--features="Textfield-Configurator");

    if [ "$ADD_CPQ" = true ] ; then
        FEATURES+=(--features="CPQ-Configurator");
    fi

    ng add @spartacus/product-configurator@${SPARTACUS_VERSION} --interactive false "${FEATURES[@]}"
}

# Don't install b2b features here (use add_b2b function for that)
function add_feature_libs {
  ng add @spartacus/storefinder@${SPARTACUS_VERSION} --interactive false
  ng add @spartacus/smartedit@${SPARTACUS_VERSION} --interactive false
  ng add @spartacus/asm@${SPARTACUS_VERSION} --interactive false
  ng add @spartacus/tracking@${SPARTACUS_VERSION} --interactive false --features="Personalization" --features="TMS-GTM" --features="TMS-AEPL"
  ng add @spartacus/product@${SPARTACUS_VERSION} --interactive false
  ng add @spartacus/qualtrics@${SPARTACUS_VERSION} --interactive false
  ng add @spartacus/cart@${SPARTACUS_VERSION} --interactive false
}

function add_spartacus_csr {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "${ADD_B2B_LIBS}" = true ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --configuration b2b --interactive false
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --configuration b2c --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_product_configurator
    )
}

function add_spartacus_ssr {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "${ADD_B2B_LIBS}" = true ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --ssr --configuration b2b --interactive false
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --ssr --configuration b2c --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_product_configurator
    )
}

function add_spartacus_ssr_pwa {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "${ADD_B2B_LIBS}" = true ] ; then
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --ssr --pwa --configuration b2b --interactive false
    else
      ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --ssr --pwa --configuration b2c --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_product_configurator
    )
}

function create_apps {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app install (no port defined)"
    else
        printh "Installing csr app"
        create_shell_app ${CSR_APP_NAME}
        add_spartacus_csr ${CSR_APP_NAME}
    fi
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app install (no port defined)"
    else
        printh "Installing ssr app"
        create_shell_app ${SSR_APP_NAME}
        add_spartacus_ssr ${SSR_APP_NAME}
    fi
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with pwa app install (no port defined)"
    else
        printh "Installing ssr app (with pwa support)"
        create_shell_app ${SSR_PWA_APP_NAME}
        add_spartacus_ssr_pwa ${SSR_PWA_APP_NAME}
    fi
}

function install_from_sources {
    printh "Installing @spartacus/*@${SPARTACUS_VERSION} from sources"

    prepare_install

    npm set @spartacus:registry http://localhost:4873/

    clone_repo

    printh "Installing source dependencies."
    ( cd ${CLONE_DIR} && yarn install )

    printh "Building spa libraries from source."
    ( cd ${CLONE_DIR} && yarn build:libs)

    printh "Updating projects versions."
    update_projects_versions ${SPARTACUS_PROJECTS[@]}

    verdaccio --config ./config.yaml &

    VERDACCIO_PID=$!
    echo "verdaccio PID: ${VERDACCIO_PID}"

    sleep 45

    printh "Creating core npm package"
    ( cd ${CLONE_DIR}/dist/core && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating storefrontlib npm package"
    ( cd ${CLONE_DIR}/dist/storefrontlib && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating storefrontstyles npm package"
    ( cd ${CLONE_DIR}/projects/storefrontstyles && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating assets npm package"
    ( cd ${CLONE_DIR}/dist/assets && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating schematics npm package"
    ( cd ${CLONE_DIR}/projects/schematics && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating cds npm package"
    ( cd ${CLONE_DIR}/dist/cds && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating cdc npm package"
    ( cd ${CLONE_DIR}/dist/cdc && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating setup npm package"
    ( cd ${CLONE_DIR}/dist/setup && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating organization npm package"
    ( cd ${CLONE_DIR}/dist/organization && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating storefinder npm package"
    ( cd ${CLONE_DIR}/dist/storefinder && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating product-configurator npm package"
    ( cd ${CLONE_DIR}/dist/product-configurator && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating product npm package"
    ( cd ${CLONE_DIR}/dist/product && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating asm npm package"
    ( cd ${CLONE_DIR}/dist/asm && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating user npm package"
    ( cd ${CLONE_DIR}/dist/user && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating tracking npm package"
    ( cd ${CLONE_DIR}/dist/tracking && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating cart npm package"
    ( cd ${CLONE_DIR}/dist/cart && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating qualtrics npm package"
    ( cd ${CLONE_DIR}/dist/qualtrics && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    printh "Creating smartedit npm package"
    ( cd ${CLONE_DIR}/dist/smartedit && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    create_apps

    sleep 5

    (kill ${VERDACCIO_PID} || echo "Verdaccio not running on PID ${VERDACCIO_PID}. Was it already runnig before starting the script?")

    npm set @spartacus:registry https://registry.npmjs.org/
    echo "Finished: npm @spartacus:registry set back to https://registry.npmjs.org/"
}

function build_csr {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app build (No port defined)"
    else
        printh "Building csr app"
        ( cd ${INSTALLATION_DIR}/${CSR_APP_NAME} && yarn build --prod )
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

function run_e2e_tests {
    printh "Running e2e tests on app"
    pushd ${E2E_TEST_DIR} > /dev/null
    yarn
    popd > /dev/null
    pushd ${CLONE_DIR} > /dev/null
    yarn e2e:cy:run
    popd > /dev/null
}

function cmd_help {
    echo "Usage: run [command]"
    echo "Available commands are:"
    echo " install (from sources)"
    echo " install_npm (from latest npm packages)"
    echo " start"
    echo " stop"
    echo " e2e"
    echo " help"
}

if [ -z "${1}" ]; then
    cmd_help
    exit 1
fi

readonly commands="${1}"

echo "Loading configs from ./config.default.sh"
. ./config.default.sh

if [ -f "./config.sh" ]; then
    echo "Custom config file ./config.sh found. Loading configurations (overriding vars from the default config)."
    . ./config.sh
fi

if [[ -z ${SPARTACUS_VERSION} ]]; then
    SPARTACUS_VERSION="latest"
fi

if [[ -z ${BRANCH} ]]; then
    BRANCH="develop"
fi

if [[ -z ${CSR_APP_NAME} ]]; then
    CSR_APP_NAME="csr"
fi

if [[ -z ${SSR_APP_NAME} ]]; then
    SSR_APP_NAME="ssr"
fi

if [[ -z ${SSR_PWA_APP_NAME} ]]; then
    SSR_PWA_APP_NAME="ssr-pwa"
fi

# top directory for the installation (must be outside of the main project)
if [ -z ${BASE_DIR} ]; then
    BASE_DIR="../../../spartacus-${SPARTACUS_VERSION}"
    echo "Setting base directory to ${BASE_DIR}"
fi
CLONE_DIR="${BASE_DIR}/${CLONE_DIR}"
INSTALLATION_DIR="${BASE_DIR}/${INSTALLATION_DIR}"
E2E_TEST_DIR="${BASE_DIR}/${E2E_TEST_DIR}"

for current_command in $(echo "${commands}" | tr "+" "\n"); do

    case "${current_command}" in
        'install' )
            install_from_sources;;
        'install_npm' )
            install_from_npm;;
        'start' )
            start_apps;;
        'stop' )
            stop_apps;;
        'help' )
            cmd_help;;
        'e2e' )
            run_e2e_tests;;
        * )
            echo "Error: unknown command ${current_command}"
            cmd_help
            exit 1;;
    esac
done
