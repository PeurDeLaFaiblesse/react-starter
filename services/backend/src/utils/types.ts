import { Type } from '@nestjs/common';
import { BaseSchema } from './BaseSchema';
import { OmitType } from '@nestjs/swagger';
export const BaseOmitType = <T extends BaseSchema, K extends keyof T>(Dto: Type<T>, fields?: readonly K[]) =>
  OmitType(Dto, ['createdAt', 'updatedAt', 'deletedAt', ...(fields ?? [])]);
