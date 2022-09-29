import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordAddEditComponent } from './record-add-edit.component';

describe('RecordAddEditComponent', () => {
  let component: RecordAddEditComponent;
  let fixture: ComponentFixture<RecordAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordAddEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
