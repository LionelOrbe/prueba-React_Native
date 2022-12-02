import React, {useState, useEffect} from 'react'
import { Text, View, Button, ActivityIndicator, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Posts({ route }) {

    
    const id = route.params.id
    const [posts, setPosts] = useState([]);
    const [photos, setPhotos] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getData();
                   }, [id]);

    useEffect(() => {
        loadUsers();
             }, [photos, posts, isLoading]);

    function getData(){
    setLoading(true)
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(response => setPosts([...response.data]))
        .catch(error => console.error(error))
        .finally(() => {setLoading(false)});

    setLoading(true)
    axios.get(`https://jsonplaceholder.typicode.com/photos`)
        .then(response => setPhotos([...response.data.filter(item=> item.albumId=== id)]))
        .catch(error => console.error(error))
        .finally(() => {setLoading(false)});

        

        }

function loadUsers(){

    
        let user = []
        for(let i=0; i<posts.length; i++){
            user.push({id: posts[i]?.id, thu: `${photos[i]?.thumbnailUrl}`, title: posts[i]?.title, img: `${photos[i]?.url}`, body: posts[i].body})
        }
        setUsers(user)
            
}

const renderItem = ({ item }) => (
  
    <TouchableOpacity onPress={() => navigation.navigate('Post', {img: item.img, body: item.body, title: item.title})}>
        <View style={styles.container}>
            <Image source={{uri: item.thu}}  resizeMode='contain' style={styles.image}/>
            <Text style={styles.text}>{item.title}</Text>
        </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView>
      {isLoading 
        ? <ActivityIndicator size="large" color="#DA0037" style={{marginTop: 100}}/>
        : 
        
        <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={({ id }) => id.toString()}
        />             
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#444444',
      alignItems: 'center',
      flexDirection: "row",
    //   borderWidth: 1,
      padding: 5,
      margin: 5,
      marginLeft: 15,
      marginRight: 15,
      borderRadius: 5,
    //   borderColor: '#DA0037',
    },    
    image:{
        width: 100, 
        height: 100, 
        marginLeft: 15,
        borderRadius: 5
      },
      text:{
        width: 230,
        fontSize: 15,
        marginLeft: 10,
        color: '#EDEDED',
        fontWeight: 'bold',
        textTransform: "capitalize",
    },
});