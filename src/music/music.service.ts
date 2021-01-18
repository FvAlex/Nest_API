import { Injectable, NotFoundException } from '@nestjs/common';
import { MusicDto } from '../dto';

@Injectable()
export class MusicService {
  private musics: MusicDto[] = [
    {
      id: 1,
      title: 'Stupid Love',
      singer: 'Lady Gaga',
      platform: ['Deezer', 'Spotify', 'Apple music', 'Youtube'],
    },
    {
      id: 2,
      title: 'Dance Monkey',
      singer: 'Tones and I',
      platform: ['Deezer', 'Apple music', 'Youtube'],
    },
    {
      id: 3,
      title: 'Sweet but Psycho',
      singer: 'Ava max',
      platform: ['Spotify', 'Apple music'],
    },
  ];

  /**
   * @name findAll
   * @description fetch all musics.
   * @return { MusicDto[] }
   */
  findAll(): MusicDto[] {
    const result: MusicDto[] = this.musics;

    if (!result) {
      throw new NotFoundException('Musics not found.');
    }

    return result;
  }

  /**
   * @name findById
   * @description fetch one music from id.
   * @param { string } id : Music's id
   * @return { MusicDto }
   */
  findById(id: string): MusicDto {
    const result: MusicDto = this.musics.find((item) => item.id === +id);

    if (!result) {
      throw new NotFoundException(`Music ${id} not found.`);
    }

    return result;
  }

  /**
   * @name create
   * @description create new music.
   * @param { MusicDto } music : Music's object
   */
  create(music: MusicDto) {
    const musics: MusicDto[] = this.findAll();
    this.musics.push({ id: musics.length + 1, ...music });
  }

  /**
   * @name update
   * @description update one music from id.
   * @param { string } id : Music's id
   * @param { MusicDto } music : Music's object
   */
  update(id: string, music: MusicDto) {
    const result: MusicDto = this.findById(id);
    if (result) {
      this.musics[result.id - 1] = music;
    }
  }

  /**
   * @name delete
   * @description delete one music from id.
   * @param { string } id : Music's id
   */
  delete(id: string) {
    const index: number = this.musics.findIndex((item) => item.id === +id);
    if (index >= 0) {
      this.musics.splice(index, 1);
    }
  }
}
