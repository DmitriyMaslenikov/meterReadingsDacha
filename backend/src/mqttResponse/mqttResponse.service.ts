import { Injectable } from '@nestjs/common';

export interface StoredMqttResponse {
  /** Метка времени сервера, когда пришёл ответ. null — ответа ещё не было. */
  receivedAt: number | null;
  payload: any;
}

/**
 * Хранит последний ответ прибора по каждому топику, чтобы фронтенд мог его
 * забрать обычным HTTP-запросом: MQTT-ответ приходит асинхронно и сам по себе
 * до браузера не доходит.
 */
@Injectable()
export class MqttResponseService {
  private readonly responses = new Map<string, StoredMqttResponse>();

  save(topic: string, payload: any) {
    this.responses.set(topic, { receivedAt: Date.now(), payload });
  }

  get(topic: string): StoredMqttResponse {
    return this.responses.get(topic) ?? { receivedAt: null, payload: null };
  }
}
