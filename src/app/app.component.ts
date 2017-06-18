import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { MdSnackBar } from '@angular/material';

import { MuseClient, MuseControlResponse, zipSamples, EEGSample } from 'muse-js';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeUntil';

import { XYZ } from './head-view/head-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  connecting = false;
  connected = false;
  data: Observable<EEGSample> | null;
  batteryLevel: Observable<number> | null;
  controlResponses: Observable<MuseControlResponse>;
  accelerometer = new Subject<XYZ>();
  destroy = new Subject<void>();

  private muse = new MuseClient();

  constructor(private cd: ChangeDetectorRef, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.muse.connectionStatus
      .takeUntil(this.destroy)
      .subscribe(status => {
        this.connected = status;
        this.data = null;
        this.batteryLevel = null;
      });
  }

  ngOnDestroy() {
    this.destroy.next();
  }

  async connect() {
    this.connecting = true;
    this.snackBar.dismiss();
    try {
      await this.muse.connect();
      this.controlResponses = this.muse.controlResponses;
      await this.muse.start();
      this.data = zipSamples(this.muse.eegReadings)
        .takeUntil(this.destroy)
        .do(() => this.cd.detectChanges());
      this.batteryLevel = this.muse.telemetryData
        .takeUntil(this.destroy)
        .map(t => t.batteryLevel);
      this.muse.accelerometerData
        .takeUntil(this.destroy)
        .map(reading => reading.samples[reading.samples.length - 1])
        .subscribe(this.accelerometer);
    } catch (err) {
      this.snackBar.open('Connection failed: ' + err.toString(), 'Dismiss');
    } finally {
      this.connecting = false;
    }
  }

  disconnect() {
    this.muse.disconnect();
  }
}
