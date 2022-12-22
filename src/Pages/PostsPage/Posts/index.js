import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Modal, Dimensions, ScrollView, Alert, Keyboard} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import productApi from './PostServices/productApi';
import SimpleFeeds from '../SimpleFeeds';
import Tasks from './Tasks';

import { format } from "date-fns";

class Product extends Component{

  constructor(props){
    super(props);
    this.state = {
      specificPost: [],
      feedsToProduct: [],
      specificPostModal:false,
      showAddFeedsToProducts:false,
      changeNameAndPrice:false,
      loadMyProduct: false,
      newProdName:'',
      newProdPrice:''
    };

    this.setNewProdName = this.setNewProdName.bind(this);
    this.setNewProdPrice = this.setNewProdPrice.bind(this);
  }

  setNewProdName(text){this.setState({newProdName: text});  }
  setNewProdPrice(text){this.setState({newProdPrice: text});  }

  async fcnSpecificPost(productId, visibility){
    const getPost = 'product/'+productId.toString();
    const response = await productApi.get(getPost);
    this.setState({
      specificPost: response.data,
      loading: false
    });
    this.setNewProdName(this.state.specificPost.name);
    this.setNewProdPrice(this.state.specificPost.price.toString());

    this.setState({specificPostModal:visibility,showAddFeedsToProducts:false})
  }

// -------------------------------------------------------------------

fcnAskToDelete(id){
  Alert.alert(
    'DELETE',
    'Are you sure you want to delete this product?',
    [
      { text: 'OK', onPress: () => this.deleteProduct(id) },
      { text: 'Cancel' },
    ],
    {cancelable: false},
  );
}

async deleteProduct(id){
  this.setState({loadMyPosts: true});

  try{
    await productApi.delete('product/'+(id).toString()+'/m$s*a');
    this.fcnSpecificPost(id,false);
    this.setState({isDeleted:true, loadMyPosts: false});
  }catch(error) {
    this.setState({loadMyPosts: false});
    Alert.alert(
      'Sorry,',
      'We could not complete the request.\n\nPrease, try again soon.\n\nError to delete -Product.',
      [{ text: 'OK'}],
      {cancelable: false},
      );
      console.log('ERROR: ' + error);
  }
  
}
// -------------------------------------------------------------------

fcnAskToUpdateNameAndPrice(id){
  Alert.alert(
    'UPDATE',
    'Are you sure you want to update this product?',
    [
      { text: 'OK', onPress: () => this.updateProduct(id) },
      { text: 'Cancel' },
    ],
    {cancelable: false},
  );
}

async updateProduct(id){
  this.setState({loadMyPosts: true});
  try{
    const response = await productApi.put('product/'+(id).toString()+'/update-name-and-price?name='+this.state.newProdName+'&price='+this.state.newProdPrice.toString());
    this.setState({
      specificPost: response.data,
      loading: false
    });
    // this.fcnSpecificPost(id,false);
    this.setState({changeNameAndPrice:false, loadMyPosts: false});
  }catch(error) {
    this.setState({loadMyPosts: false});
    Alert.alert(
      'Sorry,',
      'We could not complete the request.\n\nPrease, try again soon.\n\nError to update -Product.',
      [{ text: 'OK'}],
      {cancelable: false},
      );
      console.log('ERROR: ' + error);
  }
  
}
// -------------------------------------------------------------------


async setFeedsToProduct(projectId){
  try{
    this.setState({
      loadMyPosts: true
    });
    const response = await productApi.get('feedstock/by-project-id/'+(projectId).toString());
    this.setState({
      feedsToProduct: response.data,
      showAddFeedsToProducts:true,
      loadMyPosts: false
    });
    
  }catch{
    this.setState({loadMyPosts: false});
    Alert.alert(
      'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to create -setFeedsToProduct',
      [{ text: 'OK'}],
      {cancelable: false},
    );
    console.log('ERROR: ' + error);
  }
}

// -------------------------------------------------------------------



