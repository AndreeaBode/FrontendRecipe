import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedDetailComponent } from './advanced-detail.component';

describe('AdvancedDetailComponent', () => {
  let component: AdvancedDetailComponent;
  let fixture: ComponentFixture<AdvancedDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedDetailComponent]
    });
    fixture = TestBed.createComponent(AdvancedDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
