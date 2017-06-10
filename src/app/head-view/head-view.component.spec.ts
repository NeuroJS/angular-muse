import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadViewComponent } from './head-view.component';

describe('HeadViewComponent', () => {
  let component: HeadViewComponent;
  let fixture: ComponentFixture<HeadViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
