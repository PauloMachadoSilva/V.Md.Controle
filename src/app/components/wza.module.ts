import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgxSpinnerModule } from 'ngx-spinner';

import { WzaFormModule } from './form/wza-form.module';
import { PartialModalComponent } from './partial-modal/partial.modal.component';
import { PartialSpinnerComponent } from './partial-spinner/partial-spinner.component';
import { FormDddSelectorComponent } from './partial-form-ddd-selector/form-ddd-selector.component';
import { FormDDDResolve } from './partial-form-ddd-selector/form-ddd-selector.resolver';
import { PartialSidebarComponent } from './partial-sidebar/partial-sidebar.component';
import { PartialBreadcrumbComponent } from './partial-breadcrumb/partial-breadcrumb.component';
import { PartialPlanCardComponent } from './partial-plan-card/partial-plan-card.component';
import { FaqComponent } from './partial-faq/faq.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        WzaFormModule,
        NgxSpinnerModule
    ],
    declarations: [
        PartialModalComponent,
        PartialSpinnerComponent,
        PartialPlanCardComponent,
        PartialSidebarComponent,
        PartialBreadcrumbComponent,
        FormDddSelectorComponent,
        FaqComponent
    ],
    exports: [
        WzaFormModule,
        PartialModalComponent,
        PartialSpinnerComponent,
        PartialPlanCardComponent,
        PartialSidebarComponent,
        PartialBreadcrumbComponent,
        FormDddSelectorComponent,
        FaqComponent
    ],
    providers: [
        FormDDDResolve
    ]
})
export class WzaModule { }
