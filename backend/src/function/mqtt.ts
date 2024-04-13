import mqtt from 'mqtt';

export const getMqtt = () => {
  console.log('mqtt', process.env.MQTT_HOST);
  const host = process.env.MQTT_HOST;
  const port = process.env.MQTT_PORT;
  const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

  const connectUrl = `mqtt://${host}:${port}`;

  const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USER_NAME,
    password: process.env.MQTT_PASSWORD,
    reconnectPeriod: 1000,
  });

  const topic1 = '/energy/batch';
  const topic2 = '/energy/batch1';

  client.on('connect', () => {
    console.log('Connected');

    client.subscribe([topic1, topic2], () => {
      console.log(`Subscribe to topic '${topic1}'`);
      client.publish(
        topic1,
        '{"comand":"get", "date":"2024-04-11"}',
        { qos: 0, retain: false },
        (error) => {
          if (error) {
            console.error(error);
          }
        },
      );
    });
  });

  client.on('message', (topic2, payload) => {
    console.log('Received Message:', topic2, payload.toString());
  });
};
