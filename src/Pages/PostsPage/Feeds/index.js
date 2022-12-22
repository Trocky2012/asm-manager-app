import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Modal, Dimensions, ScrollView, Alert, Keyboard} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import api from './Services/api';
import {Picker} from '@react-native-picker/picker';

class Feeds extends Component{

  constructor(props){
    super(props);
    this.state = {
      specificPost: [],
      specificPostModal:false,
      loadMyProduct: false,
      isDeleted:false,
            
      feedName:'',
      feedPrice:'',
      feedQuantity:'',
      feedUnity:'',
      feedCriticalQuantity:'',
      feedCategory:'',
      feedDefQuantity:''
    };
    this.setFeedName = this.setFeedName.bind(this);
    this.setFeedPrice = this.setFeedPrice.bind(this);
    this.setFeedQuantity = this.setFeedQuantity.bind(this);
    this.setFeedUnity = this.setFeedUnity.bind(this);
    this.setFeedCriticalQuantity = this.setFeedCriticalQuantity.bind(this);
    this.setFeedCategory = this.setFeedCategory.bind(this);
    this.setFeedDefQuantity = this.setFeedDefQuantity.bind(this);

  }

  setFeedName(text){    this.setState({feedName: text});  }
  setFeedPrice(text){    this.setState({feedPrice: text});  }
  setFeedQuantity(text){    this.setState({setFeedQuantity: text});  }
  setFeedUnity(text){    this.setState({feedUnity: text});  }
  setFeedCriticalQuantity(text){    this.setState({feedCriticalQuantity: text});  }
  setFeedCategory(text){    this.setState({feedCategory: text});  }
  setFeedDefQuantity(text){    this.setState({feedDefQuantity: text});  }


  async fcnSpecificPost(Id, visibility){
    if(visibility){
      try{
        const getPost = 'feedstock/'+Id.toString();
        const response = await api.get(getPost);
        this.setState({
          feedName: response.data.name.toString(),
          feedPrice: response.data.price.toString(),
          feedQuantity: response.data.quantity.toString(),
          feedUnity: response.data.unity.toString(),
          feedCriticalQuantity: response.data.criticalQuantity.toString(),
          feedCategory: response.data.feedCategory.toString(),
          loading: false
        });
      }catch(error) {
        this.setState({loadMyPosts: false});
        Alert.alert(
          'Sorry,',
          'We could not complete the request.\n\nPrease, try again soon.\n\nError to get -specific_feedstock',
          [{ text: 'OK'}],
          {cancelable: false},
        );
        console.log('ERROR: ' + error);
      }
    }

    this.setState({specificPostModal:visibility})
  }

// -------------------------------------------------------------------
  async fcnAskToCreateNewFeedstock(id){

    if(this.state.feedName.length > 1 && this.state.feedPrice.length > 1) {

        try{
              Alert.alert(
                'UPDATE FEEDSTOCK',
                'Are you sure you want to update this feedstock?',
                [
                  { text: 'OK', onPress: () => this.createNewFeedstock(id) },
                  { text: 'Cancel', onPress: () => this.setState({subTasksModal:false}), style:'cancel' },
                ],
                {cancelable: false},
              );


        }catch(error) {
          this.setState({loadMyPosts: false});
          Alert.alert(
            'Sorry,',
            'We could not complete the request.\n\nPrease, try again soon.\n\nError to update -specific_feed',
            [{ text: 'OK'}],
            {cancelable: false},
          );
          console.log('ERROR: ' + error);
        }

    }else{
      Alert.alert(
        'NAME AND PRICE',
        'Please, insert a valid feed name and price',
        [{ text: 'OK'}],
        {cancelable: false},
      );
    }
  }

// -------------------------------------------------------------------
  async createNewFeedstock(id){
    try{
      this.setFeedPrice((parseFloat(this.state.feedPrice).toFixed(2)).toString()); 

      if(this.state.feedUnity.length < 1){ this.setFeedUnity('un'); }

      if(this.state.feedDefQuantity.length < 1){ this.setFeedDefQuantity(this.state.feedQuantity.toString()); }
      else{ this.setFeedDefQuantity( (parseFloat(this.state.feedDefQuantity).toFixed(2)).toString()); }

      if(this.state.feedCriticalQuantity.length < 1){ this.setFeedCriticalQuantity('0.0'); }
      else{ this.setFeedCriticalQuantity((parseFloat(this.state.feedCriticalQuantity).toFixed(2)).toString()); }

      this.setState({loadMyPosts: true});
        const newUserData = 
        {
          "name": this.state.feedName,
          "feedCategory":this.state.feedCategory,
          "price": this.state.feedPrice,
          "quantity": this.state.feedDefQuantity,
          "unity": this.state.feedUnity,
          "criticalQuantity": this.state.feedCriticalQuantity
        };

        // const apiResponse = 
        await api.put('feedstock/'+id.toString(),newUserData);
        // const data = await apiResponse.data;
   
        this.setState({specificPostModal:false})

    }catch(error) {
      // this.setState({specificPostModal: false});
      Alert.alert(
        'Sorry,',
        'We could not complete the request.\n\nPrease, try again soon.\n\nError to create -newFeedstock',
        [{ text: 'OK'}],
        {cancelable: false},
      );
      console.log('ERROR: ' + error);
    }
  }
  
// -------------------------------------------------------------------

