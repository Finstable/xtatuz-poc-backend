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

  @Post()
  create(@Body() createPropertyDto: CreatePropertyDto) {
    return this.propertiesService.create(createPropertyDto);
  }

  @Get('/eventLog')
  eventLog(@Query() eventLogDto: EventLogDto) {
    console.log('in to eventLog', eventLogDto.merchantAddress);
    return this.propertiesService.getEventLog(eventLogDto.merchantAddress);
  }

  @Get('/historyEventLog')
  historyEventLog(@Query() eventLogDto: HistoryEventLogDto) {
    console.log('in to eventLog', eventLogDto.merchantAddress);
    console.log('in to eventLog', eventLogDto.fromBlock);
    console.log('in to eventLog', eventLogDto.toBlock);
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }
}
