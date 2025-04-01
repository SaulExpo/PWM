import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAndTextUnderComponent } from './image-and-text-under.component';

describe('ImageAndTextUnderComponent', () => {
  let component: ImageAndTextUnderComponent;
  let fixture: ComponentFixture<ImageAndTextUnderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAndTextUnderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAndTextUnderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
