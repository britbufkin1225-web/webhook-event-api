/* eslint-disable @typescript-eslint/no-unsafe-call */

import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  source!: string;

  @IsString()
  @IsNotEmpty()
  eventType!: string;

  @IsString()
  @IsNotEmpty()
  payload!: string;
}
