import { Injectable } from '@angular/core';
import { Settings } from './app.settings.model';

@Injectable()
export class AppSettings {
  public settings = new Settings(
    'Integrar', // theme name
    true, // loadingSpinner
    true, // fixedHeader
    true, // sidenavIsOpened
    true, // sidenavIsPinned
    true, // sidenavUserBlock
    'Vertical', // Horizontal , Vertical
    'Padrão', // Padrão, Compaco, Mini
    'indigo-light', // indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
    false, // true = rtl, false = ltr
    true // true = has footer, false = no footer
  );
}
