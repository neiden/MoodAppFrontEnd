import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPlaylistViewComponent } from './spotify-playlist-view.component';

describe('SpotifyPlaylistViewComponent', () => {
  let component: SpotifyPlaylistViewComponent;
  let fixture: ComponentFixture<SpotifyPlaylistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyPlaylistViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotifyPlaylistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
