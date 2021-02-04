import { Injectable, NotFoundException } from '@nestjs/common';
import { VideoDto } from '../dto';

@Injectable()
export class VideoService {
  private video: VideoDto[] = [
    {
      id: 1,
      title: 'Stupid Love',
      realisateur: 'Lady Gaga',
      platform: ['Deezer', 'Spotify', 'Apple music', 'Youtube'],
      price: '10e',
    },
    {
      id: 2,
      title: 'Dance Monkey',
      realisateur: 'Tones and I',
      platform: ['Deezer', 'Apple music', 'Youtube'],
      price: '15e',
    },
    {   
      id: 3,
      title: 'Sweet but Psycho',
      realisateur: 'Ava max',
      platform: ['Spotify', 'Apple music'],
      price : '20e',
    },
  ];

  /**
   * @name findAll
   * @description fetch all musics.
   * @return { VideoDto[] }
   */
  findAll(): VideoDto[] {
    const result: VideoDto[] = this.video;

    if (!result) {
      throw new NotFoundException('Musics not found.');
    }

    return result;
  }

  /**
   * @name findById
   * @description fetch one music from id.
   * @param { string } id : Video's id
   * @return { VideoDto }
   */
  findById(id: string): VideoDto {
    const result: VideoDto = this.video.find((item) => item.id === +id);

    if (!result) {
      throw new NotFoundException(`Video ${id} not found.`);
    }

    return result;
  }

  /**
   * @name create
   * @description create new video.
   * @param { VideoDto } music : Video's object
   */
  create(video: VideoDto) {
    const videos: VideoDto[] = this.findAll();
    this.video.push({ id: videos.length + 1, ...video });
  }

  /**
   * @name update
   * @description update one video from id.
   * @param { string } id : Video's id
   * @param { VideoDto } video : Video's object
   */
  update(id: string, video: VideoDto) {
    const result: VideoDto = this.findById(id);
    if (result) {
      this.video[result.id - 1] = video;
    }
  }

  /**
   * @name delete
   * @description delete one video from id.
   * @param { string } id : Video's id
   */
  delete(id: string) {
    const index: number = this.video.findIndex((item) => item.id === +id);
    if (index >= 0) {
      this.video.splice(index, 1);
    }
  }
}
