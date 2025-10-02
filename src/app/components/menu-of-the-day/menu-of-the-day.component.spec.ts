import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOfTheDayComponent } from './menu-of-the-day.component';

describe('MenuOfTheDayComponent', () => {
  let component: MenuOfTheDayComponent;
  let fixture: ComponentFixture<MenuOfTheDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuOfTheDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
