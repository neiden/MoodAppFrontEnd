import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyPlaylistViewComponent } from './spotify-playlist-view.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('SpotifyPlaylistViewComponent', () => {
  let component: SpotifyPlaylistViewComponent;
  let fixture: ComponentFixture<SpotifyPlaylistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],

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
