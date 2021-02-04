import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { VideoDto } from '../dto';

describe('VideoService', () => {
  let service: VideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
      ],
    }).compile();

    service = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all videos', () => {
    expect(service.findAll().length).toBe(3);
  });

  it('should return a video', () => {
    expect(service.findById('1').realisateur).toBe('Lady Gaga');
  });

  describe('actions', () => {

    it('should create a video', () => {
      // Given

      // When
      service.create(<VideoDto>{ realisateur: 'Lady Gaga', title: 'Chromatica', platform: ['Apple video', 'Spotify']});

      // Then
      expect(service.findAll().length).toBe(4);
      expect(service.findById('4').title).toBe('Chromatica');
    });

    it('should update a video', () => {
      // Given

      // When
      service.update('1', <VideoDto>{ id: 1, realisateur: 'Lady Gaga', title: 'Chromatica', platform: ['Deezer', 'Spotify', 'Apple video', 'Youtube']});

      // Then
      expect(service.findById('1').title).toBe('Chromatica');
    });

    it('should delete a video', () => {
      // Given

      // When
      service.delete('1');

      // Then
      expect(service.findAll().length).toBe(2);
    });
  });

});
