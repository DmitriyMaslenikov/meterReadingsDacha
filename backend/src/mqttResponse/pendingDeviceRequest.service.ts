import { Injectable } from '@nestjs/common';

/**
 * Ответ openhab на /energy/days не содержит имени устройства, поэтому его
 * приходится сопоставлять с запросом. Держим ровно один запрос «в полёте»:
 * ответ достаётся ему и только ему. Если ожидающего запроса нет или он уже
 * протух, ответ отбрасывается — иначе он достанется чужому устройству и
 * запишет его показания в другую серию.
 */
@Injectable()
export class PendingDeviceRequestService {
  private pending: { device: string; at: number } | null = null;

  /** Дольше этого ответ считаем потерянным. */
  private readonly ttlMs = 60000;

  start(device: string) {
    if (device) {
      this.pending = { device, at: Date.now() };
    }
  }

  /** Забирает устройство для пришедшего ответа. null — ответ ничей. */
  take(): string | null {
    if (!this.pending) {
      return null;
    }

    const { device, at } = this.pending;
    this.pending = null;

    return Date.now() - at > this.ttlMs ? null : device;
  }
}
