import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeUnderReviewComponent } from './recipe-under-review.component';

describe('RecipeUnderReviewComponent', () => {
  let component: RecipeUnderReviewComponent;
  let fixture: ComponentFixture<RecipeUnderReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeUnderReviewComponent]
    });
    fixture = TestBed.createComponent(RecipeUnderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
