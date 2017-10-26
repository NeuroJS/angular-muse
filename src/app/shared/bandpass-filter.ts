import * as Fili from 'fili';

export class BandpassFilter {
  readonly iirCalculator = new Fili.CalcCascades();
  private readonly highpass: any;
  private readonly lowpass: any;

  constructor(samplingFreq: number, lowFreq: number, highFreq: number, order = 4) {
    const lowPassCoefficients = this.iirCalculator.lowpass({
      order: 4,
      characteristic: 'butterworth',
      Fs: samplingFreq,
      Fc: highFreq,
    });
    const highPassCoefficients = this.iirCalculator.highpass({
      order: 4,
      characteristic: 'butterworth',
      Fs: samplingFreq,
      Fc: lowFreq,
    });
    this.lowpass = new Fili.IirFilter(lowPassCoefficients);
    this.highpass = new Fili.IirFilter(highPassCoefficients);
  }

  next(value: number) {
    return this.lowpass.singleStep(this.highpass.singleStep(value));
  }
}
