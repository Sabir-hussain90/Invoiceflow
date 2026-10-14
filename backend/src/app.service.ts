import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    return {
      status: 'ok',
      service: 'InvoiceFlow Pakistan API',
      timestamp: new Date().toISOString(),
    };
  }
}