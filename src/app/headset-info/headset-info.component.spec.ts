import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadsetInfoComponent } from './headset-info.component';

describe('HeadsetInfoComponent', () => {
  let component: HeadsetInfoComponent;
  let fixture: ComponentFixture<HeadsetInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadsetInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadsetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
