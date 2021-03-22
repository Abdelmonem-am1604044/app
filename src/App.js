import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from './config.json';
import { Container, Row, Col, H1, H3, Button, Text } from 'native-base';
import { notification } from './notificationManager';

export default function App() {
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [aTemperature, setATemperature] = useState(0);
  const [aHumidity, setAHumidity] = useState(0);

  async function getData() {
    const response = await fetch('http://de21cafcc6cd.ngrok.io/records');
    const data = await response.json();

    setAHumidity(data.humidity);
    setATemperature(data.temperature);
  }

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    firebase
      .database()
      .ref('/temperature')
      .on('value', (snapshot) => {
        setTemperature(snapshot.val());
      });
    firebase
      .database()
      .ref('/humidity')
      .on('value', (snapshot) => {
        setHumidity(snapshot.val());
      });
    getData();
  }, []);

  return (
    <Container>
      <Row style={styles.row}>
        <H1>X Radiation Mobile App</H1>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Temperature (C):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{temperature}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Accumulated Temperature (C):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{aTemperature}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Humidity (%):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{humidity}</H3>
        </Col>
      </Row>
      <Row>
        <Col style={styles.row}>
          <H3>Accumulated Humidity (%):</H3>
        </Col>
        <Col style={styles.row}>
          <H3>{aHumidity}</H3>
        </Col>
      </Row>
      <Row style={styles.row}>
        <Button
          info
          onPress={() => {
            notification.showNotification(
              'Alarm',
              'A Notification'
            );
          }}
        >
          <Text>Push Notification</Text>
        </Button>
      </Row>
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
