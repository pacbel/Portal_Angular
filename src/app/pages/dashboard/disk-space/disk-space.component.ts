import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewChecked
} from '@angular/core';
import { diskSpace } from '../dashboard.data';

@Component({
  selector: 'app-disk-space',
  templateUrl: './disk-space.component.html'
})
export class DiskSpaceComponent implements OnInit, AfterViewChecked {
  public data: any[];
  public showLegend = false;
  public gradient = true;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B']
  };
  public showLabels = true;
  public explodeSlices = true;
  public doughnut = false;
  @ViewChild('resizedDiv', { static: true }) resizedDiv: ElementRef;
  public previousWidthOfResizedDiv = 0;

  constructor() {}

  ngOnInit() {
    this.data = diskSpace;
  }

  public onSelect(event) {
    console.log(event);
  }

  ngAfterViewChecked() {
    if (
      this.previousWidthOfResizedDiv !==
      this.resizedDiv.nativeElement.clientWidth
    ) {
      setTimeout(() => (this.data = [...diskSpace]));
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }
}
