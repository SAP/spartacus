import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'cx-config-form',
  templateUrl: './config-textfield-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldFormComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
