#!/usr/bin/env bash

WARNINGS=()
HAS_XVFB_INSTALLED=false
HAS_GNU_PARALLEL_INSTALLED=false
CUSTOM_CACHE_DIR="$(pwd)/.cache"

TIME_MEASUREMENT_CURR_TITLE="Start"
TIME_MEASUREMENT_TITLES=()
TIME_MEASUREMENT_TIMES=($(date +%s))

KEEP_YARN_CACHE=false

# Prints header adds time measurement
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
    add_time_measurement "$input"
}

function delete_dir {
    local dir="${1}"
    local temp_dir="${1}.delete"

    echo "deleting directory ${dir} in background"
    if [ -d ${temp_dir} ]; then
        delete_dir ${temp_dir}
    fi
    if [ -d ${dir} ]; then
        mv ${dir} ${temp_dir}
        rm -rf ${temp_dir} &
    fi
}

function cmd_clean {
    printh "Cleaning old spartacus installation workspace"

    delete_dir ${BASE_DIR}
    delete_dir storage
    if [[ "${KEEP_YARN_CACHE}" = false ]]; then
        delete_dir ${CUSTOM_CACHE_DIR}
    fi
}

function prepare_install {
    cmd_clean

    setup_custom_yarn_cache "global"

    printh "Installing installation script prerequisites"

    VERDACCIO_PID=`lsof -nP -i4TCP:4873 | grep LISTEN | tr -s ' ' | cut -d ' ' -f 2`
    if [[ -n ${VERDACCIO_PID} ]]; then
        echo "Verdaccio is already running with PID: ${VERDACCIO_PID}. Killing it."
        kill ${VERDACCIO_PID}
    fi

    npm config set @spartacus:registry https://registry.npmjs.org/

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
    local update_commands=()
    for project in ${projects}; do
        update_commands+=( "cd \"${CLONE_DIR}/${project}\" && pwd && sed -i -E 's/\"version\": \"[^\"]+/\"version\": \"'\"${SPARTACUS_VERSION}\"'/g' package.json" )
    done
    run_parallel_chunked "${MAX_PARALLEL}" "${update_commands[@]}"
}

function create_shell_app {
    ( cd ${INSTALLATION_DIR} && ng new ${1} --package-manager yarn --style=scss --routing=false)
}

function add_b2b {
    if [ "${ADD_B2B_LIBS}" = true ] ; then
        ng add --skip-confirmation @spartacus/organization@${SPARTACUS_VERSION} --interactive false
        ng add --skip-confirmation @spartacus/checkout@${SPARTACUS_VERSION} --interactive false --features="Checkout-B2B" --features="Checkout-Scheduled-Replenishment"
    fi
}

function add_cdc {
  if [ "$ADD_CDC" = true ] ; then
        ng add --skip-confirmation @spartacus/cdc@${SPARTACUS_VERSION} --interactive false
    fi
}

function add_epd_visualization {
    if [ "$ADD_EPD_VISUALIZATION" = true ] ; then
        ng add --skip-confirmation @spartacus/epd-visualization@${SPARTACUS_VERSION} --baseUrl ${EPD_VISUALIZATION_BASE_URL} --interactive false
    fi
}

function add_product_configurator {
    ng add --skip-confirmation @spartacus/product-configurator@${SPARTACUS_VERSION} --interactive false --features="Textfield-Configurator" --features="VC-Configurator"

    if [ "$ADD_CPQ" = true ] ; then
        ng add --skip-confirmation @spartacus/product-configurator@${SPARTACUS_VERSION} --interactive false --features="CPQ-Configurator"
    fi
}

# Don't install b2b features here (use add_b2b function for that)
function add_feature_libs {
  ng add --skip-confirmation @spartacus/tracking@${SPARTACUS_VERSION} --interactive false --features="TMS-GTM" --features="TMS-AEPL"
  ng add --skip-confirmation @spartacus/qualtrics@${SPARTACUS_VERSION} --interactive false
}

