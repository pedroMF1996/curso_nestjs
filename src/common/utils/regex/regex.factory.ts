import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { RegexProtocol } from './regex.protocol';
import { OnlyLowerCaseLettersRegex } from './only-lowercaseletters.regex copy';
import { RemoveSpacesRegex } from './remove-spaces.regex';

type ClassName = 'RemoveSpacesRegex' | 'OnlyLowerCaseLettersRegex';
@Injectable()
export class RegexFactory {
  create(className: ClassName): RegexProtocol {
    switch (className) {
      case 'OnlyLowerCaseLettersRegex':
        return new OnlyLowerCaseLettersRegex();
      case 'RemoveSpacesRegex':
        return new RemoveSpacesRegex();
      default:
        throw new InternalServerErrorException(
          `No class found for ${className}`,
        );
    }
  }
}
