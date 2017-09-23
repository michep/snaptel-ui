import { Injectable } from '@angular/core';

@Injectable()
export class Util {

  getDateString(ts: number): string {
    return new Date(ts * 1000).toLocaleString('ru');
  }

}
