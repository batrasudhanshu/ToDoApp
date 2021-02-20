
import React, { Component } from 'react';
import {  StyleSheet, Text, View } from 'react-native';
import {Appbar, TextInput, IconButton,Card, List} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default class App extends Component{
  arr=[];
  id=0;
  state={
    text:'',
    list:[
      {id:1,data:"loading"}
    ]
  };

  storeData = async ()=>{
    this.arr.push({id:this.id,data:this.state.text})
    this.id ++;
    await AsyncStorage.setItem("myList",JSON.stringify(this.arr))
    this.setState({
      list:JSON.parse(await AsyncStorage.getItem("myList"))
    })
    
  }
  async componentDidMount(){
    this.setState({
      list:JSON.parse(await AsyncStorage.getItem("myList")) ||""
    })
    this.arr=JSON.parse(await AsyncStorage.getItem("myList")) || ""
    this.id=this.arr[this.arr.length-1].id +1
    // console.log(this.state)
  }
  deleteData= async(key)=>{
    // console.log({key})
    var array = this.state.list;
    var pos=array.indexOf(key);
    // console.log(pos);
    array.splice(pos,1)
    this.setState({list:array})
    this.arr=array
    await AsyncStorage.setItem("myList",JSON.stringify(this.arr))
    this.setState({
      list:JSON.parse(await AsyncStorage.getItem("myList"))
    })
    

  }
  render(){
    if(this.state.list.length > 0){
      renderList =  this.state.list.map(item=>{
        return (
        <Card key={item.id} style={{margin:10}}>
          <List.Item
            title={item.data}
            right={(key)=><IconButton  onPress={()=>{this.deleteData(item)}} icon="delete"/> }
          />
        </Card>
        )
      })
    }
    else{
      renderList = <Text>Nothing to Do</Text>
    }
  return (

    
    <View style={styles.container}>
      <Appbar.Header>
      
      <Appbar.Content title="Things To Do"  style={{alignItems:"center"}} />
      
    </Appbar.Header>
    <View style={{alignItems:"center"}}>
    <TextInput
      label="Add Item"
      value={this.state.text}
      onChangeText={text=>this.setState({text})}
      style={{width:"95%", alignContent:"center",marginTop:30,borderRadius:25}}
    />
    </View>
    <View style={{alignItems:"center"}}>
    <IconButton
    icon="plus"
    color="black"
    size={40}  
    onPress={this.storeData}
  />
  </View>
  <View>
    {renderList}
  </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignContent:"center"

  },
});
