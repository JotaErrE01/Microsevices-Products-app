import { IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false })
  @Min(0)
  @Type(() => Number)
  readonly price: number;
}
