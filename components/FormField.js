import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';

export default function FormField({
  label, value, onChangeText, error, inputRef, ...textInputProps
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#A1A2B1"
        style={[styles.input, error ? styles.inputError : null]}
        {...textInputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 17 },
  label: { color: '#303148', fontSize: 14, fontWeight: '700', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DCDDE7',
    borderRadius: 11, paddingHorizontal: 14, paddingVertical: 13,
    color: '#20213A', fontSize: 15,
  },
  inputError: { borderColor: '#D93045' },
  error: { color: '#D93045', fontSize: 12, marginTop: 5 },
});
