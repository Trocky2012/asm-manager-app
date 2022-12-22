import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Modal, Dimensions} from 'react-native';

import productApi from '../PostServices/productApi';

class Tasks extends Component{

constructor(props){
    super(props);
    this.state = {
        tasksOfThePost: [],
        details:false,
        specificPostModal:false,
        loadMyPosts:false,
        isDeleted:false
    };
    }

    setOpenCloseTask(){
      this.setState({details: !this.state.details});
    }

    // -------------------------------------------------------------------

    fcnAskToDelete(productId, feedId, quantity){
      Alert.alert(
        'DELETE',
        'Are you sure you want to delete this ingredient/feedstock?',
        [
          { text: 'OK', onPress: () => this.deleteFeedstock(productId, feedId, quantity) },
          { text: 'Cancel' },
        ],
        {cancelable: false},
      );
    }

    async deleteFeedstock(productId, feedId, quantity){
      this.setState({loadMyPosts: true});
      try{
        const end_point = 'product/'+(productId).toString()+'/delete-one-feed';

        const newData = 
        {
          "id": (feedId).toString(),
          "transient_quantity": (parseFloat(quantity).toFixed(2)).toString()
        };
        //Create a Purchase:
        // const apiResponse = 
        await productApi.put(end_point, newData);
        // const data = await apiResponse.data;
        this.setState({isDeleted:true, loadMyPosts: false});
      }catch(error) {
        this.setState({loadMyPosts: false});
        Alert.alert(
          'Sorry,',
          'We could not complete the request.\n\nPrease, try again soon.\n\nError to delete -Feedstock.',
          [{ text: 'OK'}],
          {cancelable: false},
          );
          console.log('ERROR: ' + error);
      }
      
    }
    // -------------------------------------------------------------------

    render(){
        const { id, feedstock, quantity} = this.props.data;
        const productId = this.props.productId;
          if(this.state.isDeleted){
            return(
              <View></View>
            )
          }else{
            return(
              <View style={styles.card}>
                  {!this.state.details ? 
                  <View style={{borderBottomWidth:0.5,borderColor:'#Cf853F', marginBottom:8, flexDirection:'row', 
                  justifyContent:'space-between', alignItems:'center'}}>
                      <Text style={styles.titulo}>{feedstock.name}</Text>
                      <Text style={{backgroundColor:'#FFF', color:'#09A6FF', fontWeight:'700', borderRadius:20, 
                                    fontSize:14, padding:10, marginRight:18, marginBottom:-10}} onPress={()=>this.setOpenCloseTask()}> 
                                    Details
                      </Text>
                  </View>
                
                :
                <View>
                  <View style={{borderBottomWidth:0.5,borderColor:'#Cf853F', marginBottom:8, flexDirection:'row', 
                  justifyContent:'space-between', alignItems:'center'}}>
                      <Text style={styles.titulo}>{feedstock.name}</Text>
                      <Text style={{backgroundColor:'#FFF', color:'#09A6FF', fontWeight:'700', borderRadius:20, 
                                    fontSize:14, padding:10, marginRight:18, marginBottom:-10}} onPress={()=>this.setOpenCloseTask()}> 
                                    Details
                      </Text>
                  </View>

                  <View style={{flex:1}}>
                      {/* <View style={{borderBottomWidth:0.5,borderColor:'#dfcf97', marginBottom:8, paddingBottom:10, flexDirection:'row', 
                                    justifyContent:'space-between', alignItems:'center'}}> */}
                          <Text style={{fontSize: 12, padding: 8, marginTop:0}}>- Quantity: {quantity} {feedstock.unity}</Text>
                      {/* </View> */}
                      {/* <View style={{borderBottomWidth:0.5,borderColor:'#Cf853F', marginBottom:8, paddingBottom:10, flexDirection:'row', 
                                    justifyContent:'space-between', alignItems:'center'}}> */}
                          <Text style={styles.texto}>- Price / {feedstock.unity}: $ {feedstock.price} </Text>
                          <Text style={styles.texto}>- In stock: {feedstock.quantity} {feedstock.unity}</Text>
                          <View style={{alignItems:'flex-end',justifyContent:'space-between', flexDirection:'row', width:Dimensions.get("screen").width, paddingRight:30, marginBottom:2}}>
                            <Text style={styles.texto}>- {feedstock.feedCategory}</Text>
                            <TouchableOpacity onPress={()=>this.fcnAskToDelete(productId,feedstock.id, quantity)} 
                                  style={{borderWidth:2, alignItems:'center',
                                  justifyContent:'center',backgroundColor:'#FF2f28',borderColor:'#FF3f88', borderRadius:23, marginRight:10}} >
                              <Text style={{padding:4, marginTop:-1.5,marginLeft:0, fontSize:13, color:'#FFafdf'}}>{'Delete'}</Text>
                            </TouchableOpacity>
                          </View>

                      {/* </View> */}
                  </View>


                  <Modal animationType='fade' transparent={true} visible={this.state.loadMyPosts} style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                          <ActivityIndicator color="#CD853F" size={35}/>
                          <Text style={{color:'#DEB887', fontSize:8}}>wait</Text>
                        </View>
                  </Modal>

                </View>
                }
              </View>
            )
          }
    }

}

const styles = StyleSheet.create({
    card:{
      width:Dimensions.get("screen").width,
      shadowColor: '#000',
      backgroundColor: '#efefef',
      shadowOffset: {width:0, height: 1},
      shadowOpacity: 0.8,
      marginBottom: 12,
      shadowRadius: 6,
      borderRadius: 40,
      elevation: 4,
      padding:10
    },
    specificPostModal:{
      flex:1,
      width:Dimensions.get("screen").width,
      backgroundColor:'#efefef',
      justifyContent:'center',
      alignItems:'center'
    },
    titulo:{
      width: 240,
      fontSize: 17,
      marginLeft:5,
      padding: 5
    },
    texto:{
      fontSize: 12,
      padding: 5,
    },
    capa:{
      height: 250,
      zIndex: 2,
    },
    Areabotao:{
      alignItems: 'flex-end',
      marginTop: -40,
      zIndex: 9
    },
    botao:{
      width: 100,
      backgroundColor: '#09A6FF',
      opacity: 1,
      padding: 10,
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
  
    },
    botaoVoltarALista:{
      width:200,
      borderWidth:1,
      borderColor:'#6495ED',
      marginTop:60,
      padding: 0,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center'
  
    },
    botaoTexto:{
      textAlign: 'center',
      color: '#FFF'
    }
  });

export default Tasks;