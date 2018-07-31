import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from './capitalize/capitalize.pipe';
import { CEPPipe } from './cep/cep.pipe';
import { CPFPipe } from './cpf/cpf.pipe';
import { PhoneNumberPipe } from './phone-number/phone-number.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CapitalizePipe,
    CEPPipe,
    CPFPipe,
    PhoneNumberPipe
  ],
  providers: []
})
export class PipesModule { }
