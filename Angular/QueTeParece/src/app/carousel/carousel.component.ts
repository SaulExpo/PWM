import {Component, OnInit, QueryList, ElementRef, ViewChild, ViewChildren, AfterViewInit} from '@angular/core';
import {After} from "node:v8";

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, AfterViewInit{
  @ViewChildren('slides') slides!: QueryList<any>;
  @ViewChild('prev') prevBtn!: ElementRef;
  @ViewChild('next') nextBtn!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  index = 0;
  ngOnInit() {
  }

  ngAfterViewInit() {
    this.carousel()
  }

    carousel(){
      const slidesArray = this.slides.toArray(); // convierte QueryList a array normal

      const showSlide = (i: number) => {
        this.index = (i + slidesArray.length) % slidesArray.length;
        this.container.nativeElement.style.transform = `translateX(${-this.index * 100}%)`;
      };

      this.prevBtn.nativeElement.addEventListener('click', () => showSlide(this.index - 1));
      this.nextBtn.nativeElement.addEventListener('click', () => showSlide(this.index + 1));

        setInterval(() => showSlide(this.index + 1), 3000);
    }
}
