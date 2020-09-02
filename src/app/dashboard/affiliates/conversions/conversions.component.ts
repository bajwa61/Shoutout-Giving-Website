import {
  Component,
  OnInit
} from '@angular/core';
import {
  ConversionsService
} from 'src/_services/conversions.service';
import {
  LoadingService
} from 'src/_services/loading.service';

@Component({
  selector: 'app-conversions',
  templateUrl: './conversions.component.html',
  styleUrls: ['./conversions.component.css']
})

 // tslint:disable: variable-name
export class ConversionsComponent implements OnInit {
  conversions = [];
  searchText: any;
  isDataAvailable: boolean;

  constructor(
    private _conversionsService: ConversionsService,
    private _loadingService: LoadingService
  ) {
    this._loadingService.loadingChanges.emit(true);
    this.isDataAvailable = false;
    this.getAllConversions();
  }

  ngOnInit() {}

  getAllConversions() {
    this._conversionsService.getAllConversions().subscribe(value => {
      if (value.length > 0) {
        value.forEach(data => {
          const tempPage = data.payload.doc.data();
          tempPage['id'] = data.payload.doc.id;
          this.conversions.push(tempPage);
        });
        this.isDataAvailable = true;
        this._loadingService.loadingChanges.emit(false);
      } else {
        this.isDataAvailable = false;
        this._loadingService.loadingChanges.emit(false);
      }
    }, error => {
      this.isDataAvailable = false;
      this._loadingService.loadingChanges.emit(false);
    });
  }
}
