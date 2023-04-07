import { Component, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { QuestionService } from 'src/app/shared/services/question.service';

@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  answer: any;
  render = false;
  loading = false;
  chat: Array<any> = [];
  messageQ: any;
  question = new UntypedFormGroup({
    q: new UntypedFormControl(null, [Validators.required]),
  });

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.answer = 'stel uw vraag';
  }

  ask() {
    this.loading = true;
    this.messageQ = this.question.get('q')?.value;
    this.answer = this.questionService.renderAnswer(this.messageQ);
    this.render = true;
    this.loading = false;
    const message = {
      q: this.messageQ,
      a: this.answer,
    };
    this.chat.push(message);
  }
}
