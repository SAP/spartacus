package test

import "strconv"

func NewRepetitionMatrixTest(n int, fileName string) *TestSpec {
	writer := Writer{
		FileName: fileName,
		BeforeStart: func(c *WriterCallbackContext) ([]*TestRun, error) {
			matrix := [][]string{append([]string{"#"}, c.TestRunner.testFiles...)}
			c.Writer.Write(matrix)
			return c.Results, nil
		},
		OnSingleComplete:      WriterCallbackNoop,
		OnRepetitionsComplete: WriterCallbackNoop,
		OnComplete: func(c *WriterCallbackContext) ([]*TestRun, error) {
			c.Writer.Write(c.OutputGetter())
			return c.Results, nil
		},
	}

	transformer := func(testFiles []string, results []*TestRun, test *TestSpec) [][]string {
		matrix := [][]string{}
		for i := 0; i < test.N; i++ {
			row := []string{strconv.Itoa(i + 1)}
			for j := 0; j < len(testFiles); j++ {
				cell := "0"
				if results[j*test.N+i].Success {
					cell = "1"
				}
				row = append(row, cell)
			}
			matrix = append(matrix, row)
		}
		return matrix
	}

	return &TestSpec{
		N:           n,
		FileName:    fileName,
		OutWriter:   &writer,
		Transformer: transformer,
	}
}
