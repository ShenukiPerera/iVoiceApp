import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';

const HomePage = () => {
  const [isRecording, setIsRecording] = useState(false); // To track recording state
  const [inputLanguage, setInputLanguage] = useState('en'); // Input language state
  const [outputLanguage, setOutputLanguage] = useState('es'); // Output language state
  const [transcribedText, setTranscribedText] = useState(''); // Text from speech
  const [translatedText, setTranslatedText] = useState(''); // Text after translation (mocked for now)
  const [textInput, setTextInput] = useState(''); // Text input from the user

  useEffect(() => {
    // Set up voice recognition
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
  }, []);

  const onSpeechResults = (e) => {
    setTranscribedText(e.value[0]); // Set the transcribed text from speech
  };

  const onSpeechError = (e) => {
    Alert.alert('Error', e.error.message); // Show error if speech fails
  };

  const startRecording = () => {
    try {
      Voice.start(inputLanguage); // Start recording based on selected input language
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = () => {
    try {
      Voice.stop(); // Stop the voice recording
      setIsRecording(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const handleTranslate = () => {
    // For now, we simulate the translation process
    // In a real app, you could connect to a translation API like Google Translate
    setTranslatedText(`Translated (${inputLanguage} to ${outputLanguage}): ${transcribedText}`);
    Speech.speak(`Translated text: ${translatedText}`); // Speak out the translated text
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Translate</Text>

      {/* Language Selection */}
      <View style={styles.languageSelection}>
        <TouchableOpacity style={styles.languageButton} onPress={() => setInputLanguage('en')}>
          <Text style={styles.languageButtonText}>English</Text>
        </TouchableOpacity>
        <Text style={styles.languageText}>to</Text>
        <TouchableOpacity style={styles.languageButton} onPress={() => setOutputLanguage('es')}>
          <Text style={styles.languageButtonText}>Spanish</Text>
        </TouchableOpacity>
      </View>

      {/* Text Input */}
      <TextInput
        style={styles.textInput}
        value={textInput}
        onChangeText={setTextInput}
        placeholder="Type something..."
        multiline
      />

      {/* Record Speech Button */}
      <TouchableOpacity
        style={styles.recordButton}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Feather name={isRecording ? "mic-off" : "mic"} size={30} color="white" />
      </TouchableOpacity>

      {/* Display Transcribed Text */}
      <Text style={styles.transcribedText}>{transcribedText || 'Speak something to translate'}</Text>

      {/* Translate Button */}
      <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
        <Text style={styles.translateButtonText}>Translate</Text>
      </TouchableOpacity>

      {/* Translated Text */}
      <Text style={styles.translatedText}>{translatedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 30,
  },
  languageSelection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  languageButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginHorizontal: 10,
  },
  languageButtonText: {
    color: 'white',
    fontSize: 18,
  },
  languageText: {
    fontSize: 18,
    color: '#2563eb',
    alignSelf: 'center',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  recordButton: {
    backgroundColor: '#2563eb',
    padding: 20,
    borderRadius: 50,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transcribedText: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 20,
    textAlign: 'center',
  },
  translateButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 20,
  },
  translateButtonText: {
    color: 'white',
    fontSize: 18,
  },
  translatedText: {
    fontSize: 18,
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomePage;
