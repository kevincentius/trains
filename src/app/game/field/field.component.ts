import { Component, Input, HostListener } from '@angular/core';
import { Char } from 'src/game/char';
import { Level } from 'src/game/level';
import { Node } from 'src/game/level-data';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {

  uiConfig = {
    linkWidth: 15,
  };

  dirDisplay = [ '↑', '→', '↓', '←' ];

  @Input() level!: Level;
  
  @HostListener('contextmenu', ['$event'])
  contextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  onNodeClick(event: MouseEvent, node: Node) {
    this.toggleSwitch(1, node);
  }

  onNodeContextMenu(event: MouseEvent, node: Node) {
    event.preventDefault();

    this.toggleSwitch(-1, node);
  }

  private toggleSwitch(dIndex: number, node: Node) {
    const s = node.switch;
    if (!s) {
      return;
    }

    const prevIndex = s.dirs.findIndex(dir => dir == node.direction);
    node.direction = s.dirs[(prevIndex + s.dirs.length + dIndex) % s.dirs.length];
  }

  getStationColor(station: number) {
    return 'hsl(' + 30 + 70 * station + ', 100%, ' + (station >= 5 ? 70 : 30) + '%)';
  }

  getCharColor(station: number) {
    return 'hsl(' + 30 + 70 * station + ', 100%, ' + (station >= 5 ? 70 : 30) + '%)';
  }
}
