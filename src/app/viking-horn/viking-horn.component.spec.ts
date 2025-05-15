import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikingHornComponent } from './viking-horn.component';

describe('VikingHornComponent', () => {
  let component: VikingHornComponent;
  let fixture: ComponentFixture<VikingHornComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikingHornComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikingHornComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
