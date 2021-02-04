import { Module } from '@nestjs/common';
import { MusicModule } from './music/music.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [MusicModule, VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
