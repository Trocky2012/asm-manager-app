import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Modal, Dimensions, ScrollView, Alert} from 'react-native';

import { format } from "date-fns";

import api from './Services/api';
import Tasks from './Tasks';


class Products extends Component{

  constructor(props){
    super(props);
    this.state = {
      specificPost: [],
      tasksOfThePost: [],
      specificPostModal:false,
      openEditModal:false,
      loadMyPosts: false,
      closeTaskBool: false,
      isDeleted:false,

    };

  }




  async fcnSpecificPost(postId, visibility){

    this.setState({loadMyPosts: true});
    if(visibility){
      try{
          const getPost = 'sale/'+postId.toString();
          const response = await api.get(getPost);
          this.setState({
            specificPost: response.data,
            loading: false
          });
          this.setState({specificPostModal:visibility})

      }catch(error) {
        this.setState({specificPostModal:false})
        Alert.alert(
          'Sorry,',
          'We could not coplete the request.\n\nIt will be fixed soon.',
          [{ text: 'OK'}],
          {cancelable: false},
        );
        console.log('ERROR: ' + error);
      }
      
    }else{
      this.setState({specificPostModal:visibility})
    }
    this.setState({loadMyPosts: false});
    
  }



// -------------------------------------------------------------------

fcnAskToDelete(id){
  Alert.alert(
    'DELETE',
    'Are you sure you want to delete this purchase?',
    [
      { text: 'OK', onPress: () => this.deletePurchase(id) },
      { text: 'Cancel' },
    ],
    {cancelable: false},
  );
}

async deletePurchase(id){
  this.setState({loadMyPosts: true});

  try{
    await api.delete('sale/'+(id).toString()+'/m$s*a');
    this.setState({isDeleted: true, loadMyPosts: false});
  }catch(error) {
    this.setState({loadMyPosts: false});
    Alert.alert(
      'Sorry,',
      'We could not complete the request.\n\nPrease, try again soon.\n\nError to delete -Sale.',
      [{ text: 'OK'}],
      {cancelable: false},
      );
      console.log('ERROR: ' + error);
  }
  
}
// -------------------------------------------------------------------



   
  render(){

    const { id, price, update_time, insert_time, products } = this.props.data;
    if(this.state.loading){
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
          <ActivityIndicator color="#09A6FF" size={40}/>
        </View>
      )
    }else{
      return(
        <ScrollView>

        {this.state.isDeleted ? 
          
          <View></View>
            
        :

            <View style={styles.card}>

              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <View style={styles.botaoCreatedByUser} >
                    <Text style={styles.botaoTextoCreatedByUser}>Ref: {id}</Text>
                </View>
                <Text style={{backgroundColor:'#FF4347',color:'#FFafdf', borderBottomLeftRadius:20, fontSize:9, padding:2, paddingTop:5, paddingLeft:4}}
                                onPress={()=>this.fcnAskToDelete(id)}> X </Text>
              </View>
                
                
              <View style={{borderBottomWidth:0.5,borderColor:'#CD853F', marginBottom:10, flexDirection:'row', paddingRight:10,paddingLeft:2, 
                    justifyContent:'space-between', alignItems:'center'}}>
                <Text style={styles.titulo}>{insert_time == null? "-" : format(new Date(insert_time), "MMMM do, yyyy - H:mma")}</Text>
                    <Text style={{backgroundColor:'#32CD32', color:'#FFF', borderRadius:20, fontSize:15, padding:5}}>   $ {parseFloat(price).toFixed(2)}   </Text>
                  
              </View>
            

              <FlatList
                data={this.state.specificPost.products}
                keyExtractor={item => item.product.id.toString() }
                renderItem={ ({item}) => <Tasks data={item} /> }

              />

                <Text style={styles.texto}>Update: {update_time == null? "-" : format(new Date(update_time), "MMMM do, yyyy - H:mma")}</Text>

                <View style={styles.Areabotao}>
                  <TouchableOpacity style={styles.botao} onPress={()=>this.fcnSpecificPost(id,true)} >
                    <Text style={styles.botaoTexto}>INFO</Text>
                  </TouchableOpacity>
                </View>

            </View>

        }



 {/* ------------------------------------------------------------------------------------------------------------------------------- */}




          <Modal animationType='fade' transparent={true} visible={this.state.loadMyPosts} style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{marginTop:200, alignSelf:'center', width:100, height:100, backgroundColor:'#FFf', borderWidth:1, borderColor:'#CD853F', borderRadius:40}}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                  <ActivityIndicator color="#CD853F" size={30}/>
                  <Text style={{color:'#CD853F', fontSize:7}}>wait</Text>
                </View>
              </View>
          </Modal>




 {/* ------------------------------------------------------------------------------------------------------------------------------- */}


        </ScrollView>

      )
    };
  }
}

const styles = StyleSheet.create({
  card:{
    shadowColor: '#000',
    backgroundColor: '#FFF',
    shadowOffset: {width:0, height: 1},
    shadowOpacity: 0.8,
    margin: 15,
    shadowRadius: 6,
    borderRadius: 5,
    elevation: 4,
  },
  specificPostModal:{
    flex:1,
    backgroundColor:'#FFF',
    justifyContent:'flex-start',
    alignItems:'flex-start'
  },
  titulo:{
    width:240,
    fontSize: 18,
    padding: 10
  },
  texto:{
    fontSize: 12,
    padding: 10,
    width:Dimensions.get("screen").width/1.5
  },
  Areabotao:{
    alignItems: 'flex-end',
    marginTop: -35,
    zIndex: 9
  },
  botao:{
    width: 60,
    backgroundColor: '#bbb',
    opacity: 1,
    padding: 10,
    paddingLeft:15,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 5,

  },
  
  botaoTexto:{
    textAlign: 'center',
    color: '#FFF',
    fontSize:12
  },
  botaoCreatedByUser:{
    width: Dimensions.get("screen").width/2.2,
    backgroundColor: '#a6d47f',
    opacity: 1,
    padding: 5,
    borderRadius: 5,
    borderBottomRightRadius: 30,
    justifyContent:'flex-start'
  },
  botaoTextoCreatedByUser:{
    textAlign: 'left',
    color: '#FFF',
    fontSize:11
  }
});

export default Products;