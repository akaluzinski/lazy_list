import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { ErrorFrameComponent } from './error-frame/error-frame.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

const components = [
  DropdownDirective,
  LoadingSpinnerComponent,
  ErrorFrameComponent,
];

const directives = [
  PlaceholderDirective
];

@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ...components,
    ...directives,
    CommonModule
  ]
})
export class SharedModule { }