function add_spartacus_csr {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "$BASE_SITE" = "" ] ; then
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --urlParameters ${URL_PARAMETERS} --interactive false
    else
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --baseSite ${BASE_SITE} --urlParameters ${URL_PARAMETERS} --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    )
}

function add_spartacus_ssr {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "$BASE_SITE" = "" ] ; then
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --urlParameters ${URL_PARAMETERS} --ssr --interactive false
    else
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --baseSite ${BASE_SITE} --urlParameters ${URL_PARAMETERS} --ssr --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    )
}

function add_spartacus_ssr_pwa {
    ( cd ${INSTALLATION_DIR}/${1}
    if [ "$BASE_SITE" = "" ] ; then
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --urlParameters ${URL_PARAMETERS} --ssr --pwa --interactive false
    else
      ng add --skip-confirmation @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --baseSite ${BASE_SITE} --urlParameters ${URL_PARAMETERS} --ssr --pwa --interactive false
    fi
    add_feature_libs
    add_b2b
    add_cdc
    add_epd_visualization
    add_product_configurator
    )
}

function create_apps {
    local create_apps=()

    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app install (no port defined)"
    else
        printh "Add csr app"
        create_apps+=("create_csr")
    fi
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app install (no port defined)"
    else
        printh "Add ssr app"
        create_apps+=("create_ssr")
    fi
    if [ -z "${SSR_PWA_PORT}" ]; then
        echo "Skipping ssr with pwa app install (no port defined)"
    else
        printh "Add ssr app (with pwa support)"
        create_apps+=("create_ssr_pwa")
    fi

    printh "Create Apps"
    run_parallel "${create_apps[@]}"
}

function create_csr {
    setup_custom_yarn_cache "csr"
    create_shell_app ${CSR_APP_NAME}
    add_spartacus_csr ${CSR_APP_NAME}
}

function create_ssr {
    setup_custom_yarn_cache "ssr"
    create_shell_app ${SSR_APP_NAME}
    add_spartacus_ssr ${SSR_APP_NAME}
}

function create_ssr_pwa {
    setup_custom_yarn_cache "pwa"
    create_shell_app ${SSR_PWA_APP_NAME}
    add_spartacus_ssr_pwa ${SSR_PWA_APP_NAME}
}

function setup_custom_yarn_cache {
    YARN_CACHE_FOLDER="${CUSTOM_CACHE_DIR}/yarn-${1}"
    mkdir -p "$YARN_CACHE_FOLDER"
    export YARN_CACHE_FOLDER
}


function clean_package {
    local PKG_PATH="${1}"
    local NPM_PKG_NAME=$(get_package_name "$PKG_PATH/package.json")

    local dir="storage/${NPM_PKG_NAME}"
    echo "clean package ${NPM_PKG_NAME}"
    if [ -d ${dir} ]; then
        echo " - removing package ${NPM_PKG_NAME}"
        rm -rf ${dir}
        yarn cache clean --force "${NPM_PKG_NAME}"
    fi
}

function get_package_name {
    local PKG_JSON="${1}"
    cat "${PKG_JSON}"  | grep '"name":' | cut -d':' -f 2 | cut -d'"' -f 2
}

function publish_package {
    local PKG_PATH=${1}
    echo "Creating ${PKG_PATH} npm package"

    clean_package "${PKG_PATH}"

    (cd ${PKG_PATH} && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version)
}

