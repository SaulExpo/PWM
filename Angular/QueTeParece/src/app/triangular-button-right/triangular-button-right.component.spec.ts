import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriangularButtonRightComponent } from './triangular-button-right.component';

describe('TriangularButtonRightComponent', () => {
  let component: TriangularButtonRightComponent;
  let fixture: ComponentFixture<TriangularButtonRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriangularButtonRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriangularButtonRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
