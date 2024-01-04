import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import {
  CreatePropertyDto,
  EventLogDto,
  HistoryEventLogDto,
} from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post('/createProperty')
  createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Patch(':id/updateProperty')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    console.log('id', id);
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Get('/eventLog')
  eventLog(@Query() eventLogDto: EventLogDto) {
    return this.propertiesService.getEventLog(eventLogDto.merchantAddress);
  }

  @Get('/historyEventLog')
  historyEventLog(@Query() eventLogDto: HistoryEventLogDto) {
    return this.propertiesService.getHistoryEvent(
      eventLogDto.merchantAddress,
      eventLogDto.fromBlock,
      eventLogDto.toBlock,
    );
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
