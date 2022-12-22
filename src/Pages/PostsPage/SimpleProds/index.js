import React, {Component} from 'react';
import {View, Text, StyleSheet,TouchableOpacity, ActivityIndicator, Modal, Dimensions, Alert, Keyboard, ScrollView, TextInput} from 'react-native';

import api from './Services/api';


class SimpleProds extends Component{

  constructor(props){
    super(props);
    this.state = {
      showAll:true,
      specificPostModal:false,
      showSetQtdAndSend:false,
      openEditModal:false,
      loading: false,
      modalToFinishsubTask: false,
      addQuantity:0

    };
    this.setAddQuantity = this.setAddQuantity.bind(this);
  }
  setAddQuantity(text){    this.setState({addQuantity: text});  }


  async addFeedsToNewPurchase(id, transient_quantity, actionId, action){
    if(transient_quantity > 0){
      this.setState({loading: true});
      try{
        
        var newData = []
        newData.push(
        {
          "id": id.toString(),
	        "transient_quantity": transient_quantity
        });
        
        // const apiResponse = 
        await api.put('sale/'+actionId+'/add-prods',newData);
        //const data = await apiResponse.data;
        this.setState({loading: false, showAll:false});
  
      }catch{
        this.setState({loading: false});
        Alert.alert(
          'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to add -newFeedToSale',
          [{ text: 'OK'}],
          {cancelable: false},
        );
        
      console.log('ERROR: ' + error);
      }
    }else{
      alert('Set a valid quantity, please');
    }
  }



   
  render(){

    const { id, name, price} = this.props.data;
    const actionId = this.props.actionId;
    const action = this.props.action;
    if(this.state.loading){
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
          <ActivityIndicator color="#09A6FF" size={40}/>
        </View>
      )
    }else{
      return(
        <ScrollView>

          
         {/* MAIN SCREEN - LIST OS PRODUCT*/}
          <View style={styles.card}>
              <View style={styles.AreaCreatedByUser}>
                <View style={styles.botaoCreatedByUser} >
                  <Text style={styles.botaoTextoCreatedByUser}>Ref: {id}/{name}</Text>
                </View>
                <Text style={{fontSize:13, paddingTop:5,paddingRight:12, paddingLeft:7,color:'#6495ED'}}>Stock: </Text>
              </View>
          <View style={{borderBottomWidth:0.5,borderColor:'#BBB', marginBottom:10, flexDirection:'row', paddingRight:5,
                justifyContent:'space-between', alignItems:'center'}}>
            <Text style={styles.titulo}>{name}</Text>
            <Text style={{color:'#6495ED', borderRadius:20, fontSize:14, padding:6, paddingRight:10, paddingLeft:10}}>                     -                 </Text>
            
          </View>
          {this.state.showAll ? 
          <View>
              <View style={{marginBottom:0, marginTop:5, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', 
                            paddingLeft:3, paddingBottom:5}}>
                  <Text style={{fontSize:13, padding:10, paddingLeft:7}}>- Price: </Text>
                  <Text style={{borderWidth:0.5, backgroundColor:'#fff', color:'#2F6F4F',  borderRadius:20, borderColor:'#2F6F4F', fontSize:14, paddingTop:6, paddingBottom:6}}>  $ {parseFloat(price).toFixed(2)} </Text>
                  
              </View>

                <View style={styles.Areabotao}>
                  <TouchableOpacity style={styles.botao} onPress={()=>this.setState({showSetQtdAndSend: !this.state.showSetQtdAndSend})} >
                    <Text style={styles.botaoTexto}>SET</Text>
                  </TouchableOpacity>
                </View>

                {this.state.showSetQtdAndSend ? 
                  <View style={{flexDirection:'row', marginTop:10, paddingTop:10, borderTopWidth:0.5, borderTopColor:'#2F6F4F', justifyContent:'center', 
                                alignItems:'center', backgroundColor:'#FFf', borderRadius:40}}>

                      <View style={{flex:1, flexDirection:'row', padding:10, justifyContent:'center', 
                                       alignItems:'center', backgroundColor:'#FFf', borderRadius:40}}>
                          {this.state.addQuantity > 0?
                              <TouchableOpacity style={styles.botao3} onPress={()=>this.setState({addQuantity: this.state.addQuantity-1})} >
                                <Text style={{ textAlign: 'center',  color: '#FFF', fontSize:24, marginTop:-5}}> - </Text>
                              </TouchableOpacity>
                            :
                              <TouchableOpacity style={styles.botao3} >
                                <Text style={{ textAlign: 'center',  color: '#FFF', fontSize:24, marginTop:-5}}> - </Text>
                              </TouchableOpacity>
                          }
                            <Text style={{borderWidth:0.5, backgroundColor:'#fff', color:'#2F6F4F',  borderRadius:20, borderColor:'#2F6F4F', 
                            fontSize:18, padding:6,paddingLeft:11,paddingRight:10, marginRight:15, marginLeft:15}}> {this.state.addQuantity} </Text>

                            <TouchableOpacity style={styles.botao3} onPress={()=>this.setState({addQuantity: this.state.addQuantity+1})} >
                              <Text style={{ textAlign: 'center',  color: '#FFF', fontSize:24, marginTop:-5}}> + </Text>
                            </TouchableOpacity>
                        
                      </View>

                      <TouchableOpacity style={styles.botao2} onPress={()=>this.addFeedsToNewPurchase(id,(this.state.addQuantity),actionId, action)} >
                        <Text style={styles.botaoTexto}>ADD</Text>
                      </TouchableOpacity>
                  </View>
                  :<View></View>
                }

            </View>
        : <View>
            <Text style={{borderWidth:0.5, alignSelf:'center', backgroundColor:'#fff', color:'#32CD32',  borderRadius:20, borderColor:'#32CD32', fontSize:12, fontWeight:'700', padding:2}}>  IT'S BEEN ADDED WITH SUCCESS !  </Text>
                  
          </View>
        }

            
          </View>




{/* ------------------------------------------------------------------------------------------------------------------------------- */}




          <Modal animationType='fade' transparent={true} visible={this.state.loading} style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{marginTop:200, alignSelf:'center', width:100, height:100, backgroundColor:'#FFf', borderWidth:1, borderColor:'#09A6FF', borderRadius:40}}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                  <ActivityIndicator color="#09A6FF" size={30}/>
                  <Text style={{color:'#09A6FF', fontSize:7}}>wait</Text>
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
    marginTop: -40,
    zIndex: 9
  },
  botao:{
    width: 55,
    backgroundColor: '#2F6F4F',
    opacity: 1,
    padding: 12,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 5,

  },
  botao2:{
    width: 80,
    backgroundColor: '#32CD32',
    opacity: 1,
    padding: 14,
    borderTopLeftRadius:30,
    borderBottomRightRadius:30
  },
  botao3:{
    width: 60,
    height:40,
    backgroundColor: '#2F6F4F',
    opacity: 1,
    padding: 5,
    borderRadius:30
  },
  botaoVoltarALista:{
    width:160,
    borderWidth:2,
    borderColor:'#FF2f28',
    marginTop:60,
    padding: 0,
    borderRadius:5,
    borderTopLeftRadius:40,
    borderBottomLeftRadius:40,
    alignItems:'center',
    justifyContent:'center'

  },
  botaoSave:{
    width:160,
    borderWidth:2,
    borderColor:'#2F6F4F',
    marginTop:60,
    padding: 0,
    borderRadius:5,
    borderTopRightRadius:40,
    borderBottomRightRadius:40,
    alignItems:'center',
    justifyContent:'center'

  },
  
  botaoTexto:{
    textAlign: 'center',
    color: '#FFF',
    fontSize:11
  },
  inputsMyTasks:{
    width:350,
    height:45,
    borderWidth:1,
    borderColor:'#000',
    backgroundColor:'#FFF',
    color:'#6495ED',
    borderRadius:10,
    margin:10,
    fontSize:15,
    padding:10
  },
  inputsMyTasksSmaller:{
    width:'60%',
    height:45,
    borderWidth:1,
    borderColor:'#CD964F',
    backgroundColor:'#FFF',
    color:'#6495ED',
    borderRadius:10,
    borderTopRightRadius:35,
    borderBottomRightRadius:0,
    marginLeft:5,
    fontSize:15,
    padding:10
  },
  AreaCreatedByUser:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'flex-start',
    marginBottom: -2,
    zIndex: -9
  },
  botaoCreatedByUser:{
    width: Dimensions.get("screen").width/2.2,
    backgroundColor: '#CD964F',
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
  },
});

export default SimpleProds;