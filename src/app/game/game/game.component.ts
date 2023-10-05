import { Component } from '@angular/core';
import { links, nodes } from 'src/game/hardcoded-level';
import { Level } from 'src/game/level';
import { LevelGen } from 'src/game/level-gen';
import { FpsTimer } from 'src/game/timer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  levelGen = new LevelGen();
  level = new Level(
    this.levelGen.nodes,
    this.levelGen.links,
  );

  // level = new Level(
  //   nodes,
  //   links,
  // );

  timer = new FpsTimer(16, () => this.tick());
  
  debug = false;

  ngOnInit() {
    this.level.gameOverSubject.subscribe(() => {
      this.timer.stop();
      alert('Game Over! Score: ' + this.level.score);
    });

    this.timer.start();
  }

  tick() {
    this.level.tick(16);
  }
  
  spawnChar(station: number) {
    this.level.spawnChar(station);
  }
}
