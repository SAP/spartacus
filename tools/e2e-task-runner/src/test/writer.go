package test

import (
	"encoding/csv"
	"os"
)

type OutputGetter func() [][]string
type WriterCallback func(*WriterCallbackContext) ([]*TestRun, error)
type TestTransformer func([]string, []*TestRun, *TestSpec) [][]string

type Writer struct {
	FileName              string
	file                  *os.File
	csvWriter             *csv.Writer
	BeforeStart           WriterCallback
	OnSingleComplete      WriterCallback
	OnRepetitionsComplete WriterCallback
	OnComplete            WriterCallback
}

type WriterCallbackContext struct {
	Writer       *Writer
	TestRunner   *TestRunner
	OutputGetter OutputGetter
	Results      []*TestRun
}

func (w *Writer) Open() error {
	os.Remove(w.FileName)
	f, err := os.OpenFile(w.FileName, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	if err != nil {
		return err
	}
	w.file = f
	w.csvWriter = csv.NewWriter(f)
	return nil
}

func (w *Writer) Close() {
	w.file.Close()
}

func (w *Writer) Write(data [][]string) error {
	return w.csvWriter.WriteAll(data)
}

func WriterCallbackNoop(c *WriterCallbackContext) ([]*TestRun, error) {
	return c.Results, nil
}
