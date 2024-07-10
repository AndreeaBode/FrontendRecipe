import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDishgenComponent } from './recipe-dishgen.component';

describe('RecipeDishgenComponent', () => {
  let component: RecipeDishgenComponent;
  let fixture: ComponentFixture<RecipeDishgenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeDishgenComponent]
    });
    fixture = TestBed.createComponent(RecipeDishgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
