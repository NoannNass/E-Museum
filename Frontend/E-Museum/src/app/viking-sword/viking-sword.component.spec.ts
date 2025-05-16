import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VikingSwordComponent } from './viking-sword.component';

describe('VikingSwordComponent', () => {
  let component: VikingSwordComponent;
  let fixture: ComponentFixture<VikingSwordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VikingSwordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VikingSwordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
