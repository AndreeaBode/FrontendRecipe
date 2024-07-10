import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIngredientsComponent } from './search-ingredients.component';

describe('SearchIngredientsComponent', () => {
  let component: SearchIngredientsComponent;
  let fixture: ComponentFixture<SearchIngredientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIngredientsComponent]
    });
    fixture = TestBed.createComponent(SearchIngredientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
