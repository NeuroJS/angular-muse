/// <reference types="webpack-env" />

import { Component, NgZone } from '@angular/core';
import { MuseClient } from 'muse-js';
import { Observable } from 'rxjs/Rx';
import { transform } from './transform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (zone: NgZone) {
    module.hot.accept('./transform.ts', () => {
      zone.run(() => {
        const { transform } = require('./transform.ts') as any;
        console.log('accept');
        this.data = transform(this.muse.eegReadings);
        this.transform = transform;
      });
    });
  }

  transform = transform;
  muse = new MuseClient();
  data;

  async connect() {
    await this.muse.connect();
    await this.muse.start();
    this.data = this.transform(this.muse.eegReadings);
  }
}
