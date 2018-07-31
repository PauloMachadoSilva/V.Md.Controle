import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMaskModule } from 'ngx-mask';

import { WzaInputComponent } from './field/wza-input/wza-input.component';
import { WzaSelectComponent } from './field/wza-select/wza-select.component';
import { WzaLabelComponent } from './field/wza-label/wza-label.component';
import { FormDebugComponent } from './debug/form-debug.component';
import { WzaFormBuilder } from './builder/wza-form-builder';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot({})
    ],
    declarations: [
        WzaLabelComponent,
        WzaInputComponent,
        WzaSelectComponent,
        FormDebugComponent
    ],
    providers: [ WzaFormBuilder ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        WzaLabelComponent,
        WzaInputComponent,
        WzaSelectComponent,
        FormDebugComponent
    ]
})
export class WzaFormModule { }