function restore_clone {
    projects=$@

    if [ ${BRANCH} == 'develop' ]; then
        pushd ../.. > /dev/null
        for path in ${projects[@]}
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
    run_system_check

    run_sanity_check

    printh "Installing @spartacus/*@${SPARTACUS_VERSION} from sources"

    prepare_install

    npm set @spartacus:registry http://localhost:4873/

    printh "Cloning Spartacus source code."
    clone_repo

    printh "Checking Packages"
    local project_packages=()
    local project_sources=()
    for project in ${SPARTACUS_PROJECTS[@]}; do
        local proj_pck_dir=${project%%:*}
        local proj_src_dir=${project#*:}

        local pkg_src_path="${CLONE_DIR}/${proj_src_dir}"
        if [ ! -d "${pkg_src_path}" ]; then
            WARNINGS+=("[PACKAGE_MISSING] Path not existing ($pkg_src_path).")
            printf " \033[33m[!]\033[m ${proj_pck_dir}: ${proj_src_dir}\n"
            continue
        fi

        project_packages+=( "${proj_pck_dir}" )
        project_sources+=( "${proj_src_dir}" )
        echo " [+] ${proj_pck_dir}: ${proj_src_dir}"
    done

    printh "Installing dependencies & build libs"
    ( cd ${CLONE_DIR} && yarn install && yarn build:libs)

    printh "Updating projects versions."
    update_projects_versions ${project_sources[@]}

    verdaccio --config ./config.yaml &

    VERDACCIO_PID=$!
    echo "verdaccio PID: ${VERDACCIO_PID}"

    sleep 15

    (npm-cli-login -u verdaccio-user -p 1234abcd -e verdaccio-user@spartacus.com -r http://localhost:4873)

    printh "Publish Packages"
    local packages_commands=()
    for project in ${project_packages[@]}; do
        packages_commands+=( "publish_package ${CLONE_DIR}/${project}" )
    done
    run_parallel_chunked "${MAX_PARALLEL}" "${packages_commands[@]}"

    create_apps

    sleep 5

    (kill ${VERDACCIO_PID} || echo "Verdaccio not running on PID ${VERDACCIO_PID}. Was it already runnig before starting the script?")

    npm set @spartacus:registry https://registry.npmjs.org/

    restore_clone ${project_sources[@]}

    echo "Finished: npm @spartacus:registry set back to https://registry.npmjs.org/"

    print_warnings

    print_times

    print_summary
}

function install_from_npm {
    printh "Installing Spartacus from npm libraries"

    prepare_install

    create_apps
}

function build_csr {
    if [ -z "${CSR_PORT}" ]; then
        echo "Skipping csr app build (No port defined)"
    else
        printh "Building csr app"
        ( mkdir -p ${INSTALLATION_DIR}/${CSR_APP_NAME} && cd ${INSTALLATION_DIR}/${CSR_APP_NAME} && yarn build --configuration production )
    fi
}

function build_ssr {
    if [ -z "${SSR_PORT}" ]; then
        echo "Skipping ssr app build (No port defined)"
    else
        printh "Building ssr app"
        ( mkdir -p ${INSTALLATION_DIR}/${SSR_APP_NAME} && cd ${INSTALLATION_DIR}/${SSR_APP_NAME} && yarn build && yarn build:ssr )
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


    if [[ "$CHECK_AFTER_START" = true ]] ; then
        check_apps
    fi

    if [[ "$CHECK_B2B_AFTER_START" = true ]] ; then
        check_b2b
    fi
}

function stop_apps {
    pm2 stop "${CSR_APP_NAME}-${CSR_PORT}"
    pm2 stop "${SSR_APP_NAME}-${SSR_PORT}"
    pm2 stop "${SSR_PWA_APP_NAME}-${SSR_PORT}"
}

function cmd_help {
    echo "Usage: run [command] [options...]"
    echo "Available commands are:"
    echo " install [...extensions] [--port <port>] [--branch <branch>] [--basesite <basesite>] [--skipsanity] (from sources)"
    echo " install_npm (from latest npm packages)"
    echo " start [--port <port>] [-c|--check] [--check-b2b] [--force-e2e] [--skip-e2e]"
    echo " stop [--port <port>]"
    echo " help"
}

function print_warnings {
    echo ""
    echo "${#WARNINGS[@]} Warnings"

    for WARNING in "${WARNINGS[@]}"
    do
        echo " ❗️ $WARNING"
    done
}

function check_apps {
    printh "Checking Sparatcus"

    sleep 5

    echo "Checking CSR ..."
    local CSR_RESULT=$(check_csr)

    echo "Checking SSR ..."
    local SSR_RESULT=$(check_ssr)

    echo "Running E2E ..."
    local E2E_RESULT=$(run_e2e)

    echo ""
    echo "$E2E_RESULT"
    echo "$SSR_RESULT"
    echo "$CSR_RESULT"
}

function check_b2b {
    printh "Checking Sparatcus B2B"

    sleep 5

    echo "Checking CSR ..."
    local CSR_RESULT=$(check_csr)

    echo "Checking SSR ..."
    local SSR_RESULT=$(check_ssr)

    echo "Running E2E ..."
    local E2E_RESULT=$(run_e2e_b2b)

    echo ""
    echo "$E2E_RESULT"
    echo "$SSR_RESULT"
    echo "$CSR_RESULT"
}

function check_csr {
    local EXIT_CODE=0
    curl http://127.0.0.1:4200 &> /dev/null || EXIT_CODE=$?

    if [ $EXIT_CODE -eq 0 ]; then
        echo "✅ CSR is working."
    else
        echo "🚫 CSR is NOT working."
    fi
}

function check_ssr {
    local EXIT_CODE=0
    curl http://127.0.0.1:4100 &> /dev/null || EXIT_CODE=$?

    if [ $EXIT_CODE -eq 0 ]; then
        echo "✅ SSR is working."
    else
        echo "🚫 SSR is NOT working."
    fi
}

function run_e2e {
    if [[ "$SKIP_E2E" = true ]] ; then
        echo "⏩️ B2B E2E skipped (Option: --skip-e2e)."
        return 0
    fi

    if [ "$HAS_XVFB_INSTALLED" = false ] && [[ "$FORCE_B2B" = false ]] ; then
        echo "⏩️ E2E skipped (xvfb is missing)."
        return 0
    fi

    $(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; yarn &> /dev/null)
    local OUTPUT=$(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npx cypress run --spec "cypress/integration/regression/checkout/checkout-flow.core-e2e-spec.ts")
    local EXIT_CODE=$?

    echo "$OUTPUT"
    echo ""

    if [ $EXIT_CODE -eq 0 ]; then
        echo "✅ E2E successful."
    else
        echo "🚫 E2E failed."
    fi
}

function run_e2e_b2b {
    if [[ "$SKIP_E2E" = true ]] ; then
        echo "⏩️ B2B E2E skipped (Option: --skip-e2e)."
        return 0
    fi

    if [ "$HAS_XVFB_INSTALLED" = false ] && [[ "$FORCE_E2E" = false ]] ; then
        echo "⏩️ B2B E2E skipped (xvfb is missing)."
        return 0
    fi

    local OUTPUT
    local EXIT_CODE_1
    local EXIT_CODE_2

    $(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; yarn &> /dev/null)
    OUTPUT=$(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npx cypress run --env BASE_SITE=powertools-spa,OCC_PREFIX_USER_ENDPOINT=orgUsers --spec "cypress/integration/b2b/regression/checkout/b2b-credit-card-checkout-flow.core-e2e-spec.ts")
    EXIT_CODE_1=$?

    echo "$OUTPUT"
    echo ""

    OUTPUT=$(cd ${CLONE_DIR}/projects/storefrontapp-e2e-cypress; npx cypress run --env BASE_SITE=powertools-spa,OCC_PREFIX_USER_ENDPOINT=orgUsers --spec "cypress/integration/b2b/regression/checkout/b2b-account-checkout-flow.core-e2e-spec.ts")
    EXIT_CODE_2=$?

    echo "$OUTPUT"
    echo ""

    if [ $EXIT_CODE_1 -eq 0 ]; then
        echo "✅ [1|2] B2B E2E successful."
    else
        echo "🚫 [1|2] B2B E2E failed."
    fi

    if [ $EXIT_CODE_2 -eq 0 ]; then
        echo "✅ [2|2] B2B E2E successful."
    else
        echo "🚫 [2|2] B2B E2E failed."
    fi
}

function run_parallel_chunked {
    if [ "$HAS_GNU_PARALLEL_INSTALLED" = true ] ; then
        echo "⇶ Running in parallel chunked [fast]"
        local n="${1}"
        local tasks=("$@")

        echo "  > Tasks: $((${#tasks[@]}-1))"
        echo "  > Chunk-Size: ${n}"

        for((i=1; i < ${#tasks[@]}; i+=n))
        do
            chunk=( "${tasks[@]:i:n}" )
            echo "⇶ Running a chunk in parallel [fast]"
            for c in "${chunk[@]}"
            do
                echo "  > ${c}"
            done
            exec_parallel "${chunk[@]}"
        done
    else
        echo "→ Running linear [slow]"
        local tasks=("$@")
        unset tasks[0]
        exec_linear "${tasks[@]}"
    fi
}

function run_parallel {
    if [ "$HAS_GNU_PARALLEL_INSTALLED" = true ] ; then
        echo "⇶ Running in parallel [fast]"
        exec_parallel "${@}"
    else
        echo "→ Running linear [slow]"
        exec_linear "${@}"
    fi
}

function exec_parallel {
    local tasks=("${@}")
    exec_parallel_export_vars
    parallel -k --ungroup eval ::: "${tasks[@]}"
}

function exec_linear {
    local sep=" && "
    local tasks=("${@}")

    local ltasks=$(printf "${sep}%s" "${tasks[@]}")
    ltasks="${ltasks:${#sep}}"

    exec_parallel_export_vars
    eval "$ltasks"
}

function exec_parallel_export_vars {
    export CLONE_DIR
    export BASE_DIR
    export INSTALLATION_DIR
    export BACKEND_URL
    export OCC_PREFIX
    export URL_PARAMETERS
    export BASE_SITE
    export CUSTOM_CACHE_DIR
    export CSR_APP_NAME
    export SSR_APP_NAME
    export SSR_PWA_APP_NAME
    export SPARTACUS_VERSION
    export -f publish_package
    export -f setup_custom_yarn_cache
    export -f add_spartacus_ssr
    export -f add_spartacus_ssr_pwa
    export -f add_feature_libs
    export -f add_spartacus_csr
    export -f clean_package
    export -f get_package_name
    export -f create_shell_app
    export -f create_csr
    export -f create_ssr
    export -f create_ssr_pwa
    export -f add_b2b
    export -f add_cdc
    export -f add_epd_visualization
    export -f add_product_configurator
}


function run_sanity_check {
    if [ "$SKIP_SANITY" = true ]; then
        printh "Skip config sanity check"
    else
        printh "Run config sanity check"
        ng_sanity_check
    fi
}

function version { echo "$@" | awk -F. '{ printf("%d%03d%03d%03d\n", $1,$2,$3,$4); }'; }

function ng_sanity_check {
    if [[ "$BRANCH" == release/4.0.* ]] || [[ "$BRANCH" == release/4.3.* ]]; then
        local CLEAN_VERSION=$(echo "$ANGULAR_CLI_VERSION" | sed 's/[^0-9\.]//g')
        if [ $(version $CLEAN_VERSION) -ge $(version "13.0.0") ]; then
            echo "❗️ You are trying to install a release which seems to be uncompatible with AngularCLI 13.0.0 or higher."
            echo "   Try to use AngularCLI higher than 12.0.0 and lower than 13.0.0."
            echo "   Example: ANGULAR_CLI_VERSION='^12.0.5'"
            echo ""
            read -p "Do you want to [c]ontinue anyways, [o]verwrite ANGULAR_CLI_VERSION with '^12.0.5' or [a]bort? (c/o/a) " yn
            case $yn in 
                c ) echo "continue";;
                o ) echo "Overwrite ANGULAR_CLI_VERSION with '^12.0.5'"
                    ANGULAR_CLI_VERSION='^12.0.5';;
                a ) echo "abort";
                    exit;;
                * ) echo "invalid response";
                    exit 1;;
            esac
        fi
    fi

    if [[ "$BRANCH" == release/5.0.* ]]; then
        local CLEAN_VERSION=$(echo "$ANGULAR_CLI_VERSION" | sed 's/[^0-9\.]//g')
        if [ $(version $CLEAN_VERSION) -lt $(version "13.0.0") ]; then
            echo "❗️ You are trying to install a release which seems to be uncompatible with AngularCLI lower than 13.0.0. "
            echo "   Try to use AngularCLI 13.0.0 or higher."
            echo "   Example: ANGULAR_CLI_VERSION='^13.3.0'"
            echo ""
            read -p "Do you want to [c]ontinue anyways, [o]verwrite ANGULAR_CLI_VERSION with '^13.3.0' or [a]bort? (c/o/a) " yn
            case $yn in 
                c ) echo "continue";;
                o ) echo "Overwrite ANGULAR_CLI_VERSION with '^13.3.0'"
                    ANGULAR_CLI_VERSION='^13.3.0';;
                a ) echo "abort";
                    exit;;
                * ) echo "invalid response";
                    exit 1;;
            esac
        fi
    fi
}

