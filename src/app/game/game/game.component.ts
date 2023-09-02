import { Component } from '@angular/core';
import { Level } from 'src/game/level';
import { FpsTimer } from 'src/game/timer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  level = new Level();

  timer = new FpsTimer(16, () => this.level.tick());
  
  tick() {
    this.level.tick();
  }
  
  spawnChar(station: number) {
    this.level.spawnChar(station);
  }
}
