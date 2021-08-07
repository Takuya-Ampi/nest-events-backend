import { PartialType } from "@nestjs/mapped-types";
import { CreateEventDto } from "./create-event.dto";
import { NestedPartial } from './types/index'

// export class UpdateEventDto extends NestedPartial(CreateEventDto) {}
export type UpdateEventDto = NestedPartial<CreateEventDto>