function run_system_check {
    printh "Checking system"

    HAS_XVFB_INSTALLED=false
    EXIT_CODE=0
    command -v xvfb-run &> /dev/null || EXIT_CODE=$?
    if [ $EXIT_CODE -eq 0 ] ; then
        HAS_XVFB_INSTALLED=true
    fi

    HAS_GNU_PARALLEL_INSTALLED=false
    EXIT_CODE=0
    command -v parallel &> /dev/null || EXIT_CODE=$?
    if [ $EXIT_CODE -eq 0 ] ; then
        HAS_GNU_PARALLEL_INSTALLED=true
        echo "🚀 Running in rocket speed [using gnu parallel]"
    else
        echo "🐢 Running in tutle speed [gnu parallel missing]"
    fi
}

function parseInstallArgs {
    printh "Parsing arguments"
    while [[ $# -gt 0 ]]; do
        case $1 in
            --cache)
                KEEP_YARN_CACHE=true
                echo "➖ Keep Yarn Cache"
                shift
                ;;
            --skipsanity)
                SKIP_SANITY=true
                echo "➖ Skip Sanity Check"
                shift
                ;;
            -p|--port)
                local PORTS
                IFS=',' read -ra PORTS <<< "$2"
                if [ ${#PORTS[@]} -eq 2 ]; then
                    CSR_PORT="${PORTS[0]}"
                    SSR_PORT="${PORTS[1]}"
                    echo "➖ Set CSR Port to $CSR_PORT and SSR Port to $SSR_PORT"
                else
                    echo "Invalid Format: <CSRPort>,<SSRPort>"
                    exit 1
                fi
                shift
                shift
                ;;
            -s|--basesite)
                BASE_SITE="$2"
                echo "➖ BASE_SITE to $BASE_SITE"
                shift
                shift
                ;;
            -b|--branch)
                BRANCH="$2"
                echo "➖ Branch to $BRANCH"
                shift
                shift
                ;;
            b2b)
                ADD_B2B_LIBS=true
                echo "➖ Added B2B Libs"         
                shift
                ;;
            cpq)
                ADD_CPQ=true
                echo "➖ Added CPQ"   
                shift
                ;;
            cdc)
                ADD_CDC=true
                echo "➖ Added CDC"   
                shift
                ;;
            epd)
                ADD_EPD_VISUALIZATION=true
                echo "➖ Added EPD"   
                shift
                ;;
            -*|--*)
                echo "Unknown option $1"
                exit 1
                ;;
            *)
                shift
                ;;
        esac
    done
}