  render(){

  const { id, projectId, name, price, minPrice, update_time } = this.props.data;

  if(this.state.loading){
    return(
      <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
        <ActivityIndicator color="#09A6FF" size={40}/>
      </View>
    )
  }else{
    return(
      <ScrollView>

          <Modal animationType='fade' visible={this.state.specificPostModal}>

            <LinearGradient colors={['#fff','#fff','#efc887']}style={styles.specificPostModal}>

              <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:Dimensions.get("screen").width, 
                            borderBottomWidth:1,borderColor:'#efc887', marginLeft:10, marginTop:10, padding:15, paddingTop:10}}>

                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'flex-start'}}>
                  <TouchableOpacity onPress={()=>this.fcnSpecificPost(id,false)} 
                                  style={{width:46, height:46, borderWidth:1.5, alignItems:'center',
                                  justifyContent:'center',borderColor:'#FF2f28', borderRadius:23, marginRight:10}} >
                    <Text style={{marginTop:-4,marginLeft:-2, fontSize:30, color:'#FF2f28'}}>{'<'}</Text>
                  </TouchableOpacity>


                  <TouchableOpacity onPress={()=>this.setState({changeNameAndPrice:true})}>
                      <Text style={{padding:15, fontSize:20, fontWeight:'600'}}>-  {this.state.specificPost.name}</Text>
                  </TouchableOpacity>

                </View>
                <TouchableOpacity onPress={()=>this.fcnAskToDelete(id)} 
                                style={{width:24, height:24, borderWidth:2, alignItems:'center',
                                justifyContent:'center',backgroundColor:'#FF2f28',borderColor:'#FF3f88', borderRadius:23, marginRight:10}} >
                  <Text style={{marginTop:-1.5,marginLeft:0, fontSize:13, color:'#FFafdf'}}>{'X'}</Text>
                </TouchableOpacity>

              </View>
                

                <View style={{flexDirection:'row', alignItems:'flex-start',justifyContent:'space-around', width:Dimensions.get("screen").width, 
                            marginBottom:5, marginTop:1, padding:5, 
                            borderBottomWidth:1,borderColor:'#efc887', paddingBottom:10}}>
                    <View>
                        <Text style={{fontSize:11, alignSelf:'center', color:'#Cf853F'}}>MIN</Text>
                        <Text style={{borderWidth:0.5,borderColor:'#6495ED', color:'#6495ED', borderRadius:20, fontSize:13, padding:5}}>   $ {parseFloat(this.state.specificPost.minPrice).toFixed(2)}   </Text>
                    </View>
                    <TouchableOpacity onPress={()=>this.setState({changeNameAndPrice:true})}>
                        <Text style={{fontSize:12, alignSelf:'center', color:'#Cf853F'}}>PRICE</Text>
                        <Text style={{borderWidth:0.5, borderColor:'#2F6F4F', color:'#2F6F4F', borderRadius:20, fontSize:20, padding:7}}>   $ {parseFloat(this.state.specificPost.price).toFixed(2)}   </Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize:11, alignSelf:'center', color:'#Cf853F'}}>PROFIT</Text>
                        <Text style={{borderWidth:0.5, borderColor:'#6495ED', color:'#6495ED', borderRadius:20, fontSize:13, padding:5}}>   $ {(parseFloat(this.state.specificPost.price)-parseFloat(this.state.specificPost.minPrice)).toFixed(2)}   </Text>
                    </View>

                </View>


              {/* ONE PRODUCT - LIST OF INGREDIENTS */}
              <View style={{alignSelf:'center', flexDirection:'row', alignItems:'flex-start',justifyContent:'space-between', backgroundColor:'#FFF', color:'#000', fontWeight:'700', borderTopLeftRadius:5, 
                borderTopRightRadius:5, marginLeft:0, marginBottom:1,marginTop:15, shadowRadius: 5,  elevation: 4,shadowColor: '#000',  backgroundColor: '#FFF',
                shadowOffset: {width:0, height: 1}, shadowOpacity: 0.8, width:Dimensions.get("screen").width/1.2}}> 

                <Text style={{fontSize:14, padding:8, backgroundColor:'#FFF', color:'#000', fontWeight:'700'}}>   INGREDIENTS   </Text>

               <TouchableOpacity  onPress={ ()=> this.setFeedsToProduct(this.state.specificPost.projectId) }
                                    style={{width:30, height:30, borderWidth:1.5, alignItems:'center', alignSelf:'center',
                                    justifyContent:'center',backgroundColor:'#2F6F4F',borderColor:'#1FaF4F', borderRadius:23, marginRight:10}} >
                  <Text style={{marginTop:-1.8, fontSize:18, padding:0, color:'#FFF', fontWeight:'700'}}>+</Text>
                </TouchableOpacity>

              </View>

              <FlatList
                data={this.state.specificPost.feedstocks}
                keyExtractor={item => item.feedstock.id.toString() }
                renderItem={ ({item}) => <Tasks data={item} productId={this.state.specificPost.id} /> }
              />


              {/* ONE PRODUCT - RETURN BUTTOM */}
              <View style={{alignItems:'flex-end',justifyContent:'space-between', flexDirection:'row', width:Dimensions.get("screen").width, marginLeft:10, paddingRight:20, marginBottom:20, marginTop:-40}}>
                <TouchableOpacity style={styles.botaoVoltarALista} onPress={()=>this.fcnSpecificPost(id,false)}>
                  <Text style={{color:'#FF2f28', fontSize: 14, margin:3, padding:5}}>Back</Text>
                </TouchableOpacity>
                <View>
                    <Text style={{fontSize:9, alignSelf:'center', color:'#333'}}> Last Update: </Text>
                    <Text style={{fontSize:11, alignSelf:'center', color:'#333'}}> {(this.state.specificPost.update_time)} </Text>
                  </View>
              </View>

            </LinearGradient>
            
          </Modal>
        


        {this.state.isDeleted ? 
          
          <View></View>
            
        :

              <View style={styles.card}>
                  <View style={styles.AreaCreatedByUser}>
                    <View style={styles.botaoCreatedByUser} >
                      <Text style={styles.botaoTextoCreatedByUser}>Ref: {id}/{name}</Text>
                    </View>
                  </View>
              <View style={{borderBottomWidth:0.5,borderColor:'#BBB', marginBottom:10, flexDirection:'row', paddingRight:8,paddingLeft:2, 
                    justifyContent:'space-between', alignItems:'center'}}>
                <Text style={styles.titulo}>{name}</Text>
                <Text style={{borderWidth:0.5, backgroundColor:'#fff', color:'#2F6F4F',  borderRadius:20, borderColor:'#2F6F4F', fontSize:15, padding:5}}>   $ {parseFloat(price).toFixed(2)}   </Text>

              </View>
              <View style={{marginBottom:12, marginTop:5, flexDirection:'row', justifyContent:'space-between', alignItems:'center', 
                            paddingRight:10, paddingBottom:5}}>
                  <Text style={styles.texto}>Enter to check the ingredients.</Text>
                  <Text style={{borderWidth:1,borderColor:'#6495ED', color:'#6495ED', borderRadius:20, fontSize:12, padding:4}}>cost $ {parseFloat(minPrice).toFixed(2)}</Text>
                  

              </View>
                <Text style={styles.texto}>Updated: {update_time == null? "no info" : format(new Date(update_time), "MMMM do, yyyy - H:mma")}</Text>

                <View style={styles.Areabotao}>
                  <TouchableOpacity style={styles.botao} onPress={()=>this.fcnSpecificPost(id,true)} >
                    <Text style={styles.botaoTexto}>INFO</Text>
                  </TouchableOpacity>
                </View>
                

              </View>

          }


