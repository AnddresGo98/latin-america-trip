import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
    console.log('estamos en footer');
    let hola = Math.round(Math.random() * 100);
   /*  setInterval(() => {
      console.log(hola++);
    },1000) */
  }

  ngAfterViewInit(): void {
    console.log(this.graph);
    //this.setGraphSizes();
  }

  setGraphSizes(): void {
    this.widthGraph = this.graph?.nativeElement.offsetWidth;
    this.heightGraph = this.graph?.nativeElement.offsetHeight;
    this.viewBox = `0 0 ${this.widthGraph} ${this.heightGraph}`;
  }

  onResizeGraph(s: any): void {
    console.log('redimencion');
  }

}
