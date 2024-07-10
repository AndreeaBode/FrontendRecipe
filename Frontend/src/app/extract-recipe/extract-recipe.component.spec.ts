import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtractRecipeComponent } from './extract-recipe.component';

describe('ExtractRecipeComponent', () => {
  let component: ExtractRecipeComponent;
  let fixture: ComponentFixture<ExtractRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtractRecipeComponent]
    });
    fixture = TestBed.createComponent(ExtractRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
