import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[Info]'
})
export class InfoDirective {

  @Input() text: string = "";
  private containerElement: HTMLElement | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.containerElement = this.renderer.createElement('div');


    const spanElement = this.renderer.createElement('span');

    const textNode = this.renderer.createText(this.text);

    this.renderer.appendChild(spanElement, textNode);

    this.renderer.appendChild(this.containerElement, spanElement);
  }

  @HostListener('mouseenter') onHover() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    this.renderer.appendChild(this.elementRef.nativeElement, this.containerElement);

  }
  @HostListener('mouseleave') onHoverOut() {
    this.renderer.removeChild(this.elementRef.nativeElement, this.containerElement);
  }
}
