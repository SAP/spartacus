enum TextStyle {
  Red = '\x1b[31m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Gray = '\x1b[90m',
  Green = '\x1b[32m',
  Bold = '\x1b[1m'
}

export const Reset = '\x1b[0m';

function paint(text: string | undefined, color: string): string {
  if (!text) {
    return '';
  }

  return color + text + Reset;
}

export const colorize = {
  red: (text?: string) => paint(text, TextStyle.Red,),
  yellow: (text?: string) => paint(text, TextStyle.Yellow),
  blue: (text?: string) => paint(text, TextStyle.Blue),
  gray: (text?: string) => paint(text, TextStyle.Gray),
  green: (text?: string) => paint(text, TextStyle.Green),
  bold: (text?: string) => paint(text, TextStyle.Bold)
};
