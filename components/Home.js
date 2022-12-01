import React, {useState, useEffect} from 'react';
import { Text, View, Button, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Searchbar } from 'react-native-paper';



export default function Home() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState('');

 

   useEffect(() => {
    getData();
               }, []);
  function searchCharacter() {
    if(search) {
     
    setUser(data.filter(user=> data.includes(user.email)))
     
        
    }
    else {
       
        
    }
  }

  function getData(){
    setLoading(true)
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(response => setData(response.data))
      .catch(error => console.error(error))
      .finally(() => {setLoading(false)});
  }
 
   console.log('Data', data)
  return (
    <View style={{backgroundColor: '#171717', flex: 1}}>
      {isLoading 
        ? <ActivityIndicator size="large" color="#DA0037" style={{marginTop: 100}}/>
        : 
                 
         
                <View style={{
                  width: '100%',
                  flexDirection:'column', 
                  justifyContent: 'space-evenly',
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
                    <Text style={{color: 'white'}}>{user.name}</Text>
                    <Text style={{color: 'white'}}>{user.email}</Text>
                    <TouchableOpacity onPress={() => null }>
                        <Button title="Ingresar"  color="red"/>
                    </TouchableOpacity>
                </View>              
      }
    
    </View>
  );
}

