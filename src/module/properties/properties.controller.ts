import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
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
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guard/auth.guard';
import { GetAccessToken } from 'src/common/get-token.decorator';
import { IAccessToken } from 'src/shared/interfaces/token.interface';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Post('/createProperty')
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  createProperty(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createPropertyDto: CreatePropertyDto,
  ) {
    return this.propertiesService.create(createPropertyDto, files);
  }

  @Patch(':id/updateProperty')
  @UseGuards(AuthGuard)
  @UseInterceptors(AnyFilesInterceptor())
  update(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    console.log('id', id);
    return this.propertiesService.update(+id, updatePropertyDto, files);
  }

  @Patch(':id/updateStatusProperty')
  @UseGuards(AuthGuard)
  updateStatusProperty(@Param('id') id: string, @Body() body: UpdateStatusDTO) {
    return this.propertiesService.updateStatusProperty(+id, body.status);
  }

  @Get('/eventLog')
  eventLog(@Query() eventLogDto: EventLogDto) {
    return this.propertiesService.getEventLog(eventLogDto.ownerAddress);
  }

  @Get('/historyEventLog')
  historyEventLog(@Query() eventLogDto: HistoryEventLogDto) {
    return this.propertiesService.getHistoryEvent(
      eventLogDto.ownerAddress,
      eventLogDto.fromBlock,
      eventLogDto.toBlock,
    );
  }

  @Get('/eventLogClaim')
  eventLogClaim(@Query() eventLogDto: EventLogDto) {
    return this.propertiesService.getEventLogClaim(eventLogDto.ownerAddress);
  }

  @Get('/historyEventLogClaim')
  historyEventLogClaim(@Query() eventLogDto: HistoryEventLogDto) {
    return this.propertiesService.getHistoryEventClaim(
      eventLogDto.ownerAddress,
      eventLogDto.fromBlock,
      eventLogDto.toBlock,
    );
  }

  @Get('/eventLogRefund')
  eventLogRefund(@Query() eventLogDto: EventLogDto) {
    return this.propertiesService.getEventLogRefund(eventLogDto.ownerAddress);
  }

  @Get('/historyEventLogRefund')
  historyEventLogRefund(@Query() eventLogDto: HistoryEventLogDto) {
    return this.propertiesService.getHistoryEventRefund(
      eventLogDto.ownerAddress,
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

  @Get('/eventLogBooking')
  eventLogBooking(@Query() eventLogDto: EventLogDto) {
    return this.propertiesService.getEventLogBooking(eventLogDto.ownerAddress);
  }

  @Get('/historyEventLogBooking')
  historyEventLogBooking(@Query() eventLogDto: HistoryEventLogDto) {
    return this.propertiesService.getHistoryEventBooking(
      eventLogDto.ownerAddress,
      eventLogDto.fromBlock,
      eventLogDto.toBlock,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(+id);
  }

  @Post('/deploy/:id')
  @UseGuards(AuthGuard)
  deployProperty(
    @Param('id') id: string,
    @GetAccessToken() { walletAddress }: IAccessToken,
  ) {
    return this.propertiesService.deployProperty(
      +id,
      walletAddress?.toLowerCase(),
    );
  }
}
