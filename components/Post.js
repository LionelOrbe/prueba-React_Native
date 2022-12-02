import React, {useState, useEffect} from 'react' 
import { Text, View, StyleSheet, Image} from 'react-native';

export default function Post({ route }) {
    const {img, title, body} = route.params
    
  return (
        <View style={styles.container}>
            <Image source={{uri: img}}  resizeMode='contain' style={styles.image}/>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{body}</Text>
        </View>
  )
}

const styles = StyleSheet.create({
    container: {
    marginTop: 220,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#444444',
    padding: 20,
    paddingBottom:5,
    borderRadius: 5,
    },
    text:{
        padding:10,
        color: '#171717',
        backgroundColor: '#EDEDED',
        borderRadius: 5,
        marginBottom: 5,
        textAlign: 'center',
    },
    title:{
        textTransform: "capitalize",
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 15,
        color: '#EDEDED',
        textAlign: 'center',
    },
    image:{
      marginTop: -200,
      width: 350, 
      height: 350, 
      borderRadius: 10,    
    },

});