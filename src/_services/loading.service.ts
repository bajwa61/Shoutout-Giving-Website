import {Injectable, Inject, EventEmitter} from '@angular/core';

@Injectable()

export class LoadingService {

  loadingChanges = new EventEmitter();

  constructor() {}

}
