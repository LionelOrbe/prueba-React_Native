import React, {useState, useEffect} from 'react';
import { Text, View, Button, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import { Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';



export default function Home() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState('');

  const navigation = useNavigation();

   useEffect(() => {
    getData();
               }, []);
  function searchCharacter() {
    if(search) {
        setUser(data.filter(us=> us.email.toString().toLowerCase().includes(search.toLowerCase())))  
    }
    else {
       setUser([])
        
    }
  }

  function handleClick(){
    if(user.length>0) {navigation.navigate('Posts', {id: user[0].id})} 
     
  }

  function getData(){
    setLoading(true)
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(response => setData([...response.data]))
      .catch(error => console.error(error))
      .finally(() => {setLoading(false)});
  }
 
  return (
    <View >
      {isLoading 
        ? <ActivityIndicator size="large" color="#DA0037" style={{marginTop: 100}}/>
        : 
                <View style={{
                  width: '100%',
                  flexDirection:'column', 
                  justifyContent:'space-between',
                  alignItems:'center'
                              }}>
                  <Searchbar
                    style={{borderRadius: 10, margin: 10, width: '85%', marginTop: 20}}
                    placeholder="ingrese email..."
                    onChangeText={value => setSearch(value)}
                    value={search}
                    onIconPress={searchCharacter}
                    onSubmitEditing={searchCharacter}
                  />                      
                    { user.length? <View style={styles.name}>
                        <Text style={{color: 'white'}}>Nombre: {user[0]?.name}</Text>
                        <Text style={{color: 'white'}}>email: {user[0]?.email}</Text>
                    </View> : <Text style={{color: 'white', marginBottom: 10}}>Sin datos</Text>  }  
                    <Button title="Ingresar"  color="red" onPress={handleClick}/>                              
                </View>              
      }
    
    </View>
  );
}



const styles = StyleSheet.create({
    name: {
        backgroundColor: '#444444',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: 'red',
        marginBottom:10,
      },
})