{/* --------------------------------Insert Feedstock in Product--------------------------------- */}


          <Modal animationType='fade' visible={this.state.showAddFeedsToProducts}>
            <LinearGradient colors={['#fff','#DEB887']} style={styles.myPostsModal}>
                <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                  <Text style={{color:'#333', fontSize: 10}}>Product ref: {id}</Text>
                  <Text style={{color:'#000', fontSize:17, margin:22, fontWeight:'700', 
                        borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>ADD FEEDSTOCK TO PRODUCT</Text>
                  
                <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:5}}>
                    <TouchableOpacity style={styles.botaoAssign} onPress={()=>this.fcnSpecificPost(this.state.specificPost.id,true)}>
                      <Text style={{color:'#FFF', fontSize: 14, padding:5}}>Done</Text>
                    </TouchableOpacity>
                </View>
                  <Text style={{color:'#000', fontSize:12, margin:10, marginTop:15}}>FEEDSTOCKS:</Text>

                <FlatList
                  data={this.state.feedsToProduct}
                  keyExtractor={item => item.id.toString() }
                  renderItem={ ({item}) => <SimpleFeeds data={item}  actionId={this.state.specificPost.id} action={'product'} /> }
                  contentContainerStyle={{ paddingBottom: 300 }}
                />

              </View>
            </LinearGradient>
          </Modal>


