import { RegexProtocol } from './regex.protocol';

export class OnlyLowerCaseLettersRegex extends RegexProtocol {
  execute(str: string): string {
    return str.replace(/\s+/g, '');
  }
}
