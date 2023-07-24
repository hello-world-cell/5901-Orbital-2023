import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { listStudySessions } from '../../../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
const { width, height } = Dimensions.get('window');



export default function TabTwoScreen() {

  const [selectedDate, setSelectedDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [studySessions, setStudySessions] = useState([]);
  const [studySessionsWithDates, setStudySessionsWithDates] = useState([]);

  // Function to fetch study sessions data
  const fetchStudySessions = async () => {
    try {
      const studySessionsData = await API.graphql(graphqlOperation(listStudySessions));
      const sessions = studySessionsData.data.listStudySessions.items;
      const sessionsWithDates = sessions.map((session) => ({
        ...session,
        date: session.date.substr(0, 10), // Assuming the date is stored as a string like "YYYY-MM-DD"
      }));
      setStudySessionsWithDates(sessionsWithDates);
      setStudySessions(sessions);
    } catch (error) {
      console.log('Error fetching study sessions:', error);
    }
  };

  const getStudySessionsForSelectedDate = () => {
    return studySessionsWithDates.filter((session) => session.date === selectedDate);
  };
  const renderStudySessionsForSelectedDate = () => {
    const studySessionsForSelectedDate = getStudySessionsForSelectedDate();
    if (studySessionsForSelectedDate.length === 0) {
      return <Text>No study sessions for this date.</Text>;
    } else {
      return studySessionsForSelectedDate.map((session, index) => (
        <Text key={index} style={styles.scheduleText}>
          {session.location} - {session.time}
        </Text>
      ));
    }
  };

  useEffect(() => {
    fetchStudySessions();
  }, []);

  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    setIsModalVisible(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Calendar</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Calendar
        style={styles.calendar}
        onDayPress={handleDateSelect}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#008080' },
        }}
      />
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Study Schedule for {selectedDate}</Text>
          {renderStudySessionsForSelectedDate()}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  calendar: {
    width: width - 40,
    borderRadius: 10,
    height: height - 60,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

// Configure the calendar's locale
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};

LocaleConfig.defaultLocale = 'en';