function parseStartArgs {
    printh "Parsing arguments"
    while [[ $# -gt 0 ]]; do
        case $1 in
            -c|--check)
                CHECK_AFTER_START=true
                echo "➖ Check SSR and SSR after start"
                shift
                ;;
            --check-b2b)
                CHECK_B2B_AFTER_START=true
                echo "➖ Check B2B after start"
                shift
                ;;
            --force-e2e)
                FORCE_E2E=true
                echo "➖ Force E2E Tests"
                shift
                ;;
            --skip-e2e)
                SKIP_E2E=true
                echo "➖ Skip E2E Tests"
                shift
                ;;
            -p|--port)
                local PORTS
                IFS=',' read -ra PORTS <<< "$2"
                if [ ${#PORTS[@]} -eq 2 ]; then
                    CSR_PORT="${PORTS[0]}"
                    SSR_PORT="${PORTS[1]}"
                    echo "➖ Set CSR Port to $CSR_PORT and SSR Port to $SSR_PORT"
                else
                    echo "Invalid Format: <CSRPort>,<SSRPort>"
                    exit 1
                fi
                shift
                shift
                ;;
            -*|--*)
                echo "Unknown option $1"
                exit 1
                ;;
            *)
                shift
                ;;
        esac
    done
}

function parseStopArgs {
    printh "Parsing arguments"
    while [[ $# -gt 0 ]]; do
        case $1 in
            -p|--port)
                local PORTS
                IFS=',' read -ra PORTS <<< "$2"
                if [ ${#PORTS[@]} -eq 2 ]; then
                    CSR_PORT="${PORTS[0]}"
                    SSR_PORT="${PORTS[1]}"
                    echo "➖ Set CSR Port to $CSR_PORT and SSR Port to $SSR_PORT"
                else
                    echo "Invalid Format: <CSRPort>,<SSRPort>"
                    exit 1
                fi
                shift
                shift
                ;;
            -*|--*)
                echo "Unknown option $1"
                exit 1
                ;;
            *)
                shift
                ;;
        esac
    done
}

function add_time_measurement {
    local TITLE=${1};
    local START_TIME=${TIME_MEASUREMENT_TIMES[${#TIME_MEASUREMENT_TIMES[@]}-1]}
    local END_TIME=$(date +%s)
    local ELAPSED=$(($END_TIME - $START_TIME))
    TIME_MEASUREMENT_TIMES+=("$END_TIME")

    if [ $ELAPSED -gt 30 ]; then 
        TIME_MEASUREMENT_TITLES+=("\033[31m${ELAPSED}s\033[m\t$TIME_MEASUREMENT_CURR_TITLE")
    elif [ $ELAPSED -gt 10 ]; then 
        TIME_MEASUREMENT_TITLES+=("\033[33m${ELAPSED}s\033[m\t$TIME_MEASUREMENT_CURR_TITLE")
    else
        TIME_MEASUREMENT_TITLES+=("\033[32m${ELAPSED}s\033[m\t$TIME_MEASUREMENT_CURR_TITLE")
    fi

    TIME_MEASUREMENT_CURR_TITLE="$TITLE"
}

function print_times {
    add_time_measurement ""
    echo ""
    echo "Elapsed Time"

    for MEASURMENT in "${TIME_MEASUREMENT_TITLES[@]}"
    do
        printf " ┕ $MEASURMENT\n"
    done
}

function print_summary {
    local START_TIME=${TIME_MEASUREMENT_TIMES[0]}
    local END_TIME=$(date +%s)
    local ELAPSED=$(($END_TIME - $START_TIME))
    printf "BRANCH: ${BRANCH}\n"
    if [ "$HAS_GNU_PARALLEL_INSTALLED" = true ] ; then
        printf "Mode: 🚀 [USING GNU PARALLEL]\n"
    else
        printf "Mode: 🐢 [NO GNU PARALLEL]\n"
    fi 
    printf "Total Time: \033[32m${ELAPSED}s\033[m\n\n"
}
