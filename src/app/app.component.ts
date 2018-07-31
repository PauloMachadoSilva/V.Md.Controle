import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ConstantsService } from './shared/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    constructor(public router: Router,
            private _titleService: Title,
            private _constants: ConstantsService
    ) {
        this._titleService.setTitle(_constants.client.title);
    }
}
