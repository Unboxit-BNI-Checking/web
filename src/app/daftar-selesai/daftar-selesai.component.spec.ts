import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaftarSelesaiComponent } from './daftar-selesai.component';

describe('DaftarSelesaiComponent', () => {
  let component: DaftarSelesaiComponent;
  let fixture: ComponentFixture<DaftarSelesaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaftarSelesaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DaftarSelesaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
