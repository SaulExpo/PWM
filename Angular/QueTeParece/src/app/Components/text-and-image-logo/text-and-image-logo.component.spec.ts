import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextAndImageLogoComponent } from './text-and-image-logo.component';

describe('TextAndImageLogoComponent', () => {
  let component: TextAndImageLogoComponent;
  let fixture: ComponentFixture<TextAndImageLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAndImageLogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextAndImageLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
