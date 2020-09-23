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
    printh "Cleaning Spartacus installation workspace"

    delete_dir $BASE_DIR
    delete_dir storage

    yarn cache clean
}

function pre_install {
    VERDACCIO_PID=`lsof -nP -i4TCP:4873 | grep LISTEN | tr -s ' ' | cut -d ' ' -f 2`
    if [[ -n ${VERDACCIO_PID} ]]; then
        echo "It seems Verdaccio is already running on PID: ${VERDACCIO_PID}. Killing it."
        kill $VERDACCIO_PID
    fi

    npm config set @spartacus:registry https://registry.npmjs.org/

    cmd_clean

    npm i -g verdaccio
    npm i -g serve
    npm i -g pm2
    npm i -g concurrently
    npm i -g @angular/cli@${ANGULAR_CLI_VERSION}

    mkdir -p ${INSTALLATION_DIR}
    ng analytics off
}

function clone_repo {
    printh "Cloning Spartacus installation repo."

    echo "Cloning from ${SPARTACUS_REPO_URL}"

    git clone -b ${BRANCH} ${SPARTACUS_REPO_URL} ${CLONE_DIR} --depth 1
}

function update_projects_versions {
    projects=$@
    if [[ "$SPARTACUS_VERSION" == "next" ]] || [[ "$SPARTACUS_VERSION" == "latest" ]]; then
        SPARTACUS_VERSION="999.999.999"
    fi
    for i in $projects
        do
            (cd "${CLONE_DIR}/projects/${i}" && pwd && sed -i -E 's/"version": "[^"]+/"version": "'"${SPARTACUS_VERSION}"'/g' package.json);
        done
}

function npm_install {
    pre_install

    create_apps
}

function create_app {
    ( cd ${INSTALLATION_DIR} && ng new $1 --style=scss --routing=true )
}

function create_csr {
    create_app csr
}

function create_ssr {
    create_app ssr
}

function create_ssr_pwa {
    create_app ssr_pwa
}

function add_spartacus_csr {
    ( cd ${INSTALLATION_DIR} && cd csr && ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} )
}

function add_spartacus_ssr {
    ( cd ${INSTALLATION_DIR} && cd ssr && ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --ssr )
}

function add_spartacus_ssr_pwa {
    ( cd ${INSTALLATION_DIR} && cd ssr_pwa && ng add @spartacus/schematics@${SPARTACUS_VERSION} --overwriteAppComponent true --baseUrl ${BACKEND_URL} --occPrefix ${OCC_PREFIX} --ssr --pwa )
}

function create_apps {
    if [ -z "$CSR_PORT" ]; then
        echo "Skipping csr app install"
    else
        printh "Installing csr app"
        create_csr
        add_spartacus_csr
    fi
    if [ -z "$SSR_PORT" ]; then
        echo "Skipping ssr app install"
    else
        printh "Installing ssr app"
        create_ssr
        add_spartacus_ssr
    fi
    if [ -z "$SSR_PWA_PORT" ]; then
        echo "Skipping ssr with pwa app install"
    else
        printh "Installing ssr app (with pwa support)"
        create_ssr_pwa
        add_spartacus_ssr_pwa
    fi
}

