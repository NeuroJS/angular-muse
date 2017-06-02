import { Component, ChangeDetectorRef } from '@angular/core';
import { MuseClient } from 'muse-js';
import { Observable } from 'rxjs/Rx';
import { transform } from './transform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private cd: ChangeDetectorRef) {
  }

  muse = new MuseClient();
  data;

  async connect() {
    await this.muse.connect();
    await this.muse.start();
    this.data = transform(this.muse.eegReadings)
      .do(() => this.cd.detectChanges());
  }
}
