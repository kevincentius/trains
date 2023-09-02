
export class FpsTimer{

  timeout: any;
  lastUpdate = Date.now();


  constructor(
    private mspf: number,
    private updateCallback: () => void,
  ) {}

  start() {
    if (!this.timeout) {
      this.lastUpdate = Date.now();

      this.timeout = setTimeout(() => this.runFrame(), this.mspf);
    }
  }

  stop() {
    clearTimeout(this.timeout);
    this.timeout = undefined;
  }

  runFrame() {
    const now = Date.now();
    if (this.lastUpdate + this.mspf <= now) {
      this.updateCallback();
      this.lastUpdate += this.mspf;

      // no catch up:
      this.lastUpdate = Math.max(now - this.mspf, this.lastUpdate);
    }
    
    const nextFrameDelay = Math.max(0, this.lastUpdate + this.mspf - Date.now());
    this.timeout = setTimeout(() => this.runFrame(), nextFrameDelay);
  }
}
