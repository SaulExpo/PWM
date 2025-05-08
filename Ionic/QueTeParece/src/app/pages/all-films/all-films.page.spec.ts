import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllFilmsPage } from './all-films.page';

describe('AllFilmsPage', () => {
  let component: AllFilmsPage;
  let fixture: ComponentFixture<AllFilmsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFilmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
