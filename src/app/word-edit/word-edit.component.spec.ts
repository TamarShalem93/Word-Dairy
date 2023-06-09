import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordEditComponent } from './word-edit.component';

describe('WordEditComponent', () => {
  let component: WordEditComponent;
  let fixture: ComponentFixture<WordEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WordEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
