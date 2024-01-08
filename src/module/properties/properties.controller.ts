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
import { UpdatePropertyDto, UpdateStatusDTO } from './dto/update-property.dto';
import { IPaginateOptions } from 'src/shared/utils/pagination';
import { QueryFilterProperty } from './dto/query-filter.dto';

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

  @Patch(':id/updateStatusProperty')
  updateStatusProperty(@Param('id') id: string, @Body() body: UpdateStatusDTO) {
    return this.propertiesService.updateStatusProperty(+id, body);
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

  @Get('/eventLogClaim')
  eventLogClaim(@Query() eventLogDto: EventLogDto) {
    return this.propertiesService.getEventLogClaim(eventLogDto.merchantAddress);
  }

  @Get('/historyEventLogClaim')
  historyEventLogClaim(@Query() eventLogDto: HistoryEventLogDto) {
    return this.propertiesService.getHistoryEventClaim(
      eventLogDto.merchantAddress,
      eventLogDto.fromBlock,
      eventLogDto.toBlock,
    );
  }

  @Get('/eventLogRefund')
  eventLogRefund(@Query() eventLogDto: EventLogDto) {
    return this.propertiesService.getEventLogRefund(
      eventLogDto.merchantAddress,
    );
  }

  @Get('/historyEventLogRefund')
  historyEventLogRefund(@Query() eventLogDto: HistoryEventLogDto) {
    return this.propertiesService.getHistoryEventRefund(
      eventLogDto.merchantAddress,
      eventLogDto.fromBlock,
      eventLogDto.toBlock,
    );
  }

  @Get('/listProperties')
  listProperties(@Query() queryProperty: QueryFilterProperty) {
    const options: IPaginateOptions = {
      page: queryProperty.page,
      limit: queryProperty.limit,
    };
    return this.propertiesService.listProperties(options, queryProperty);
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
