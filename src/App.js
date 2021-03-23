import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import firebase from 'firebase';
import firebaseConfig from './config.json';
import { Container, Row, Col, H1, H3, Button, Text } from 'native-base';
import { notification } from './notificationManager';
import { io } from 'socket.io-client';

export default function App() {
  const [temperature, setTemperature] = useState(0);
  const [aTemperature, setATemperature] = useState(0);
  const socket = io('http://e5507d620aa4.ngrok.io');

  async function getData() {
    const response = await fetch('http://e5507d620aa4.ngrok.io/records');
    const data = await response.json();
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
    getData();
  }, []);

  socket.on('new_data', (data) => {
    setATemperature(data.temperature)
    if (aTemperature > 8000) {
      notification.showNotification('Warning', 'You Exceeded You Yearly Dose');
    }
  });

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
      <Row style={styles.row}>
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
