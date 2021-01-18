import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiProduces, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MusicService } from './music.service';
import { MusicDto } from '../dto';

@ApiTags('music')
@Controller('music')
@ApiProduces('application/json')
@ApiConsumes('application/json')
export class MusicController {
  /**
   * @name constructor
   * @param { MusicService } service
   */
  constructor(private readonly service: MusicService) {}

  /**
   * @name findAll
   * @description fetch all musics.
   * @return { MusicDto[] }
   */
  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Fetch all musics', description: 'Fetch all musics.' })
  @ApiResponse({ status: 200, description: 'Musics found.' })
  findAll(): MusicDto[] {
    return this.service.findAll();
  }

  /**
   * @name findById
   * @description fetch one music from id.
   * @param { string } id : Music's id
   * @return { MusicDto }
   */
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiOperation({ summary: 'Fetch one music from id', description: 'Fetch one music from id.' })
  @ApiResponse({ status: 200, description: 'Music found.' })
  findById(@Param('id') id: string): MusicDto {
    return this.service.findById(id);
  }

  /**
   * @name create
   * @description create new music.
   * @param { MusicDto } music : Music's object
   */
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'Create new music', description: 'Create new music.' })
  @ApiResponse({ status: 200, description: 'Music has been successfully created..' })
  create(@Body() music: MusicDto) {
    return this.service.create(music);
  }

  /**
   * @name update
   * @description update music from id.
   * @param { string } id
   * @param { MusicDto } music : Music's object
   */
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @ApiOperation({ summary: 'Update one music from id.', description: 'Update one music from id.' })
  @ApiResponse({ status: 200, description: 'Music has been successfully updated.' })
  update(@Param('id') id: string, @Body() music: MusicDto) {
    return this.service.update(id, music);
  }

  /**
   * @name delete
   * @description delete music from id.
   * @param { string } id : Music's id
   */
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete one music from id', description: 'Delete one music from id.' })
  @ApiResponse({ status: 200, description: 'Music has been successfully deleted.' })
  delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
