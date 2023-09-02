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

  @Input() level!: Level;

  onNodeClick(node: Node) {
    const links = this.level.linkMap.get(node.id) ?? [];
    if (links.length > 1) {
      const dirs = links.map(link => link.direction).sort();
      const prevIndex = dirs.findIndex(dir => dir == node.direction);
      node.direction = dirs[(prevIndex + 1) % dirs.length];
    }
    console.log(this.level);
  }
}
