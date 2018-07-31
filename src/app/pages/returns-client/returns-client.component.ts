import { Component, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';

@Component({
    selector: 'returns-client',
    template: ''
})
export class ReturnsClientComponent implements OnInit {

    public id: number;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        // this._APImetrics.sendUid('analyticsEvent: string', 'requestEvent: string', 'view: string');
        console.log('===> 111');
    }

    ngOnInit() {
        console.log(this._route);
        /*
        this._route.params.subscribe(params => {
            this.id = + params['id'];
         });
*/
        console.log('TODO: Impementar retomada de fluxo: ', this.id);

        throw new Error('Ops...');

        // TODO: Implement returns logical

        // let url: string;
        // ... celular.Vivo.ModalControle\Vivo.ControleModal\Controllers\HomeController.cs:RetomarMigracao
        // this._router.navigateByUrl(url);
    }
}
