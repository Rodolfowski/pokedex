import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralPokedexComponent } from './general-pokedex.component';

describe('GeneralPokedexComponent', () => {
  let component: GeneralPokedexComponent;
  let fixture: ComponentFixture<GeneralPokedexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneralPokedexComponent]
    });
    fixture = TestBed.createComponent(GeneralPokedexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
