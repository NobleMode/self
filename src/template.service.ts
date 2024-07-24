// handlebars.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as Handlebars from 'hbs';

@Injectable()
export class TemplateService implements OnModuleInit {
  onModuleInit() {
    this.registerHelpers();
  }

  registerHelpers() {
    Handlebars.registerHelper('toUpperCase', function(str) {
      return str.toUpperCase();
    });
    Handlebars.registerHelper(
      'eq', function(v1, v2) {
        return v1 === v2;
      },
    );
    Handlebars.registerHelper('date', function(date) {
      return new Date(date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    });
  }
}