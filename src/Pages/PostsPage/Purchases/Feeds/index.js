import React, {Component} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Modal, Dimensions} from 'react-native';

import postApi from '../Services/postApi';

class Tasks extends Component{

constructor(props){
    super(props);
    this.state = {
        tasksOfThePost: [],
        specificPostModal:false,
        hideTask:false,
        details:false,
        loadingToDeleteTask:false,
    };
}


    render(){
        const { feedstock, quantity} = this.props.data;
        return(
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.texto}>- {feedstock.name}</Text>
                <Text style={{color:'#6495ED',fontSize:14, padding:10, borderBottomWidth:1, borderBottomColor:'#DEB887'}}>  $ {parseFloat(feedstock.price).toFixed(2)}     ( {quantity} {feedstock.unity})  </Text>
          </View>
        )
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
      padding: 10,
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