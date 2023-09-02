import { Component } from '@angular/core';
import { Level } from 'src/game/level';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  level = new Level();
  
  tick() {
    this.level.tick();
  }
  
  spawnChar() {
    this.level.spawnChar();
  }
}
