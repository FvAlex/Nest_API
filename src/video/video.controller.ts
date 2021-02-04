import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VideoService } from './video.service';
import { VideoDto } from '../dto';

@ApiTags('video')
@Controller('video')
@ApiProduces('application/json')
@ApiConsumes('application/json')
export class VideoController {
  /**
   * @name constructor
   * @param { VideoService } service
   */
  constructor(private readonly service: VideoService) {}

  /**
   * @name findAll
   * @description fetch all videos.
   * @return { VideoDto[] }
   */
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Fetch all videos', description: 'Fetch all videos.' })
  @ApiResponse({ status: 200, description: 'Videos found.' })
  findAll(): VideoDto[] {
    return this.service.findAll();
  }

  /**
   * @name findById
   * @description fetch one video from id.
   * @param { string } id : Video's id
   * @return { VideoDto }
   */
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Fetch one video from id', description: 'Fetch one video from id.' })
  @ApiResponse({ status: 200, description: 'Video found.' })
  findById(@Param('id') id: string): VideoDto {
    return this.service.findById(id);
  }

  /**
   * @name create
   * @description create new video.
   * @param { VideoDto } video : Video's object
   */
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new video', description: 'Create new video.' })
  @ApiResponse({ status: 200, description: 'Video has been successfully created..' })
  create(@Body() video: VideoDto) {
    return this.service.create(video);
  }

  /**
   * @name update
   * @description update video from id.
   * @param { string } id
   * @param { VideoDto } video : Video's object
   */
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @ApiOperation({ summary: 'Update one video from id.', description: 'Update one video from id.' })
  @ApiResponse({ status: 200, description: 'Video has been successfully updated.' })
  update(@Param('id') id: string, @Body() video: VideoDto) {
    return this.service.update(id, video);
  }

  /**
   * @name delete
   * @description delete video from id.
   * @param { string } id : Video's id
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete one video from id', description: 'Delete one video from id.' })
  @ApiResponse({ status: 200, description: 'Video has been successfully deleted.' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
