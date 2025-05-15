import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikingBoatComponent } from './viking-boat.component';

describe('VikingBoatComponent', () => {
  let component: VikingBoatComponent;
  let fixture: ComponentFixture<VikingBoatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikingBoatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikingBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
