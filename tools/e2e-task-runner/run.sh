#!/bin/bash
set -e

REMOTE_PASSWORD="***secret***"
TESTS_REMOTE_FOLDER="/test/install/spartacus/projects/storefrontapp-e2e-cypress"

REMOTE="user@exmaple"
REMOTE_DIR="/test/flaky_tests_analysis"
BINARY_NAME="test_analysis"
OUTPUT_FILE_NAME="output.csv"

RUN_ARGS="--test stream --out $OUTPUT_FILE_NAME --test-dir $TESTS_REMOTE_FOLDER"

function spinner {
  local frameRef
  local action="${1}"
  local label="${2} "
  local frames=("⠋" "⠙" "⠹" "⠸" "⠼" "⠴" "⠦" "⠧" "⠇" "⠏")

  ${action} & pid=$!
  tput civis -- invisible

  while ps -p $pid &>/dev/null; do
    for frame in ${!frames[@]}; do
      currFrame="${frames[frame]}"
      echo -ne "\\r[ \033[36m${currFrame}\033[m ] ${label}"
      sleep 0.1
    done
  done

  echo -ne "\\r[ \033[32m✔\033[m ] ${label}\\n"
  tput cnorm -- normal
}

function build {
    env GOOS=linux go build -o ./out/test_analyse ./src
}

function cleanup {
    sshpass -p "$REMOTE_PASSWORD" ssh $REMOTE "cd \"$REMOTE_DIR\"; pkill -9 \"$BINARY_NAME\" && rm \"$REMOTE_DIR/.analysis_lock\"; rm \"./$BINARY_NAME.log\"; touch \"./$BINARY_NAME.log\""
}

function copy_to_remote {
    sshpass -p "$REMOTE_PASSWORD" scp ./out/test_analyse "$REMOTE:$REMOTE_DIR/$BINARY_NAME"
}

function copy_from_remote {
  sshpass -p "$REMOTE_PASSWORD" scp "$REMOTE:$REMOTE_DIR/$OUTPUT_FILE_NAME" ./$OUTPUT_FILE_NAME
}

# The PATH is not set, manuall trigger needed at the moment ...
# Server need to be configured for that :/
function run_detached {
    sshpass -p "$REMOTE_PASSWORD" ssh -n -f $REMOTE "cd \"$REMOTE_DIR\"; yarn; nohup ./$BINARY_NAME $RUN_ARGS < /dev/null >./$BINARY_NAME.log 2>&1 &"
    if [ "$?" -ne 0 ]; then
        echo "Failed to run detached on remote"
        exit 1
    fi
}

function stream_output {
    sshpass -p "$REMOTE_PASSWORD" ssh $REMOTE "tail -f \"$REMOTE_DIR/$BINARY_NAME.log\" | less"
}

function start {
  echo ""
  echo "Start installation"
  echo ""
  spinner cleanup "Cleanup"
  spinner build "Building Binary"
  spinner copy_to_remote "Copy Bianry to remote Server"
  # spinner run_detached "Run detached"
  echo -e "RUN:\ncd \"$REMOTE_DIR\"; yarn; nohup ./$BINARY_NAME $RUN_ARGS < /dev/null >./$BINARY_NAME.log 2>&1 &"
  echo ""
  echo "Start Output Stream"
  echo ""
  stream_output
}

function get {
  echo ""
  echo "Get Results"
  echo ""
  spinner copy_from_remote "Retrieving results"
}

function stop {
  echo ""
  echo "Get Results"
  echo ""
  spinner cleanup "Killing runner"
}

while [[ $# -gt 0 ]]; do
    case $1 in
        start)
            start
            shift
            ;;
        get)
            get
            shift
            ;;
        kill)
            stop
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

