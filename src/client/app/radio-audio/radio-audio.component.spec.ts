import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioAudioComponent } from './radio-audio.component';

describe('RadioAudioComponent', () => {
  let component: RadioAudioComponent;
  let fixture: ComponentFixture<RadioAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioAudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