{/* ----------------------------------Change Name and Price----------------------------------- */}


          <Modal animationType='slide' transparent={true}  visible={this.state.changeNameAndPrice}>
            {/* <LinearGradient colors={['#fff','#DEB887']} style={styles.myPostsModal}> */}
            <TouchableOpacity style={{height:'45%'}} onPress={()=>this.setState({changeNameAndPrice:false})}>
              </TouchableOpacity>
                <LinearGradient colors={['#DEB887','#fff','#fff','#DEB887']}  style={{borderTopWidth:0.5,borderTopColor:'#09AFFF',borderBottomWidth:0.5,borderBottomColor:'#09AFFF', 
                        borderTopLeftRadius:20, borderTopRightRadius:20, backgroundColor:'#FFF', height:'55%', alignItems:'center'}}>
                  {/* <Text style={{color:'#333', fontSize: 10, marginTop:15}}>Product ref: {id}</Text> */}
                  <Text style={{color:'#000', fontSize:17, margin:22, fontWeight:'700', 
                        borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>SETTINGS:</Text>

                  <Text style={{color:'#000', fontSize:12, marginBottom:30, marginTop:0}}> CHANGE NAME AND PRICE? </Text>

                  <Text style={{color:'#000', fontSize:12, marginBottom:5, marginTop:0}}> Name: </Text>
                  <View>
                        <TextInput 
                          style={styles.inputsMyTasksSmaller}
                          placeholder="new name..."
                          underlineColorAndroid="transparent"
                          value={this.state.newProdName}
                          onChangeText={this.setNewProdName}
                          onSubmitEditing={() => { this.state.inputPrice.focus() }}
                        />
                  </View>
                  <Text style={{color:'#000', fontSize:12, marginBottom:5, marginTop:0}}> Price: </Text>
                  <View>
                      <TextInput 
                        style={styles.inputsMyTasksSmaller}
                        placeholder="new price..."
                        keyboardType='numeric'
                        underlineColorAndroid="transparent"
                        value={this.state.newProdPrice}
                        onChangeText={this.setNewProdPrice}
                        ref={(input) => {this.state.inputPrice = input;}}
                        onSubmitEditing={() => { Keyboard.dismiss() }}
                      />
                    </View>

                  
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', margin:2, marginTop:40}}>
                    <TouchableOpacity style={styles.botaoAssignRed} onPress={()=>this.setState({changeNameAndPrice:false})}>
                      <Text style={{color:'#FFF', fontSize: 18, padding:5}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoAssign} onPress={()=>this.fcnAskToUpdateNameAndPrice(this.state.specificPost.id)}>
                      <Text style={{color:'#FFF', fontSize: 18, padding:5}}>Save</Text>
                    </TouchableOpacity>
                </View>

              </LinearGradient>
              
            {/* </LinearGradient> */}
          </Modal>


{/* ----------------------------------------------------------------- */}


          <Modal animationType='fade' transparent={true} visible={this.state.loadMyProduct} style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{marginTop:200, alignSelf:'center', width:100, height:100, backgroundColor:'#FFf', borderWidth:1, borderColor:'#09A6FF', borderRadius:40}}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                  <ActivityIndicator color="#09A6FF" size={30}/>
                  <Text style={{color:'#09A6FF', fontSize:7}}>wait</Text>
                </View>
              </View>
          </Modal>

      
{/* ----------------------------------------------------------------- */}

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
    // backgroundColor:'#FFF',
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
    backgroundColor: '#CD853F',
    opacity: 1,
    padding: 10,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 5,

  },

  AreaCreatedByUser:{
    alignItems: 'flex-start',
    marginBottom: -2,
    zIndex: -9
  },
  botaoCreatedByUser:{
    width: Dimensions.get("screen").width/1.8,
    backgroundColor: '#D2B48C',
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
  AreaCreatedByUserIsideAPost:{
    alignItems: 'flex-start',
    marginBottom: 10,
    //zIndex:9
  },
  botaoCreatedByUserIsideAPost:{
    width: Dimensions.get("screen").width/2,
    backgroundColor: '#2F4F4F',
    opacity: 1,
    padding: 5,
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:12,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 0,
    justifyContent:'flex-start'
  },
  botaoCreatedByUserIsideAPost2:{
    width: Dimensions.get("screen").width/2,
    backgroundColor: '#4f55ED',
    opacity: 1,
    padding: 5,
    paddingBottom:10,
    paddingTop:10,
    paddingLeft:20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 0,
    justifyContent:'flex-start'
  },
  
  botaoVoltarALista:{
    width:150,
    borderWidth:1,
    borderColor:'#FF2f28',
    marginTop:60,
    padding: 0,
    borderRadius:5,
    borderTopLeftRadius:40,
    borderBottomLeftRadius:40,
    alignItems:'center',
    justifyContent:'center'

  },
  botaoTexto:{
    textAlign: 'center',
    color: '#FFF',
    fontSize:12
  },
  botaoAssign:{
    width:150,
    borderWidth:2,
    borderColor:'#778899',
    // marginTop:60,
    padding: 0,
    margin:6,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    backgroundColor: '#2F4F4F',
    shadowOffset: {width:0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 7,
    borderRadius: 10,
    elevation: 6,
  },
  botaoAssignRed:{
    width:150,
    borderWidth:2,
    borderColor:'#778899',
    // marginTop:60,
    padding: 0,
    margin:6,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    backgroundColor: '#fF004F',
    shadowOffset: {width:0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 7,
    borderRadius: 10,
    elevation: 6,
  },
  botaoAssigned:{
    width:180,
    borderWidth:2,
    borderColor:'#4f55ED',
    // marginTop:60,
    padding: 0,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    shadowColor: '#000',
    backgroundColor: '#FFF',
    shadowOffset: {width:0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 7,
    borderRadius: 10,
    elevation: 6,
  },
  inputsMyTasksSmaller:{
    width:Dimensions.get("screen").width/1.2,
    height:45,
    borderWidth:1,
    borderColor:'#000',
    backgroundColor:'#FFF',
    color:'#6495ED',
    borderRadius:10,
    marginTop:10,
    marginBottom:15,
    fontSize:15,
    padding:10
  },
});

export default Product;