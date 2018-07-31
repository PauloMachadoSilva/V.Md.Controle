import { Component, OnInit, Input } from '@angular/core';


/**
 * @whatItDoes
 * Generic projeto Faq Co, this component get API data and fill form fields
 *
 * @howToUse
 * Use HTML selector: `<faq></faq>`
 *
 * @example
 * ```html
 * <faq></faq>
 *```
 *
 * NgModule: `{ imports: [ WzaModule ] }`
 */
@Component({
    selector: 'faq',
    templateUrl: './faq.component.html',
    styleUrls: ['./faq.component.sass'],
})
export class FaqComponent implements OnInit {

    private hasFaq: boolean;
    private hasLiveChat: boolean;
    private hasAkiva: boolean;
    private show: boolean;

    public faqView: boolean;

    constructor() {
        this.faqView = false;
     }

    ngOnInit() {
    }

    toggleModal() {
        this.faqView = !this.faqView;
    }

    openLiveChat() {
        console.log('openLiveChat');
    }

    closeLiveChat() {
        console.log('closeLiveChat');
    }
}
