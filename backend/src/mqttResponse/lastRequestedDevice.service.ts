import { Injectable } from '@nestjs/common';

/**
 * Ответ openhab на /energy/days не всегда содержит имя устройства, а запрос —
 * содержит. Запоминаем последнее запрошенное устройство, чтобы правильно
 * разложить пришедшие дни по сериям.
 */
@Injectable()
export class LastRequestedDeviceService {
  private device = 'inputCircuitBreaker';

  set(device: string) {
    if (device) {
      this.device = device;
    }
  }

  get(): string {
    return this.device;
  }
}