  fcnAskToDelete(id){
    Alert.alert(
      'DELETE',
      'Are you sure you want to delete this feedstock?',
      [
        { text: 'OK', onPress: () => this.deleteFeedstock(id) },
        { text: 'Cancel' },
      ],
      {cancelable: false},
    );
  }

  async deleteFeedstock(id){
    this.setState({loadMyPosts: true});

    try{
      await api.delete('feedstock/'+(id).toString()+'/m$s*a');
      this.fcnSpecificPost(id,false);
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

    const { id, name, price, quantity, update_time, unity, feedCategory, criticalQuantity } = this.props.data;

    if(this.state.loading){
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
          <ActivityIndicator color="#09A6FF" size={40}/>
        </View>
      )
    }else{
      return(
        <View>

          {/*            INSIDE A POST MODAL - SO USER CAN ASSIGN IT         */}


    <Modal animationType='fade' visible={this.state.specificPostModal}>

        <LinearGradient colors={['#fff','#fff','#efc887']}style={styles.specificPostModal}>

          {/* ONE POST - TITLE */}
          <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:Dimensions.get("screen").width, 
                        borderBottomWidth:1,borderColor:'#efc887', marginLeft:10, marginTop:10, padding:15, paddingTop:10}}>

            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'flex-start'}}>
              <TouchableOpacity onPress={()=>this.fcnSpecificPost(id,false)} 
                              style={{width:46, height:46, borderWidth:1.5, alignItems:'center',
                              justifyContent:'center',borderColor:'#FF2f28', borderRadius:23, marginRight:10}} >
                <Text style={{marginTop:-4,marginLeft:-2, fontSize:30, color:'#FF2f28'}}>{'<'}</Text>
              </TouchableOpacity>

              <Text style={{padding:15, fontSize:20, fontWeight:'600'}}>-  {this.state.feedName}</Text>
            </View>

            <TouchableOpacity onPress={()=>this.fcnAskToDelete(id)} 
                            style={{width:24, height:24, borderWidth:2, alignItems:'center',
                            justifyContent:'center',backgroundColor:'#FF2f28',borderColor:'#FF3f88', borderRadius:23, marginRight:10}} >
              <Text style={{marginTop:-1.5,marginLeft:0, fontSize:13, color:'#FFafdf'}}>{'X'}</Text>
            </TouchableOpacity>


          </View>
    

        {/* ONE PRODUCT - PRICES */}
        <View style={{flexDirection:'row', alignItems:'flex-start',justifyContent:'space-around', width:Dimensions.get("screen").width, 
                    marginBottom:5, marginTop:1, padding:5, 
                    borderBottomWidth:1,borderColor:'#efc887', paddingBottom:10}}>
            <View>
                <Text style={{fontSize:13, alignSelf:'center', color:'#Cf853F',paddingTop:10, marginBottom:10}}>Purchase price / {this.state.feedUnity}</Text>
                <Text style={{borderWidth:0.5, alignSelf:'center', borderColor:'#2F6F4F', color:'#2F6F4F', borderRadius:20, fontSize:20, padding:7,paddingLeft:18, paddingRight:18, marginBottom:5}}>$ {parseFloat(this.state.feedPrice).toFixed(2)}</Text>
            </View>

        </View>
        <ScrollView style={{flex:1, width:'100%'}}>
              <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                <Text style={{color:'#000', fontSize:15, margin:15, fontWeight:'700', 
                      borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>UPDATE ?</Text>
                <Text style={{color:'#000', fontSize:12, margin:3}}>Name:</Text>
                <TextInput 
                  style={styles.inputsMyTasks}
                  value={this.state.feedName}
                  placeholder="name"
                  underlineColorAndroid="transparent"
                  onChangeText={this.setFeedName}
                  onSubmitEditing={() => { this.state.inputFeedPrice.focus() }}
                />
                <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'100%'}}>
                  <View>
                    <Text style={{color:'#000', fontSize:12, margin:3}}>Price:</Text>
                    <TextInput 
                      style={styles.inputsMyTasksSmaller}
                      value={this.state.feedPrice}
                      placeholder="price"
                      underlineColorAndroid="transparent"
                      keyboardType='numeric'
                      onChangeText={this.setFeedPrice}
                      ref={(input) => {this.state.inputFeedPrice = input;}}
                      onSubmitEditing={() => { Keyboard.dismiss()  }}
                    />

                  </View>
                  <View>
                    <Text style={{color:'#000', fontSize:12, marginTop:3}}>Quantity: {this.state.feedQuantity}</Text>
                    <TextInput 
                      style={styles.inputsMyTasksSmaller}
                      value={this.state.feedDefQuantity}
                      placeholder="quantity"
                      underlineColorAndroid="transparent"
                      keyboardType='numeric'
                      onChangeText={this.setFeedDefQuantity}
                      ref={(input) => {this.state.input2FeedQuantity = input;}}
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                    />
                  </View>

                </View>
                <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'100%', paddingBottom:20}}>
                  <View>
                      <Text style={{color:'#000', fontSize:12, marginTop:12}}>Unity:</Text>
                      <TextInput 
                        style={styles.inputsMyTasksSmaller}
                        value={this.state.feedUnity}
                        placeholder="unity"
                        underlineColorAndroid="transparent"
                        onChangeText={this.setFeedUnity}
                        ref={(input) => {this.state.inputFeedUnity = input;}}
                        onSubmitEditing={() => { Keyboard.dismiss()  }}
                      />

                  </View>
                  <View>
                    <Text style={{color:'#000', fontSize:12, marginTop:12}}>Critical quantity:</Text>
                    <TextInput 
                      style={styles.inputsMyTasksSmaller}
                      value={this.state.feedCriticalQuantity}
                      placeholder="Critical quantity"
                      underlineColorAndroid="transparent"
                      keyboardType='numeric'
                      onChangeText={this.setFeedCriticalQuantity}
                      ref={(input) => {this.state.inputFeedCriticalQuantity = input;}}
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                    />
                  </View>
                </View>
                <Text style={{color:'#000', fontSize:12, marginTop:3}}>Category:</Text>

              </View>
              <View
                    style={{
                        width: 280,
                        marginTop: -5,
                        borderColor: 'black',
                        borderBottomWidth:1,
                        borderRadius: 10,
                        alignSelf: 'center'
                    }}>
                  <Picker 
                    selectedValue={this.state.feedCategory} 
                    onValueChange={(itemValue,itemIndex) => this.setState({feedCategory: itemValue})}
                    style={{color:'#6495ED', padding:10}}
                    >
                      <Picker.Item key={0} value={0} label="OTHER"/>
                      <Picker.Item key={1} value={1} label="CONSUMABLES"/>
                      <Picker.Item key={2} value={2} label="PRODUCTION"/>
                      <Picker.Item key={3} value={3} label="PRODUCT"/>
                      <Picker.Item key={4} value={4} label="FEEDSTOCK"/>
                  </Picker>

              </View>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:5, marginTop:50, padding:10}}>

              <View style={{alignItems:'flex-end',justifyContent:'space-between', flexDirection:'row', width:Dimensions.get("screen").width, margin:10, padding:20, marginBottom:20, marginTop:-40}}>
                <TouchableOpacity style={styles.botaoVoltarALista} onPress={()=>this.fcnSpecificPost(id,false)}>
                  <Text style={{color:'#FF2f28', fontSize: 15, margin:3, padding:5, fontWeight:'700'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoSave} onPress={()=>this.fcnAskToCreateNewFeedstock(id)}>
                  <Text style={{color:'#2F6F4F', fontSize: 15, margin:3, padding:5, fontWeight:'700'}}>Save</Text>
                </TouchableOpacity>
              </View>
              </View>
              
            </ScrollView>

        </LinearGradient>

    </Modal>



{/* ---------------------------------------------------------------- */}




          {/* MAIN SCREEN - LIST OS PRODUCT*/}
        {this.state.isDeleted ? 
        
          <View></View>
            
        :
            <View style={styles.card}>
              <View style={styles.AreaCreatedByUser}>
                <View style={styles.botaoCreatedByUser} >
                  <Text style={styles.botaoTextoCreatedByUser}>Ref: {id}/{name}</Text>
                </View>
                <Text style={{fontSize:13, padding:5,paddingRight:12, paddingLeft:7}}>In stock: </Text>
              </View>
              <View style={{borderBottomWidth:0.5,borderColor:'#BBB', marginBottom:10, flexDirection:'row', paddingRight:5,
              justifyContent:'space-between', alignItems:'center'}}>
                <Text style={styles.titulo}>{name}</Text>
                <Text style={{borderWidth:1,borderColor:'#6495ED', color:'#6495ED', borderRadius:20, fontSize:14, padding:6, paddingRight:10, paddingLeft:10}}>{parseFloat(quantity).toFixed(2)} {unity}</Text>

              </View>
              <View style={{marginBottom:0, marginTop:5, flexDirection:'row', justifyContent:'flex-start', alignItems:'center', 
                        paddingLeft:3, paddingBottom:5}}>
                <Text style={{fontSize:13, padding:10, paddingLeft:7}}>- Purchase cost: </Text>
                <Text style={{borderWidth:0.5, backgroundColor:'#fff', color:'#2F6F4F',  borderRadius:20, borderColor:'#2F6F4F', fontSize:14, paddingTop:6, paddingBottom:6}}>   $ {parseFloat(price).toFixed(2)} / {unity}   </Text>
              </View>
              <Text style={styles.texto}>- {feedCategory}</Text>
              <View style={styles.Areabotao}>
                <TouchableOpacity style={styles.botao} onPress={()=>this.fcnSpecificPost(id,true)} >
                <Text style={styles.botaoTexto}>EDIT</Text>
                </TouchableOpacity>
              </View>
            </View>
        }



{/* ------------------------------------------------------------------------------------------------------------------------------- */}




          <Modal animationType='fade' transparent={true} visible={this.state.loadMyProduct} style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <View style={{marginTop:200, alignSelf:'center', width:100, height:100, backgroundColor:'#FFf', borderWidth:1, borderColor:'#09A6FF', borderRadius:40}}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                  <ActivityIndicator color="#09A6FF" size={30}/>
                  <Text style={{color:'#09A6FF', fontSize:7}}>wait</Text>
                </View>
              </View>
          </Modal>




 {/* ------------------------------------------------------------------------------------------------------------------------------- */}

        </View>
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
    backgroundColor: '#D2691E',
    opacity: 1,
    padding: 12,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 5,

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
    width:150,
    height:45,
    borderWidth:1,
    borderColor:'#000',
    backgroundColor:'#FFF',
    color:'#6495ED',
    borderRadius:10,
    marginTop:10,
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

export default Feeds;