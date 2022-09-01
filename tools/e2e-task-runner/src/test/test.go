package test

import (
	"os/exec"
	"strconv"
	"time"
)

type TestRunner struct {
	testDir   string
	testFiles []string
}

type TestSpec struct {
	N           int
	FileName    string
	OutWriter   *Writer
	Transformer TestTransformer
}

func (r *TestSpec) transform(testFiles []string, results []*TestRun) [][]string {
	return r.Transformer(testFiles, results, r)
}

type TestRun struct {
	TestFile  string
	Success   bool
	Output    string
	StartedAt time.Time
	EndedAt   time.Time
}

func New(testFiles []string, testDir string) *TestRunner {
	return &TestRunner{
		testDir:   testDir,
		testFiles: testFiles,
	}
}

func (t *TestRunner) RunRepetitionTest(test *TestSpec) {
	var err error
	var results []*TestRun

	test.OutWriter.Open()
	defer test.OutWriter.Close()

	if results, err = test.OutWriter.BeforeStart(&WriterCallbackContext{
		Writer: test.OutWriter,
		OutputGetter: func() [][]string {
			return test.transform(t.testFiles, results)
		},
		Results:    results,
		TestRunner: t,
	}); err != nil {
		println(err)
	}

	for _, testFile := range t.testFiles {
		for i := 0; i < test.N; i++ {
			println("[ " + strconv.Itoa(i+1) + " | " + strconv.Itoa(test.N) + " ]\t" + testFile)
			results = append(results, testCommand(testFile, t.testDir))

			if results, err = test.OutWriter.OnSingleComplete(&WriterCallbackContext{
				Writer: test.OutWriter,
				OutputGetter: func() [][]string {
					return test.transform(t.testFiles, results)
				},
				Results:    results,
				TestRunner: t,
			}); err != nil {
				println(err)
			}
		}

		if results, err = test.OutWriter.OnRepetitionsComplete(&WriterCallbackContext{
			Writer: test.OutWriter,
			OutputGetter: func() [][]string {
				return test.transform(t.testFiles, results)
			},
			Results:    results,
			TestRunner: t,
		}); err != nil {
			println(err)
		}
	}
	if _, err = test.OutWriter.OnComplete(&WriterCallbackContext{
		Writer: test.OutWriter,
		OutputGetter: func() [][]string {
			return test.transform(t.testFiles, results)
		},
		Results:    results,
		TestRunner: t,
	}); err != nil {
		println(err)
	}
}

func testCommand(testFile string, testDir string) *TestRun {
	start := time.Now()
	cmd := exec.Command("npx", "cypress", "run", "--spec", testFile)
	cmd.Dir = testDir
	output, err := cmd.CombinedOutput()
	if err != nil {
		println(err.Error())
	}
	end := time.Now()
	return &TestRun{
		TestFile:  testFile,
		Success:   err == nil,
		Output:    string(output),
		StartedAt: start,
		EndedAt:   end,
	}
}
