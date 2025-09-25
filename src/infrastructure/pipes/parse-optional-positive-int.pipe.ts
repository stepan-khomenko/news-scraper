import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseOptionalPositiveIntPipe
  implements PipeTransform<string | undefined, number | undefined>
{
  transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): number | undefined {
    if (!value) {
      return undefined;
    }

    const parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      throw new BadRequestException(
        `Le paramètre '${metadata.data}' doit être un nombre entier`,
      );
    }

    if (parsedValue <= 0) {
      throw new BadRequestException(
        `Le paramètre '${metadata.data}' doit être un nombre positif (> 0)`,
      );
    }

    return parsedValue;
  }
}
