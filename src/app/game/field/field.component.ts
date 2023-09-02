import { Component, Input } from '@angular/core';
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

  onNodeClick(event: MouseEvent, node: Node) {
    const s = node.switch;
    if (!s) {
      return;
    }

    const prevIndex = s.dirs.findIndex(dir => dir == node.direction);
    node.direction = s.dirs[(prevIndex + s.dirs.length + (event.button == 2 ? -1 : 1)) % s.dirs.length];
  }

  getStationColor(station: number) {
    return 'hsl(' + 60 * station + ', 100%, 70%)';
  }

  getCharColor(station: number) {
    return 'hsl(' + 60 * station + ', 100%, 50%)';
  }
}
