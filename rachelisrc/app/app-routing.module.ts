import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { InstructionComponent } from './instruction/instruction.component';

const routes: Routes = [
  {path:"",component:InstructionComponent},
  {path:"form",component:FormComponent},
  {path:"instruction",component:InstructionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
