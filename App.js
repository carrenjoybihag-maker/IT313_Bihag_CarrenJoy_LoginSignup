import React, { useState, useRef } from 'react';
import {
  Alert, FlatList, Keyboard, KeyboardAvoidingView, Platform,
  Pressable, ScrollView, StyleSheet, Text, TextInput, View
} from 'react-native';
import FormField from './components/FormField';

const seedUsers = [
  {
    id: 'u1',
    name: 'Ana Reyes',
    email: 'ana.reyes@ustp.edu.ph',
    studentId: '2023001234',
    password: 'Password123',
  },
];

const ItemSeparator = () => <View style={styles.separator} />;

function LoginScreen({ onLogin, onGoSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const passwordRef = useRef(null);

  const submit = () => {
    Keyboard.dismiss();
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = 'Email is required.';
    else if (!email.includes('@')) nextErrors.email = 'Email must contain "@".';
    if (!password) nextErrors.password = 'Password is required.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onLogin(email.trim(), password);
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <View style={styles.brandCircle}><Text style={styles.brandMark}>CC</Text></View>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your Campus Connect account</Text>
        <View style={styles.form}>
          <FormField
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <View style={styles.passwordWrap}>
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              returnKeyType="done"
              inputRef={passwordRef}
              onSubmitEditing={submit}
            />
            <Pressable onPress={() => setShowPassword(v => !v)} style={styles.showButton}>
              <Text style={styles.showText}>{showPassword ? 'Hide' : 'Show'}</Text>
            </Pressable>
          </View>
          <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={submit}>
            <Text style={styles.primaryButtonText}>Log In</Text>
          </Pressable>
          <View style={styles.linkRow}>
            <Text style={styles.normalText}>Don't have an account? </Text>
            <Pressable onPress={onGoSignup}><Text style={styles.link}>Sign Up</Text></Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function SignupScreen({ onSignup, onGoLogin }) {
  const [fields, setFields] = useState({
    name: '', email: '', studentId: '', password: '', confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const updateField = (field, value) => setFields(previous => ({ ...previous, [field]: value }));

  const submit = () => {
    Keyboard.dismiss();
    const nextErrors = {};
    const name = fields.name.trim();
    const email = fields.email.trim();
    if (!name) nextErrors.name = 'Full name is required.';
    if (!email) nextErrors.email = 'Email is required.';
    else if (!email.includes('@')) nextErrors.email = 'Email must contain "@".';
    if (!fields.studentId) nextErrors.studentId = 'Student ID is required.';
    else if (!/^\d{7,10}$/.test(fields.studentId)) nextErrors.studentId = 'Student ID must contain 7 to 10 digits.';
    if (!fields.password) nextErrors.password = 'Password is required.';
    else if (fields.password.length < 8) nextErrors.password = 'Password must be at least 8 characters.';
    if (!fields.confirmPassword) nextErrors.confirmPassword = 'Please confirm your password.';
    else if (fields.confirmPassword !== fields.password) nextErrors.confirmPassword = 'Passwords do not match.';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSignup({ name, email, studentId: fields.studentId, password: fields.password });
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.screen} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join IT313 Campus Connect</Text>
        <View style={styles.form}>
          <FormField label="Full Name" value={fields.name} onChangeText={v => updateField('name', v)}
            error={errors.name} placeholder="Enter your full name" autoCapitalize="words" />
          <FormField label="Email Address" value={fields.email} onChangeText={v => updateField('email', v)}
            error={errors.email} placeholder="Enter your email" keyboardType="email-address" autoCapitalize="none" />
          <FormField label="Student ID" value={fields.studentId} onChangeText={v => updateField('studentId', v)}
            error={errors.studentId} placeholder="Enter your student ID" keyboardType="numeric" />
          <FormField label="Password" value={fields.password} onChangeText={v => updateField('password', v)}
            error={errors.password} placeholder="At least 8 characters" secureTextEntry autoCapitalize="none" />
          <FormField label="Confirm Password" value={fields.confirmPassword}
            onChangeText={v => updateField('confirmPassword', v)} error={errors.confirmPassword}
            placeholder="Re-enter your password" secureTextEntry autoCapitalize="none" />
          <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]} onPress={submit}>
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </Pressable>
          <View style={styles.linkRow}>
            <Text style={styles.normalText}>Already have an account? </Text>
            <Pressable onPress={onGoLogin}><Text style={styles.link}>Log In</Text></Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ProfileScreen({ user, onUpdateName, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [nameError, setNameError] = useState('');

  const saveName = () => {
    const cleanName = name.trim();
    if (!cleanName) {
      setNameError('Full name is required.');
      return;
    }
    onUpdateName(cleanName);
    setEditing(false);
    setNameError('');
  };

  const details = [
    { id: 'name', label: 'Full Name', value: user.name },
    { id: 'email', label: 'Email', value: user.email },
    { id: 'studentId', label: 'Student ID', value: user.studentId },
  ];

  const renderDetail = ({ item }) => (
    <View style={styles.detailRow}>
      <Text style={styles.detailLabel}>{item.label}</Text>
      {item.id === 'name' && editing ? (
        <View style={styles.editArea}>
          <TextInput value={name} onChangeText={v => { setName(v); setNameError(''); }}
            style={styles.editInput} autoCapitalize="words" placeholder="Full name" />
          {!!nameError && <Text style={styles.errorText}>{nameError}</Text>}
          <View style={styles.editButtons}>
            <Pressable style={styles.smallPrimary} onPress={saveName}><Text style={styles.smallButtonText}>Save</Text></Pressable>
            <Pressable style={styles.cancelButton} onPress={() => { setName(user.name); setEditing(false); setNameError(''); }}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      ) : <Text style={styles.detailValue}>{item.value}</Text>}
    </View>
  );

  const initials = user.name.trim().split(/\s+/).slice(0, 2).map(part => part[0]?.toUpperCase()).join('');

  return (
    <View style={styles.profileScreen}>
      <FlatList
        data={details}
        keyExtractor={item => item.id}
        renderItem={renderDetail}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <View style={styles.profileHeader}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{initials || '?'}</Text></View>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileCaption}>IT313 Campus Connect</Text>
          </View>
        }
        contentContainerStyle={styles.profileContent}
      />
      {!editing && (
        <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
          onPress={() => { setName(user.name); setEditing(true); }}>
          <Text style={styles.secondaryButtonText}>Edit Profile</Text>
        </Pressable>
      )}
      <Pressable style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}
        onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Log Out', style: 'destructive', onPress: onLogout },
        ])}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const [users, setUsers] = useState(seedUsers);
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState('login');

  const handleLogin = (email, password) => {
    const matchedUser = users.find(user =>
      user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
    if (!matchedUser) {
      Alert.alert('Login Failed', 'Invalid email or password.');
      return;
    }
    setCurrentUser(matchedUser);
    setScreen('profile');
  };

  const handleSignup = newUser => {
    const duplicateEmail = users.some(user => user.email.toLowerCase() === newUser.email.toLowerCase());
    if (duplicateEmail) {
      Alert.alert('Sign Up Failed', 'This email is already registered.');
      return;
    }
    const createdUser = { ...newUser, id: `u${Date.now()}` };
    setUsers(previousUsers => [...previousUsers, createdUser]);
    setCurrentUser(createdUser);
    setScreen('profile');
  };

  const handleUpdateName = updatedName => {
    const updatedUser = { ...currentUser, name: updatedName };
    setUsers(previousUsers => previousUsers.map(user =>
      user.id === currentUser.id ? updatedUser : user
    ));
    setCurrentUser(updatedUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setScreen('login');
  };

  if (screen === 'signup') return <SignupScreen onSignup={handleSignup} onGoLogin={() => setScreen('login')} />;
  if (screen === 'profile' && currentUser) {
    return <ProfileScreen user={currentUser} onUpdateName={handleUpdateName} onLogout={handleLogout} />;
  }
  return <LoginScreen onLogin={handleLogin} onGoSignup={() => setScreen('signup')} />;
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#F5F6FB' },
  screen: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 36 },
  brandCircle: { alignSelf: 'center', width: 76, height: 76, borderRadius: 38, backgroundColor: '#5B4BDB', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  brandMark: { color: '#FFFFFF', fontSize: 25, fontWeight: '800' },
  title: { color: '#20213A', fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 8 },
  subtitle: { color: '#77798C', fontSize: 14, textAlign: 'center', marginBottom: 30 },
  form: { width: '100%', maxWidth: 480, alignSelf: 'center' },
  passwordWrap: { position: 'relative' },
  showButton: { position: 'absolute', right: 13, top: 42, padding: 8, zIndex: 2 },
  showText: { color: '#5B4BDB', fontWeight: '700' },
  primaryButton: { backgroundColor: '#5B4BDB', borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 12 },
  primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  linkRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 22, flexWrap: 'wrap' },
  normalText: { color: '#77798C' },
  link: { color: '#5B4BDB', fontWeight: '700' },
  errorText: { color: '#D93045', fontSize: 12, marginTop: 5 },
  profileScreen: { flex: 1, backgroundColor: '#F5F6FB', paddingHorizontal: 22, paddingBottom: 28 },
  profileContent: { paddingTop: 45, paddingBottom: 20 },
  profileHeader: { alignItems: 'center', marginBottom: 28 },
  avatar: { width: 94, height: 94, borderRadius: 47, backgroundColor: '#5B4BDB', alignItems: 'center', justifyContent: 'center', marginBottom: 15 },
  avatarText: { color: '#FFFFFF', fontSize: 30, fontWeight: '800' },
  profileName: { color: '#20213A', fontSize: 23, fontWeight: '800' },
  profileCaption: { color: '#77798C', marginTop: 5 },
  detailRow: { backgroundColor: '#FFFFFF', padding: 17, borderRadius: 12, marginVertical: 5 },
  detailLabel: { color: '#77798C', fontSize: 12, marginBottom: 6 },
  detailValue: { color: '#20213A', fontSize: 15, fontWeight: '600' },
  separator: { height: 2 },
  secondaryButton: { backgroundColor: '#FFFFFF', borderColor: '#5B4BDB', borderWidth: 1.5, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 8 },
  secondaryButtonText: { color: '#5B4BDB', fontWeight: '700', fontSize: 15 },
  logoutButton: { backgroundColor: '#FCEBED', borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  logoutText: { color: '#C6283D', fontWeight: '700', fontSize: 15 },
  editArea: { marginTop: 2 },
  editInput: { borderWidth: 1, borderColor: '#D8D9E5', borderRadius: 9, paddingHorizontal: 12, paddingVertical: 10, color: '#20213A' },
  editButtons: { flexDirection: 'row', marginTop: 10, gap: 9 },
  smallPrimary: { backgroundColor: '#5B4BDB', borderRadius: 8, paddingVertical: 9, paddingHorizontal: 20 },
  smallButtonText: { color: '#FFFFFF', fontWeight: '700' },
  cancelButton: { backgroundColor: '#ECECF3', borderRadius: 8, paddingVertical: 9, paddingHorizontal: 20 },
  cancelText: { color: '#45465B', fontWeight: '700' },
});