function local_install {
    printh "Installing with local @spartacus/*@${SPARTACUS_VERSION}"

    pre_install

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
    ( cd ${CLONE_DIR}/projects/schematics && yarn && yarn build && yarn publish --new-version=${SPARTACUS_VERSION} --registry=http://localhost:4873/ --no-git-tag-version )

    create_apps

    sleep 5

    (kill ${VERDACCIO_PID} || echo "Verdaccio not running on PID ${VERDACCIO_PID}. Was it already runnig before starting the script?")

    npm set @spartacus:registry https://registry.npmjs.org/
    echo "Finished: npm @spartacus:registry set back to https://registry.npmjs.org/"
}

function prestart_csr {
    if [ -z "$CSR_PORT" ]; then
        echo "Skipping prestart csr script"
    else
        printh "Prestart setup for csr app"
        ( cd ${INSTALLATION_DIR}/csr && yarn build )
    fi
}

function prestart_ssr {
    if [ -z "$SSR_PORT" ]; then
        echo "Skipping prestart ssr script"
    else
        printh "Prestart setup for ssr app"
        ( cd ${INSTALLATION_DIR}/ssr && yarn build && yarn build:ssr )
    fi
}

function prestart_ssr_pwa {
    if [ -z "$SSR_PWA_PORT" ]; then
        echo "Skipping prestart ssr script (with pwa support)"
    else
        printh "Prestart setup for ssr app (with pwa support)"
        ( cd ${INSTALLATION_DIR}/ssr_pwa && yarn build && yarn build:ssr )
    fi
}

function start_csr_unix {
    if [ -z "$CSR_PORT" ]; then
        echo "Skipping csr app start"
    else
        prestart_csr
        printh "Starting csr app"
        pm2 start --name "csr-${CSR_PORT}" serve -- ${INSTALLATION_DIR}/csr/dist/csr/ --single -p ${CSR_PORT}
    fi
}

function start_ssr_unix {
     if [ -z "$SSR_PORT" ]; then
        echo "Skipping ssr app start"
    else
        prestart_ssr
        printh "Starting ssr app"
        ( cd ${INSTALLATION_DIR}/ssr && export PORT=${SSR_PORT} && export NODE_TLS_REJECT_UNAUTHORIZED=0 && pm2 start --name "ssr-${SSR_PORT}" dist/ssr/server/main.js )
    fi
}

function start_ssr_pwa_unix {
     if [ -z "$SSR_PWA_PORT" ]; then
        echo "Skipping ssr (with pwa support) app start"
    else
        prestart_ssr_pwa
        printh "Starting ssr app (with pwa support)"
        ( cd ${INSTALLATION_DIR}/ssr_pwa && export PORT=${SSR_PWA_PORT} && export NODE_TLS_REJECT_UNAUTHORIZED=0 && pm2 start --name "ssr_pwa-${SSR_PWA_PORT}" dist/ssr/server/main.js )
    fi
}

function start_windows_apps {
    prestart_csr
    concurrently "serve ${INSTALLATION_DIR}/csr/dist/csr --single -p ${CSR_PORT}" --names "csr"
}

function start_apps {
    if [[ "$OSTYPE" == "cygwin" ]]; then
        start_windows_apps
    elif [[ "$OSTYPE" == "msys" ]]; then
        start_windows_apps
    elif [[ "$OSTYPE" == "win32" ]]; then
        start_windows_apps
    else
        start_csr_unix
        start_ssr_unix
        start_ssr_pwa_unix
    fi
}

function stop_apps {
    pm2 stop "csr-${CSR_PORT}"
    pm2 stop "ssr-${SSR_PORT}"
    pm2 stop "ssr_pwa-${SSR_PORT}"
}

function run_e2e_tests {
    printh "Running e2e tests on app"
    pushd $E2E_TEST_DIR > /dev/null
    yarn
    popd > /dev/null
    pushd $CLONE_DIR > /dev/null
    yarn e2e:cy:run
    popd > /dev/null
}

function cmd_help {
    echo "Usage: run [command]"
    echo "Available commands are:"
    echo " install"
    echo " install_npm"
    echo " start"
    echo " stop"
    echo " e2e"
    echo " help"
}

if [ -z "$1" ]; then
    cmd_help
    exit 1
fi

readonly commands="$1"

echo "Loading configs from ./config.default.sh"
    . ./config.default.sh
if [ -f "./config.sh" ]; then
    echo "Loading configs from ./config.sh"
    . ./config.sh
fi

# top directory for the installation output (must be outside of the project)
if [ -z $BASE_DIR ]; then
    BASE_DIR="../../../spartacus-${SPARTACUS_VERSION}"
fi
CLONE_DIR="$BASE_DIR/$CLONE_DIR"
INSTALLATION_DIR="$BASE_DIR/$INSTALLATION_DIR"
E2E_TEST_DIR="$BASE_DIR/$E2E_TEST_DIR"

for current_command in $(echo "$commands" | tr "+" "\n"); do

    case "$current_command" in
        'install' )
            local_install;;
        'install_npm' )
            npm_install;;
        'start' )
            start_apps;;
        'stop' )
            stop_apps;;
        'help' )
            cmd_help;;
        'e2e' )
            run_e2e_tests;;
        * )
            echo "Error: unknown command $current_command"
            cmd_help
            exit 1;;
    esac
done
