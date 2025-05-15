import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikingCasqueComponent } from './viking-casque.component';

describe('VikingCasqueComponent', () => {
  let component: VikingCasqueComponent;
  let fixture: ComponentFixture<VikingCasqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikingCasqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikingCasqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
