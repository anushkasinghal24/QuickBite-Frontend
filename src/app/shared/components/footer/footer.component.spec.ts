import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent, RouterTestingModule]
    }).compileComponents();
  });

  it('renders the brand name and current year', () => {
    const fixture = TestBed.createComponent(FooterComponent);
    fixture.detectChanges();

    const rendered = fixture.nativeElement.textContent as string;
    expect(rendered).toContain('QuickBite');
    expect(rendered).toContain(String(new Date().getFullYear()));
  });
});
