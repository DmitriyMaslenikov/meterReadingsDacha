import mqtt from 'mqtt';

export const MqttClient = () => {
  const host = 'mqtt://192.168.1.60';
  const port = '1883';
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
  console.log(123, clientId);

  const connectUrl = `mqtt://${host}:${port}`;
  console.log(124, connectUrl);

  const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'dmitriy',
    password: '626920847',
    reconnectPeriod: 1000,
  });

  const topicRequest = '/energy/days';
  const topicResponse = '/energy/response';

  client.on('connect', () => {
    console.log('Connected');

    client.subscribe([topicRequest, topicResponse], () => {
      //console.log(`Subscribe to topic '${topicRequest}'`);
      //   client.publish(
      //     topicRequest,
      //     '{"startDay":"2024-04-06", "endDay":"2024-04-17"}',
      //     { qos: 0, retain: false },
      //     (error) => {
      //       if (error) {
      //         console.error(error);
      //       }
      //     },
      //   );
    });
  });

  //   const aas = client.on('message', (topicResponse, payload) => {
  //     console.log('Received Message:', topicResponse, payload.toString());
  //   });

  return client;
};
