import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Blogs = () => {
  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>Blog Coming Soon</Text>
      <Text style={styles.subtitle}>Stay tuned for our latest articles and updates!</Text>
      {/* You can add more information or a countdown timer here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Set your desired background color
  },
  image: {
    width: 200, // Adjust the width to fit your image
    height: 200, // Adjust the height to fit your image
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
  },
});

export default Blogs;
