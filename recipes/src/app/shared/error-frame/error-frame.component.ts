import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-error-frame',
  templateUrl: './error-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorFrameComponent {

  errorMessage = '';

}
