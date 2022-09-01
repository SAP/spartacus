package test

const DATE_LAYOUT = "Mon, 02 Jan 2006 15:04:05 MST"

func NewRepetitionStreamRowsTest(n int, fileName string) *TestSpec {
	writer := Writer{
		FileName: fileName,
		BeforeStart: func(c *WriterCallbackContext) ([]*TestRun, error) {
			matrix := [][]string{{"File", "Success", "StartedAt", "EndedAt", "Output"}}
			c.Writer.Write(matrix)
			return c.Results, nil
		},
		OnSingleComplete: func(c *WriterCallbackContext) ([]*TestRun, error) {
			c.Writer.Write(c.OutputGetter())
			return []*TestRun{}, nil
		},
		OnRepetitionsComplete: WriterCallbackNoop,
		OnComplete:            WriterCallbackNoop,
	}

	transformer := func(testFiles []string, results []*TestRun, test *TestSpec) [][]string {
		matrix := [][]string{}
		for _, result := range results {
			success := "0"
			if result.Success {
				success = "1"
			}
			matrix = append(matrix, []string{result.TestFile, success, result.StartedAt.Format(DATE_LAYOUT), result.EndedAt.Format(DATE_LAYOUT), result.Output})
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
