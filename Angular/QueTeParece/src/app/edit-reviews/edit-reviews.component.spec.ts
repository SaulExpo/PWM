import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReviewsComponent } from './edit-reviews.component';

describe('EditReviewsComponent', () => {
  let component: EditReviewsComponent;
  let fixture: ComponentFixture<EditReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
