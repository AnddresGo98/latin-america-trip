import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit, AfterViewInit {

  @ViewChild('graph') graph: ElementRef | undefined;

  viewBox: string = '0 0 1200 100';
  widthGraph: number = 1200;
  heightGraph: number = 100;
  fishAmount: number = 1;
  fishes: Fish[] = [];
  radius: number = 50;
  sizePerFish: number = 100;

  constructor(
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log('init')
  }

  ngAfterViewInit(): void {
    this.setGraphSizes();
    this.generateFishes();
  }

  setGraphSizes(): void {
    this.widthGraph = this.graph?.nativeElement.offsetWidth;
    this.heightGraph = this.graph?.nativeElement.offsetHeight;
    this.viewBox = `0 0 ${this.widthGraph} ${this.heightGraph}`;
    this.fishAmount = this.widthGraph > this.sizePerFish ? Math.floor(this.widthGraph / this.sizePerFish) : 1;
    this.changeDetector.detectChanges();
  }

  generateFishes(): void {
    for (let i = 0; i < this.fishAmount; i++) {
      let x = this.numberRamdom(this.sizePerFish * i, this.sizePerFish * (i + 1));
      let y = this.numberRamdom(0, this.heightGraph);
      this.fishes.push({ cx: x, cy: y, path: this.generatePathFish(x, y, x, y) });
    }
    setTimeout(() => this.moveFishes(), 0);
    setInterval(() => this.moveFishes(), 2000);
  }

  moveFishes(): void {
    this.fishes.map(fish => {
      let minX = fish.cx > 0 ? fish.cx - 400 : fish.cx;
      let maxX = fish.cx < this.widthGraph ? fish.cx + 400 : fish.cx;
      let minY = fish.cy > 0 ? fish.cy - 50 : fish.cy;
      let maxY = fish.cy < this.heightGraph ? fish.cy + 50 : fish.cy;
      let oldX = fish.cx;
      let oldY = fish.cy;
      fish.cx = this.numberRamdom(minX, maxX);
      fish.cy = this.numberRamdom(minY, maxY);
      fish.path = this.generatePathFish(oldX, oldY, fish.cx, fish.cy);
    });
  }

  numberRamdom(min: number, max: number): number {
    return Math.floor((Math.random() * (max - min + 1)) + min);
  }

  moveFish(ev: MouseEvent, circle: HTMLElement, i: number): void {
    let clientRects = circle.getClientRects().item(0);
    let cxCurrent = clientRects ? clientRects.x + (clientRects.width / 2) : ev.offsetX + this.radius;
    let cxNew = cxCurrent >= ev.offsetX ? 500 : -500;
    let oldX = this.fishes[i].cx;
    let oldY = this.fishes[i].cy;
    this.fishes[i].cx = cxNew + cxCurrent;
    if (this.fishes[i].cx > this.widthGraph) this.fishes[i].cx = this.widthGraph;
    if (this.fishes[i].cx < 0) this.fishes[i].cx = 0;
    this.fishes[i].path = this.generatePathFish(ev.offsetX, oldY, this.fishes[i].cx, this.fishes[i].cy)
  }

  generatePathFish(oldX: number, oldY: number, newX: number, newY: number): string {
    let angulo = Math.atan2(newY - oldY, oldX - newX);
    let path = 'M' + this.getPositionPath(angulo, 21, newX, newY - 6);
    path += 'L' + this.getPositionPath(angulo, 27, newX, newY + 5);
    path += 'L' + this.getPositionPath(angulo, 17, newX, newY + 1);
    path += 'Q' + this.getPositionPath(angulo, -11, newX, newY + 11) + this.getPositionPath(angulo, -27, newX, newY + 1);
    path += 'Q' + this.getPositionPath(angulo, -14, newX, newY - 11) + this.getPositionPath(angulo, 17, newX, newY - 3) + 'Z';
    return path;
  }

  getPositionPath(angulo: number, radio: number, x: number, y: number): string {
    return `${Math.round(Math.cos(angulo) * radio) + x} ${y - Math.round(Math.sin(angulo) * radio)} `;
  }

}

interface Fish {
  cx: number,
  cy: number,
  path: string
}