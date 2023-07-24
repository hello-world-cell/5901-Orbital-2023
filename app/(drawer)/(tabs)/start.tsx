import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet,ScrollView,  } from 'react-native';
import { listStudySessions } from '../../../src/graphql/queries';
import { createStudySession } from '../../../src/graphql/mutations';
import { listStudyGroups } from '../../../src/graphql/queries';
import { API } from 'aws-amplify';
import CheckBox from '../../../components/CheckBox';
import { Calendar } from 'react-native-calendars';


function Start() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [time, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [location, setLocation] = useState('');
  const [todoList, setTodoList] = useState('');
  const [studyGroups, setStudyGroups] = useState([]);
  const [markedDates, setMarkedDates] = useState({});
  const [selectedStudyGroups, setSelectedStudyGroups] = useState([]);

  useEffect(() => {
    fetchStudyGroups(); // Fetch study groups on component mount
  }, []);

  const fetchStudyGroups = async () => {
    try {
      const studyGroupsData = await API.graphql({ query: listStudyGroups });
      setStudyGroups(studyGroupsData.data.listStudyGroups.items);
    } catch (error) {
      console.log('Error fetching study groups:', error);
    }
  };

  const handleStartSession = () => {
    setShowDropdown(true);
  };

  const handleSendInvites = async () => {
    // Logic for sending study invites to selected study sessions
    // Implement your own logic here
    console.log('Sending study invites to selected study sessions:', todoList);

    // Create the study session using the createStudySession mutation
    try {
      await API.graphql({
        query: createStudySession,
        variables: {
          input: {
            time:time,
            location:location,
            todo:todoList,
            date: selectedDate,
            studygroupID: selectedStudyGroups[0],
          },
        },
      });

      // Reset the state values
      setTime('');
      setLocation('');
      setTodoList('');
      setSelectedDate('');

      // Hide the dropdown
      setShowDropdown(false);
    } catch (error) {
      console.log("date", selectedDate);
      console.log("todo", todoList);
      console.log("location", location);
      console.log("time", time);
      console.log('Error creating study session:', error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date.dateString);
    const updatedMarkedDates = { [date.dateString]: { selected: true } };
    setMarkedDates(updatedMarkedDates);
  };

  const handleStudyGroupSelect = (groupId) => {
    // Toggle the selection status of the study group
    setSelectedStudyGroups((prevSelectedGroups) => {
      if (prevSelectedGroups.includes(groupId)) {
        return prevSelectedGroups.filter((id) => id !== groupId);
      } else {
        return [...prevSelectedGroups, groupId];
      }
    });
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Start your own Study Session </Text>
      {!showDropdown && (
        <Button title="Start Study Session" onPress={handleStartSession} color="#008080" />
      )}
      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Enter Study Session Details:</Text>
          <TextInput
            style={styles.input}
            placeholder="Time (e.g. 10:30 AM)"
            value={time}
            onChangeText={setTime}
          />



    
            



<Text style={styles.label}>Select Date:</Text>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={markedDates}
            markingType="interactive"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="To-Do List"
            value={todoList}
            onChangeText={setTodoList}
          />

          {/* Render the study groups */}
          {studyGroups.map((group) => (
            <CheckBox
              key={group.id}
              title={group.name}
              checked={selectedStudyGroups.includes(group.id)} // You can manage this state accordingly
              onPress={() => {handleStudyGroupSelect(group.id)
              }}
            />
          ))}

          <Button title="Set Study Session" onPress={handleSendInvites} color="#008080" />
        </View>
      )}
    </ScrollView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  dropdownContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  timePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    width: '80%',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
export default Start;
