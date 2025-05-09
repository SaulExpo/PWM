import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmInfoPage } from './film-info.page';

describe('FilmInfoPage', () => {
  let component: FilmInfoPage;
  let fixture: ComponentFixture<FilmInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
