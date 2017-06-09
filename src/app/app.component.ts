import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { MuseClient } from 'muse-js';
import { Observable } from 'rxjs/Rx';
import { transform } from './transform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  connecting = false;
  connected = false;
  private muse = new MuseClient();
  data;

  constructor(private cd: ChangeDetectorRef, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
  }

  async connect() {
    this.connecting = true;
    this.snackBar.dismiss();
    try {
      await this.muse.connect();
      await this.muse.start();
      this.data = transform(this.muse.eegReadings)
        .do(() => this.cd.detectChanges());
      this.connected = true;
    } catch (err) {
      this.snackBar.open('Connection failed: ' + err.toString(), 'Dismiss');
    } finally {
      this.connecting = false;
    }
  }
}
