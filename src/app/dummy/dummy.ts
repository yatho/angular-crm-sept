import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'crm-dummy',
  imports: [],
  templateUrl: './dummy.html',
  styleUrl: './dummy.scss',
})
export class Dummy {
  @Input()
  public label = '';

  @Output()
  public clicked = new EventEmitter<string>();

  onClicked(event: MouseEvent): void {
    console.log('Button clicked', event);
    // Emit the label with a random string
    this.clicked.emit(this.label + 'a random string');
  }
}
