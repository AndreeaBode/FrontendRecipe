import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedRecipeDetailComponent } from './added-recipe-detail.component';

describe('AddedRecipeDetailComponent', () => {
  let component: AddedRecipeDetailComponent;
  let fixture: ComponentFixture<AddedRecipeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddedRecipeDetailComponent]
    });
    fixture = TestBed.createComponent(AddedRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
