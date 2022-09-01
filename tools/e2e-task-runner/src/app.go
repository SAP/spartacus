package main

import (
	"errors"
	"flag"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"khad.im/test-analyse/src/test"
)

const lockFile = ".analysis_lock"
const testSuffix = "spec.ts"

var testRootDirectory string
var runDir string
var testName string
var out string
var repetitions int

func main() {
	// Parsing Arguements
	testRootDirectoryFlag := flag.String("test-dir", ".", "Test Directory")
	runDirFlag := flag.String("run-dir", "", "Run Directory")
	testNameFlag := flag.String("test", ".", "Test Name")
	outFlag := flag.String("out", "out.csv", "Output Filename")
	repetitionFlag := flag.Int("n", 512, "Repetitions per File")
	forceFlag := flag.Bool("force", false, "Force start (skip .lockFile check)")
	flag.Parse()

	// Lock Mechanism to not allow running the program multiple times
	if *forceFlag == false {
		if _, err := os.Stat(lockFile); !errors.Is(err, os.ErrNotExist) {
			print("[Abort] already running.")
			return
		}
		file, err := os.Create(lockFile)
		if err != nil {
			log.Fatal(err)
		}
		defer (func() {
			file.Close()
			os.Remove(lockFile)
		})()
	}

	// Settings Test Variables
	testRootDirectory = *testRootDirectoryFlag
	runDir = *runDirFlag
	testName = *testNameFlag
	out = *outFlag
	if runDir == "" {
		runDir = testRootDirectory
	}
	repetitions = *repetitionFlag

	// Gettings Test Files
	testFiles, err := findAllTests(testRootDirectory)
	if err != nil {
		log.Fatal(err)
	}

	// Get Test Spec
	var testSpec *test.TestSpec
	switch testName {
	case "matrix":
		testSpec = test.NewRepetitionMatrixTest(repetitions, out)
	case "stream":
		testSpec = test.NewRepetitionStreamRowsTest(repetitions, out)
	default:
		log.Fatal(errors.New("Please specify a valid test"))
	}

	// Run Test
	testRunner := test.New(testFiles, runDir)
	testRunner.RunRepetitionTest(testSpec)

	fmt.Println("Done.")
}

func repetitionTest() error {

	return nil
}

func findAllTests(dir string) ([]string, error) {
	var paths []string
	err := filepath.Walk(dir,
		func(path string, info os.FileInfo, err error) error {
			if err != nil || !strings.HasSuffix(path, testSuffix) {
				return nil
			}
			paths = append(paths, path)
			return nil
		})
	if err != nil {
		return []string{}, err
	}
	return paths, nil
}
