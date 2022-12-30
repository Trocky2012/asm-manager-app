import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, FlatList, TextInput, Keyboard, ActivityIndicator, Modal, ScrollView, Alert, Dimensions, Linking } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import api from './src/services/api';
import Product from './src/Pages/PostsPage/Posts';
import Products from './src/Pages/PostsPage/Products';
import Purchases from './src/Pages/PostsPage/Purchases';
import Feeds from './src/Pages/PostsPage/Feeds';
import SimpleFeeds from './src/Pages/PostsPage/SimpleFeeds';
import SimpleProds from './src/Pages/PostsPage/SimpleProds';
import {Picker} from '@react-native-picker/picker';

var user=[];
var StrType='none';
var StrStatus='none';
var newSaleId='';
var newPurchaseId='';
var newProductId='';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {

      posts: [],
      postsByUser: [],
      feedstocksList: [],
      loading: false,
      showAddFeedsToPurchase:false,
      showAddProdsToSale:false,
      showPriceOfPurchase:false,
      showPriceOfSale:false,
      showAddFeedsToProducts:false,
      showAddProduct:false,
      loadMyPosts: false,
      entryModal:true,
      newLoginModal:false,
      myPostsModal:false,
      subTasksModal:false,
      MyOwnPosted:false,
      purchaseModal:false,
      FeedsModal:false,
      ProductsModal:false,
      showAllSubTasks:false,
      showBuySellOptions:false,
      showNewActOptions:false,
      seed:1,
      name:'',
      password:'',
      productName:'',
      productPrice:'',
      purchasePrice:'',
      salePrice:'',
      feedName:'',
      feedPrice:'',
      feedQuantity:'',
      feedCriticalQuantity:'',
      feedUnity:'',
      feedCategory:'OTHER',
      feedFilterCategory:'',
      taskTitleWriting:'',
      taskDescriptionWriting:'',
      newLoginName:'',
      newLoginLastName:'',
      newLoginEmail:'',
      newLoginPassword:'',
      newLoginPassword2:'',
      newLoginPhone:'',
      createdPostID:'',
      userID:'',
      userName:''
    };
    this.SetProjName = this.SetProjName.bind(this);
    this.setPassword = this.setPassword.bind(this);

    this.setProductName = this.setProductName.bind(this);
    this.setProductPrice = this.setProductPrice.bind(this);

    this.setPurchasePrice = this.setPurchasePrice.bind(this);
    this.setSalePrice = this.setSalePrice.bind(this);

    this.setFeedName = this.setFeedName.bind(this);
    this.setFeedPrice = this.setFeedPrice.bind(this);
    this.setFeedQuantity = this.setFeedQuantity.bind(this);
    this.setFeedCriticalQuantity = this.setFeedCriticalQuantity.bind(this);
    this.setFeedUnity = this.setFeedUnity.bind(this);
    this.setfeedCategory = this.setfeedCategory.bind(this);
    this.setfeedFilterCategory = this.setfeedFilterCategory.bind(this);

    this.setTaskTitleWriting = this.setTaskTitleWriting.bind(this);
    this.setTaskDescriptionWriting = this.setTaskDescriptionWriting.bind(this);

    this.setNewLoginName = this.setNewLoginName.bind(this);
    this.setNewLoginLastName = this.setNewLoginLastName.bind(this);
    this.setNewLoginEmail = this.setNewLoginEmail.bind(this);
    this.setNewLoginPassword = this.setNewLoginPassword.bind(this);
    this.setNewLoginPassword2 = this.setNewLoginPassword2.bind(this);
    this.setNewLoginPhone = this.setNewLoginPhone.bind(this);

    this.setCreatedPostID = this.setCreatedPostID.bind(this);
    this.setUserID = this.setUserID.bind(this);
    
  }



  SetProjName(text){    this.setState({name: text});  }
  setPassword(text){    this.setState({password: text});  }
  setProductName(text){    this.setState({productName: text});  }
  setProductPrice(text){    this.setState({productPrice: text});  }
  setPurchasePrice(text){    this.setState({purchasePrice: text});  }
  setSalePrice(text){    this.setState({salePrice: text});  }
  setFeedName(text){    this.setState({feedName: text});  }
  setFeedPrice(text){    this.setState({feedPrice: text});  }
  setFeedQuantity(text){    this.setState({feedQuantity: text});  }
  setFeedCriticalQuantity(text){    this.setState({feedCriticalQuantity: text});  }
  setfeedCategory(text){    this.setState({feedCategory: text});  }
  setfeedFilterCategory(text){    this.setState({feedFilterCategory: text});  }
  setFeedUnity(text){    this.setState({feedUnity: text});  }
  setShowAllSubTasks(visibility){    this.setState({showAllSubTasks: visibility});  }
  setTaskTitleWriting(text){    this.setState({taskTitleWriting: text});  }
  setTaskDescriptionWriting(text){    this.setState({taskDescriptionWriting: text});  }
  setNewLoginName(text){    this.setState({newLoginName: text});  }
  setNewLoginLastName(text){    this.setState({newLoginLastName: text});  }
  setNewLoginEmail(text){    this.setState({newLoginEmail: text});  }
  setNewLoginPassword(text){    this.setState({newLoginPassword: text});  }
  setNewLoginPassword2(text){    this.setState({newLoginPassword2: text});  }
  setNewLoginPhone(text){   this.setState({newLoginPhone: text}); }
  setCreatedPostID(text){   this.setState({createdPostID: text}); }
  setUserID(text){   this.setState({userID: text}); }
  setUserName(text){   this.setState({userName: text}); }
  setShowOptionsForMyTask(text){ this.setState({showBuySellOptions: text,showNewActOptions:false}); }
  setShowNewActOptions(text){ this.setState({showNewActOptions: text,showBuySellOptions:false}); }



  fcnAskToGoToStarengWebsite(){
    Alert.alert(
      'STARENG WEBSITE',
      'Are you sure you want to visit Stareng Technology website?',
      [
        { text: 'OK', onPress: () => Linking.openURL('https://www.starengtech.com/') },
        { text: 'Cancel', style:'cancel' },
      ],
      {cancelable: false},
    );
  }

  
  //Entry - name and Password
  async fcnEntryModalCheckAndClose(){
    if(this.state.name.length > 1){
      if(this.state.password.length > 3 && this.state.password!='none.ks$ata*0lo3h4seq@wt@uiH2GfdX9asdzbv$7rhgd'){
        try{
          this.setState({loadMyPosts: true});
           const TextForRerquest = 'projects/find-by-name?name='+((this.state.name).toString())+
                      '&pssd=kw*s.x$37tth@$u0K8lE9'+((this.state.password).toString()+'0K2.lp$fzE6qj*tk5lp@$');
          // const TextForRerquest = 'projects/find-by-name?name=Test&pssd=6540984325re';
          user.push(await (await api.get(TextForRerquest)).data);

          if(user[0].name.length > 0){
            this.setUserID(user[0].id);
            this.setUserName(user[0].name);
  
            const path = 'product/updateAndFindAllByProjectId/'+(this.state.userID).toString();
            // const path = 'product/by-project-id/'+(this.state.userID).toString();
            const response = await api.get(path);
            this.setState({
              posts: response.data,
              loading: false,
              ProductsModal: true
            });
    
    
            StrStatus='none';
            StrType='none';
            this.setState(
              {
                feedUnity: '',
                loadMyPosts: false,
                entryModal:false
              }
            );
          }else{
            alert('Please, check your your name and password')
          }

        }catch(error) {
          this.setState({loadMyPosts: false});
          user=[];
          alert('Please, check your credentials and your device status connection. (id '+this.state.userID+")")

          console.log('ERROR: ' + error);
        }
      }else{
        alert('Please, check your password')
      }
    }else{
      alert('Please, check the project name')
    }
  }

  async fcnMyOwnPosted(visibility){
    
    if(!visibility){
      this.setState({feedUnity: ''});
      StrStatus='none';
      StrType='none'; 
    }

    this.setState({MyOwnPosted:visibility})
    this.setState({FeedsModal:false})
    this.setState({purchaseModal:false})
  }
  
  async fcnPurchases(visibility){
    
    this.setState({purchaseModal:visibility})
    this.setState({MyOwnPosted:false})
    this.setState({FeedsModal:false})
  }
  
  async keepThisModal(visibility){

    if(visibility){
      this.setState({FeedsModal:visibility, ProductsModal:false});
    }else{
      StrStatus='none';
      StrType='none'; 
      this.setShowNewActOptions(false);
      this.setState({FeedsModal:false, ProductsModal:true});
    }
    this.setState({MyOwnPosted:false})
    this.setState({purchaseModal:false})
  }

  fcnEntryModal(visibility){
    //If its loging out:
    if(visibility){
      this.SetProjName('');
      this.setPassword('');
      user=[];
    }

      this.setState({entryModal:visibility})
  }

  async fcnNewLoginModalCheckAndClose(){

      const name = this.state.newLoginName;
      const password = this.state.newLoginPassword;
      const password2 = this.state.newLoginPassword2;

      
        if(name.length > 1){
            if(password.length > 3 && password2.length  > 3 && password === password2 && 
                (!password.includes('kw*s.x$37tth@$u0K8lE9')||!password.includes('0K2.lp$fzE6qj*tk5lp@$'))){
                  this.setState({loadMyPosts: true});
                  const TextForRerquest = 'projects/find-by-name?name='+name+
                                          '&pssd=none.ks$ata*0lo3h4seq@wt@uiH2GfdX9asdzbv$7rhgd';
                  try{
                    const responseOfCheckName = await api.get(TextForRerquest);
                    if(responseOfCheckName.data.name==name){
                      this.setState({loadMyPosts: false});
                        alert('\n" '+responseOfCheckName.data.name+' "\n\nThere is a project with this name. Please, try another one\n\n'
                        +'If you forgot your password, contact us:\n\nwww.starengtech.com');
                    }else{
                      this.setState({loadMyPosts: false});
                      Alert.alert(
                        'CREATE PROJECT',
                        'Are you sure you want to create this new project?',
                        [
                          // { text: 'OK', onPress: () => this.setState({newLoginModal:false}) },
                          { text: 'OK', onPress: () => this.CreateNewProject() },
                          { text: 'Cancel', onPress: () => this.setState({newLoginModal:true}), style:'cancel' },
                        ],
                        {cancelable: false},
                        );
                    }
                  }catch(error) {
                    this.setState({loadMyPosts: false});
                    Alert.alert(
                      'Sorry,',
                      'It could not complete the request.\n\nPrease, try again soon.\n\nError to check -RegisterToNewProject\n\n',
                      [{ text: 'OK'}],
                      {cancelable: false},
                    );
                    console.log('ERROR: ' + error);
                  }
                  
            }else {
              // this.setState({newLoginPassword: ''});
              // this.setState({newLoginPassword2: ''});
              alert('Write your password again, please.\n\nTip: It must contain at least 8 characters.');
            }
        }else {
          alert('You must fill up the project name');
        }

      
  
  }
  async CreateNewProject(){
    try{
      this.setState({loadMyPosts: true});
      const newData = 
        {
          "name": this.state.newLoginName,
          "password": this.state.newLoginPassword
        };
        await api.post('project',newData);
        this.setState({newLoginModal:false});
        this.setState({loadMyPosts: false});
        Alert.alert(
          'Congrats,',
          '\nNew project created.\n\nYou can access the ASM Manager now.\n\nwww.starengtech.com',
          [{ text: 'OK'}],
          {cancelable: false},
        );
    }catch(error) {
      Alert.alert(
        'Sorry,',
        'It could not complete the request.\n\nPrease, try again soon.\n\nError to create -newUser',
        [{ text: 'OK'}],
        {cancelable: false},
      );
      console.log('ERROR: ' + error);
    }
  }
  fcnNewLoginModal(visibility){
      this.setState({newLoginModal:visibility})
  }

  fcnMyPostModal(visibility){
    try{
      this.setShowNewActOptions(false)
      this.setState({
        myPostsModal:visibility
      });

    }catch(error) {
      console.log('ERROR: ' + error);
    }
  }



  async fcnGetFeedsByCategory(variable){

      switch (variable) {
        case 0: StrType = 'OTHER';
          break;
        case 1: StrType = 'CONSUMABLES';
          break;
        case 2: StrType = 'PRODUCTION';
          break;
        case 3: StrType = 'PRODUCT';
          break;
        case 4: StrType = 'FEEDSTOCK';
          break;
        default:StrType = 'none';
      }

      this.setState({loadMyPosts: true});
      this.setState({feedFilterCategory: StrType});
      this.setfeedCategory(StrType)
      
      try{
          // const path = 'posts/get-by-type-status-and-user-assigned?type='+StrType+'&status='+StrStatus+'&user_id='+this.state.userID;
          if(StrType=='none'){
            const path = 'feedstock/by-project-id/'+this.state.userID;
            const response = await api.get(path);
            this.setState({
              feedstocksList: response.data,
              loadMyPosts: false
            });
          }else{
            const path = 'feedstock/get-by-project-id-and-feed-category?id='+this.state.userID+'&category='+StrType;
            const response = await api.get(path);
            this.setState({
              feedstocksList: response.data,
              loadMyPosts: false
            });

          }

          this.setfeedCategory(StrType)
        
      }catch(error) {
        this.setState({loadMyPosts: false});
        Alert.alert(
          'Sorry,',
          'It could not complete the request.\n\nPrease, try again soon.\n\nError to filter -category',
          [{ text: 'OK'}],
          {cancelable: false},
        );
        console.log('ERROR: ' + error);
      }
        
  }


  async fcnMyOwnPostsModal(visibility){
    try{
      this.setState({loadMyPosts: true});
      
      this.setState({feedUnity: ''});
      StrStatus='none';
      StrType='none';
      this.setShowNewActOptions(false);

      const response = await api.get('sale/by-project-id/'+(user[0].id).toString());
      this.setState({
        postsByUser: response.data,
        loadMyPosts: false
      });
      
      this.fcnMyOwnPosted(visibility)
    }catch(error) {
      this.setState({loadMyPosts: false});
      Alert.alert(
        'Sorry,',
        'We could not complete the request.\n\nPrease, try again soon.\n\nError to access -Sales.',
        [{ text: 'OK'}],
        {cancelable: false},
      );
      console.log('ERROR: ' + error);
    }
  }

  async fcnPurchaseModal(visibility){
    try{
      this.setState({loadMyPosts: true});
      this.setShowNewActOptions(false);
    
      const response = await api.get('purchase/by-project-id/'+(user[0].id).toString());
      this.setState({
        postsByUser: response.data,
        ProductsModal: false,
        loadMyPosts: false
      });
      
      this.fcnPurchases(visibility)
    }catch(error) {
      this.setState({loadMyPosts: false});
      Alert.alert(
        'Sorry,',
        'We could not complete the request.\n\nPrease, try again soon.\n\nError to access -Purchases.',
        [{ text: 'OK'}],
        {cancelable: false},
      );
      console.log('ERROR: ' + error);
    }
  }


  async fcnAssignedPostsModal(visibility){
    this.setState({loadMyPosts: true});

    try{
      const response = await api.get('feedstock/by-project-id/'+(user[0].id).toString());

      this.setState({ feedstocksList: response.data });

      this.setShowOptionsForMyTask(false);
      this.setState({loadMyPosts: false, ProductsModal: false});
      this.keepThisModal(true);
    }catch(error) {
      this.setState({loadMyPosts: false});
      Alert.alert(
        'Sorry,',
        'We could not complete the request.\n\nPrease, try again soon.\n\nError to access -Stock. '+user[0].id,
        [{ text: 'OK'}],
        {cancelable: false},
        );
        console.log('ERROR: ' + error);
    }
    
    
  }

  fcnAskToCreateNewProduct(){
    if(this.state.productName.length > 1 && this.state.productPrice.length > 0){
      Alert.alert(
        'CREATE PRODUCT',
        'Are you sure you want to create this new product?',
        [
          { text: 'OK', onPress: () => this.createNewProduct() },
          { text: 'Cancel', onPress: () => this.setState({subTasksModal:false}), style:'cancel' },
        ],
        {cancelable: false},
      );
    }else{
      alert('Please, check the product name and price')
    }
  }

  async createNewProduct(){
    try{
      this.setState({
        loadMyPosts: true
      });
      const newUserData = 
      {
        "projectId": (user[0].id).toString(),
        "name": this.state.productName.toString(),
        "price": (parseFloat(this.state.productPrice).toFixed(2)).toString()
      };
      //Create a Purchase:
      const apiResponse = await api.post('product',newUserData);
      const data = await apiResponse.data;
      newProductId = (data.id).toString();
      //Get feedsTocks available:
      const response = await api.get('feedstock/by-project-id/'+(user[0].id).toString());
      this.setState({
        postsByUser: response.data,
        loadMyPosts: false, 
        showAddProduct:false,
        showAddFeedsToProducts:true,
        showBuySellOptions:false,
        showNewActOptions:false
      });
      // this.keepThisModal(false)
      

    }catch{
      this.setState({loadMyPosts: false});
      Alert.alert(
        'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to create -newProduct',
        [{ text: 'OK'}],
        {cancelable: false},
      );
      console.log('ERROR: ' + error);
    }
  }


  fcnAskToCreateNewPurchase(){
    Alert.alert(
      'CREATE PURCHASE',
      'Are you sure you want to create this new purchase?',
      [
        { text: 'OK', onPress: () => this.createNewPurchase() },
        { text: 'Cancel', onPress: () => this.setState({subTasksModal:false}), style:'cancel' },
      ],
      {cancelable: false},
    );
  }

  async createNewPurchase(){
    try{
      this.setState({
        loadMyPosts: true, 
        showBuySellOptions:false,
        showNewActOptions:false, 
        ProductsModal:false
      });
      const newUserData = 
      {
        "projectId": (user[0].id).toString()
      };
      //Create a Purchase:
      const apiResponse = await api.post('purchase',newUserData);
      const data = await apiResponse.data;
      newPurchaseId = (data.id).toString();
      //Get feedsTocks available:
      const response = await api.get('feedstock/by-project-id/'+(user[0].id).toString());
      this.setState({
        postsByUser: response.data,
        loadMyPosts: false, 
        showAddFeedsToPurchase:true
      });
      // this.keepThisModal(false)

    }catch{
      this.setState({loadMyPosts: false});
      Alert.alert(
        'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to create -newPurchase',
        [{ text: 'OK'}],
        {cancelable: false},
      );
      console.log('ERROR: ' + error);
    }
  }

  async checkAndSetPurchasePrice(isSetPrice){
    this.setState({loadMyPosts: true});
    if(isSetPrice){
      try{
        await api.put('purchase/'+newPurchaseId+'/set-price?price='+ parseFloat(this.state.purchasePrice).toFixed(2).toString());
        this.setState({
          showAddFeedsToPurchase:false, 
          showPriceOfPurchase:false, 
          showBuySellOptions:false,
          showNewActOptions:false,
          loadMyPosts: false
        });
        this.keepThisModal(false);
      }catch{
        this.setState({loadMyPosts: false});
        Alert.alert(
          'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to SET -newPurchasePrice',
          [{ text: 'OK'}],
          {cancelable: false},
        );
        console.log('ERROR: ' + error);
        
      }
    }else{
      try{
        const response = await api.get('purchase/'+newPurchaseId);
        this.setState({
          purchasePrice: response.data.price,
          showAddFeedsToPurchase:false, 
          showPriceOfPurchase:true,
          showBuySellOptions:false,
          showNewActOptions:false,
          loadMyPosts: false
        });
  
      }catch{
        this.setState({loadMyPosts: false});
        Alert.alert(
          'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to GET -newPurchasePrice',
          [{ text: 'OK'}],
          {cancelable: false},
        );
        console.log('ERROR: ' + error);
      }

    }
  }

  fcnAskToCreateNewSale(){
    Alert.alert(
      'CREATE SALE',
      'Are you sure you want to create this new sale?',
      [
        { text: 'OK', onPress: () => this.createNewSale() },
        { text: 'Cancel', onPress: () => this.setState({subTasksModal:false}), style:'cancel' },
      ],
      {cancelable: false},
    );
  }

  async createNewSale(){
    try{
      this.setState({
        loadMyPosts: true, 
        showBuySellOptions:false,
        showNewActOptions:false
      });
      const newUserData = 
      {
        "projectId": (user[0].id).toString()
      };
      //Create a Sale:
      const apiResponse = await api.post('sale',newUserData);
      const data = await apiResponse.data;
      newSaleId = (data.id).toString();
      //Get products available:
      const response = await api.get('product/by-project-id/'+(user[0].id).toString());
      
      this.setState({
        postsByUser: response.data,
        loadMyPosts: false, 
        showAddProdsToSale:true
      });
      // this.keepThisModal(false)
    }catch{
      this.setState({loadMyPosts: false});
      Alert.alert(
        'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to create -newSale',
        [{ text: 'OK'}],
        {cancelable: false},
      );
      console.log('ERROR: ' + error);
    }
  }

  async checkAndSetSalePrice(isSetPrice){
    this.setState({loadMyPosts: true});
    if(isSetPrice){
      try{
        await api.put('sale/'+newSaleId+'/set-price?price='+ parseFloat(this.state.salePrice).toFixed(2).toString());
        this.setState({
          showAddProdsToSale:false, 
          showPriceOfSale:false, 
          showBuySellOptions:false,
          showNewActOptions:false,
          loadMyPosts: false
        });
        this.keepThisModal(false);

      }catch{
        this.setState({loadMyPosts: false});
        Alert.alert(
          'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to SET -newPurchasePrice',
          [{ text: 'OK'}],
          {cancelable: false},
        );
        console.log('ERROR: ' + error);
      }
    }else{
      try{
        const response = await api.get('sale/'+newSaleId);
        this.setState({
          salePrice: response.data.price,
          showAddFeedsToPurchase:false, 
          showPriceOfSale:true,
          loadMyPosts: false
        });
  
      }catch{
        this.setState({loadMyPosts: false});
        Alert.alert(
          'Sorry,', 'We could not complete the request.\n\nPrease, try again soon.\n\nError to GET -newPurchasePrice',
          [{ text: 'OK'}],
          {cancelable: false},
        );
        console.log('ERROR: ' + error);
      }

    }
  }

  async fcnAskToCreateNewFeedstock(){

    if(this.state.feedName.length > 1 && this.state.feedPrice.length > 0) {

        try{
              Alert.alert(
                'CREATE FEEDSTOCK',
                'Are you sure you want to create this new feedstock?',
                [
                  { text: 'OK', onPress: () => this.createNewFeedstock() },
                  { text: 'Cancel', onPress: () => this.setState({subTasksModal:false}), style:'cancel' },
                ],
                {cancelable: false},
              );


        }catch(error) {
          this.setState({loadMyPosts: false});
          Alert.alert(
            'Sorry,',
            'We could not complete the request.\n\nPrease, try again soon.\n\nError to get -insertNewFeed',
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

  async createNewFeedstock(){
    try{
      this.setState({
        loadMyPosts: true, 
        showBuySellOptions:false,
        showNewActOptions:false
      });

      this.setFeedPrice((parseFloat(this.state.feedPrice).toFixed(2)).toString()); 

      if(this.state.feedUnity == ''){ 
        this.setFeedUnity('un'); 
      }

      if(this.state.feedCategory.length < 2 || this.state.feedCategory == 'Select'){this.setState({feedCategory: 'OTHER'})}

      if(this.state.feedQuantity.length < 1){ this.setFeedQuantity('0.0'); }
      else{ this.setFeedQuantity( (parseFloat(this.state.feedQuantity).toFixed(2)).toString()); }

      if(this.state.feedCriticalQuantity.length < 1){ this.setFeedCriticalQuantity('0.0'); }
      else{ this.setFeedCriticalQuantity((parseFloat(this.state.feedCriticalQuantity).toFixed(2)).toString()); }

        const newUserData = 
        {
          "projectId": (user[0].id).toString(),
          "name": this.state.feedName,
          "feedCategory":this.state.feedCategory,
          "price": this.state.feedPrice,
          "quantity": this.state.feedQuantity,
          "unity": this.state.feedUnity,
          "criticalQuantity": this.state.feedCriticalQuantity
        };

        const apiResponse = await api.post('feedstock',newUserData);
        const data = await apiResponse.data;
   
        this.setState({ 
          createdPostID: (data.id).toString(),
          feedName:'',
          feedCategory:'OTHER',
          feedPrice:'',
          feedQuantity:'',
          feedUnity:'',
          feedCriticalQuantity:'',
        });
        this.fcnMyPostModal(false);
        this.setState({
          loadMyPosts: false ,
          showBuySellOptions:false,
          showNewActOptions:false
        });
        // this.fcnAssignedPostsModal(true);
        this.keepThisModal(false); this.fcnMyPostModal(true);
    }catch(error) {
      this.setState({loadMyPosts: false});
      Alert.alert(
        'Sorry,',
        'We could not complete the request.\n\nPrease, try again soon.\n\nError to create -newFeedstock',
        [{ text: 'OK'}],
        {cancelable: false},
      );
      console.log('ERROR: ' + error);
    }
  }

  

  handleRefreshing = () => {
    this.setState(
      {
        seed: this.state.seed+1,
      },
      () => {
        this.fcnEntryModalCheckAndClose();
      }
    );
  }

  handleRefreshingForMyTasks = () => {
    this.setState(
      {
        seed: this.state.seed+1,
      },
      () => {
        this.fcnMyOwnPostsModal(true);
      }
    )
  }
 
  handleRefreshingForAssigned = () => {
    this.setState(
      {
        seed: this.state.seed+1,
      },
      () => {
        this.fcnAssignedPostsModal(true);
      }
    );
  }

  

  render() {

    if(this.state.loading){
      return(
        <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
          <ActivityIndicator color="#09A6FF" size={40}/>
        </View>
      )
    }else{
      return(

      <View style={styles.container}>
  


{/* -------------------------------------------------------------------------------------------------------------------- */}



          {/* MODAL - MAIN LOGIN SCREEN */}
          <Modal animationType='fade' visible={this.state.entryModal}>
            <LinearGradient colors={['#efc887', '#CD853F']} style={styles.entryModal}>
              <Text style={{color:'#2F4F4F', fontSize:20, marginTop:30,fontWeight:'700'}} >_</Text>
              <Text style={{color:'#2F4F4F', fontSize:28, marginTop:10,paddingBottom:10, fontWeight:'700', 
                                                      borderBottomWidth:0.5, borderBottomColor:'#111'}} >ASM</Text>
              <Text style={{color:'#2F4F4F', fontSize:20, marginBottom:30,paddingTop:10, fontWeight:'700'}}>_    Manager    _</Text>
              <Text style={{color:'#fff', fontSize:15, margin:13}}>A Stareng Technology product</Text>
              <Text style={{color:'#fff', fontSize:12, margin:22, marginBottom:26}}>Enter or create a new project to access the app.</Text>
              <TextInput 
                style={styles.inputsEntry}
                placeholder="project"
                placeholderTextColor={"#888"}
                underlineColorAndroid="transparent"
                onChangeText={this.SetProjName}
                // keyboardType={'email-address'}
                returnKeyType={'next'}
                // autoCapitalize={'none'}
                onSubmitEditing={() => { this.state.inputEntryPassword.focus() }}
              />
              <TextInput 
                style={styles.inputsEntry}
                placeholder="password"
                placeholderTextColor={"#888"}
                underlineColorAndroid="transparent"
                onChangeText={this.setPassword}
                secureTextEntry={true}
                returnKeyType={'done'}
                ref={(input) => {this.state.inputEntryPassword = input;}}
                onSubmitEditing={() => { this.fcnEntryModalCheckAndClose()}}
              />
              <TouchableOpacity style={styles.botaoEntry} onPress={()=>this.fcnEntryModalCheckAndClose()}>
                <Text style={styles.botaoTexto}>Enter</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{}} onPress={()=>this.fcnNewLoginModal(true)}>
                <Text style={{color:'#2F4F4F', fontSize:12, marginTop:35, paddingBottom:50} }>CREATE NEW PROJECT</Text>  
              </TouchableOpacity> */}
              
              <TouchableOpacity style={{flex:1, alignContent:'flex-end', justifyContent:'flex-end', padding:30}}
                    onPress={() => this.fcnAskToGoToStarengWebsite()}>
                <Text style={{color:'#fff', fontSize:12, margin:10}}>www.starengtech.com</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Modal>





{/* -------------------------------------------------------------------------------------------------------------------- */}





          {/*   MODAL - CREATE NEW LOGIN   */}


          <Modal animationType='fade' visible={this.state.newLoginModal}>
            <LinearGradient colors={['#Cf853F','#efc887']} style={styles.entryModal}>
              <Text style={{color:'#2F4F4F', fontSize:21, marginTop:80, marginBottom:55, fontWeight:'700'}}>CREATE NEW PROJECT</Text>
              {/* <Text style={{color:'#2F4F4F', fontSize:12, margin:5}}>Hello,</Text> */}
              <Text style={{color:'#fff', fontSize:12, marginBottom:55}}>Please, fill it up to create the new project.</Text>
              <TextInput 
                style={styles.inputsNewLogin}
                placeholder="name"
                placeholderTextColor={"#666"}
                underlineColorAndroid="transparent"
                onChangeText={this.setNewLoginName}
                keyboardType={'default'}
                onSubmitEditing={() => { this.state.inputNewPassword.focus() }}
              />
              <TextInput 
                style={styles.inputsNewLogin}
                placeholder="password"
                placeholderTextColor={"#666"}
                underlineColorAndroid="transparent"
                onChangeText={this.setNewLoginPassword}
                secureTextEntry={true}
                ref={(input) => {this.state.inputNewPassword = input;}}
                onSubmitEditing={() => { this.state.inputNewPassword2.focus() }}
              />
              <TextInput 
                style={styles.inputsNewLogin}
                placeholder="write the password again"
                placeholderTextColor={"#666"}
                underlineColorAndroid="transparent"
                secureTextEntry={true}
                onChangeText={this.setNewLoginPassword2}
                ref={(input) => {this.state.inputNewPassword2 = input;}}
                blurOnSubmit={true}
                onSubmitEditing={() => {Keyboard.dismiss(), this.fcnNewLoginModalCheckAndClose()}}
              />
              <TouchableOpacity style={styles.botaoEntry} onPress={()=>this.fcnNewLoginModalCheckAndClose()}>
                <Text style={styles.botaoTexto}>Create project</Text>
              </TouchableOpacity>

              <View style={{flex:1, alignContent:'flex-end', justifyContent:'flex-end', padding:30}}>
              <TouchableOpacity style={{width:150, borderWidth:1, borderColor:'#FF6347', marginBottom:20,  borderRadius:15, alignItems:'center',
                                      justifyContent:'center'}} onPress={()=>this.fcnNewLoginModal(false)}>
                    <Text style={{textAlign: 'center',fontSize:14, margin:1, padding:10,  color: '#FF6347'}}>Cancel</Text>
                  </TouchableOpacity>
                <Text style={{color:'#2F4F4F', fontSize:12, margin:10, alignSelf:'center'}}>www.starengtech.com</Text>
              </View>
            </LinearGradient>
          </Modal>





{/* -------------------------------------------------------------------------------------------------------------------- */}





          {/*  MODAL - CREATE NEW FEED  */}


          <Modal animationType='fade' visible={this.state.myPostsModal}>
            <ScrollView style={styles.myPostsModal}>
              <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                <Text style={{color:'#000', fontSize:20, margin:40, fontWeight:'700', 
                      borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>NEW FEEDSTOCK</Text>
                <Text style={{color:'#000', fontSize:12, margin:3}}>NAME:</Text>
                
                                <TextInput 
                                  style={styles.inputsMyTasks}
                                  value={this.state.feedName}
                                  placeholder="name"
                                  underlineColorAndroid="transparent"
                                  onChangeText={this.setFeedName}
                                  onSubmitEditing={() => { this.state.inputPrice.focus() }}
                                />
                                <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'100%'}}>
                                  <View>
                                    <Text style={{color:'#000', fontSize:12, margin:3}}>Cost per unity:</Text>
                                    <TextInput 
                                      style={styles.inputsMyTasksSmaller}
                                      placeholder="cost"
                                      keyboardType='numeric'
                                      underlineColorAndroid="transparent"
                                      onChangeText={this.setFeedPrice}
                                      ref={(input) => {this.state.inputPrice = input;}}
                                      onSubmitEditing={() => { this.state.inputQuantity.focus() }}
                                    />

                                  </View>
                                  
                                  <View>
                                      <Text style={{color:'#000', fontSize:12, marginTop:3}}>Unity:</Text>
                                      <TextInput 
                                        style={styles.inputsMyTasksSmaller}
                                        // value={this.state.feedUnity}
                                        placeholder="unity"
                                        underlineColorAndroid="transparent"
                                        onChangeText={this.setFeedUnity}
                                        ref={(input) => {this.state.inputUnity = input;}}
                                        onSubmitEditing={() => { this.state.inputCriticalQuantity.focus() }}
                                      />

                                  </View>

                                </View>
                                <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', width:'100%', paddingBottom:20}}>
                                <View>
                                    <Text style={{color:'#000', fontSize:12, marginTop:8}}>Quantity:</Text>
                                    <TextInput 
                                      style={styles.inputsMyTasksSmaller}
                                      placeholder="quantity"
                                      keyboardType='numeric'
                                      underlineColorAndroid="transparent"
                                      onChangeText={this.setFeedQuantity}
                                      ref={(input) => {this.state.inputQuantity = input;}}
                                      onSubmitEditing={() => { this.state.inputUnity.focus() }}
                                    />
                                  </View>
                                  <View>
                                    <Text style={{color:'#000', fontSize:12, marginTop:8}}>Critical quantity:</Text>
                                    <TextInput 
                                      style={styles.inputsMyTasksSmaller}
                                      // value={parseFloat(this.state.feedCriticalQuantity).toFixed(2)}
                                      placeholder="critical quantity"
                                      keyboardType='numeric'
                                      underlineColorAndroid="transparent"
                                      onChangeText={this.setFeedCriticalQuantity}
                                      ref={(input) => {this.state.inputCriticalQuantity = input;}}
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
                                      <Picker.Item label="Select"/>
                                      <Picker.Item key={0} value={0} label="OTHER"/>
                                      <Picker.Item key={1} value={1} label="CONSUMABLES"/>
                                      <Picker.Item key={2} value={2} label="PRODUCTION"/>
                                      <Picker.Item key={3} value={3} label="PRODUCT"/>
                                      <Picker.Item key={4} value={4} label="FEEDSTOCK"/>
                                  </Picker>

                              </View>
              <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:5, marginTop:50, padding:10}}>
                {/* <TouchableOpacity style={styles.botaoMyPostSave} onPress={()=>this.fcnAskToCreateNewFeedstock()}>
                  <Text style={styles.botaoTextoMyPostSave}>Next</Text>
                </TouchableOpacity> */}
                  <TouchableOpacity style={styles.botaoMyPostBack} onPress={()=>this.fcnMyPostModal(false)}>
                    <Text style={styles.botaoTextoMyPostBack}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.botaoAssign} onPress={()=>this.fcnAskToCreateNewFeedstock()}>
                    <Text style={{color:'#FFF', fontSize: 14, padding:5}}>Save</Text>
                  </TouchableOpacity>
                {/* <View style={{flex:1, alignContent:'flex-end', justifyContent:'flex-end', padding:30}}> */}
                {/* </View> */}
              </View>
              
            </ScrollView>
          </Modal>









{/* -------------------------------------------------------------------------------------------------------------------- */}





          {/*   MODAL - CREATE NEW  -   PURCHASE   */}


        <Modal animationType='fade' visible={this.state.showAddFeedsToPurchase}>
          <LinearGradient colors={['#fff','#DEB887']} style={styles.myPostsModal}>
              <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                <Text style={{color:'#333', fontSize: 10}}>Purchase ref: {newPurchaseId}</Text>
                <Text style={{color:'#000', fontSize:17, margin:22, fontWeight:'700', 
                      borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>ADD FEEDSTOCK TO PURCHASES</Text>
                
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:5}}>
                  <TouchableOpacity style={styles.botaoAssign} onPress={()=>this.checkAndSetPurchasePrice(false)}>
                    <Text style={{color:'#FFF', fontSize: 14, padding:5}}>Done</Text>
                  </TouchableOpacity>
              </View>
                <Text style={{color:'#000', fontSize:12, margin:10, marginTop:15}}>FEEDSTOCKS:</Text>

              <FlatList
              data={this.state.postsByUser}
              keyExtractor={item => item.id.toString() }
              renderItem={ ({item}) => <SimpleFeeds data={item}  actionId={newPurchaseId} action={'purchase'} /> }
              // refreshing={this.state.loadMyPosts}
              // onRefresh={this.handleRefreshingForAssigned}
              contentContainerStyle={{ paddingBottom: 300 }}
              />

            </View>
          </LinearGradient>
        </Modal>

        <Modal animationType='fade' visible={this.state.showPriceOfPurchase}>
          <View style={styles.myPostsModal}>
              <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                  <Text style={{color:'#000', fontSize:17, margin:22, fontWeight:'700', padding:10}}>PURCHASE PRICE</Text>
                <View style={{borderWidth:1, borderRadius:15, borderColor:'#2F6F4F', alignItems:'center',justifyContent:'center', padding:5, paddingLeft:15, paddingRight:15}}>
                  <Text style={{color:'#2F6F4F', fontSize:14, margin:10}}>HOW MUCH IT SHOULD BE:</Text>
                  <Text style={{color:'#2F6F4F', fontSize:22, margin:10}}>$ {parseFloat(this.state.purchasePrice).toFixed(2).toString()}</Text>

                </View>

                    <Text style={{color:'#000', fontSize:14, margin:12}}>PRICE ( $ ):</Text>
                    <TextInput 
                      style={styles.inputsMyTasks}
                      placeholder="price (optional)"
                      keyboardType='numeric'
                      underlineColorAndroid="transparent"
                      onChangeText={this.setPurchasePrice}
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                    />
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:5}}>
                  <TouchableOpacity style={styles.botaoAssign} onPress={()=>this.checkAndSetPurchasePrice(true)}>
                    <Text style={{color:'#FFF', fontSize: 14, padding:5}}>Done</Text>
                  </TouchableOpacity>
              </View>

          </View>
        </Modal>












{/* -------------------------------------------------------------------------------------------------------------------- */}





          {/*   MODAL - CREATE NEW  -   SALE   */}



        <Modal animationType='fade' visible={this.state.showAddProdsToSale}>
          <LinearGradient colors={['#fff','#DEB887']} style={styles.myPostsModal}>
              <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                <Text style={{color:'#333', fontSize: 10}}>Purchase ref: {newSaleId}</Text>
                <Text style={{color:'#000', fontSize:17, margin:22, fontWeight:'700', 
                      borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>ADD PRODUCTS TO THE SALE</Text>
                
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:5}}>
                  <TouchableOpacity style={styles.botaoAssign} onPress={()=>this.checkAndSetSalePrice(false)}>
                    <Text style={{color:'#FFF', fontSize: 14, padding:5}}>Done</Text>
                  </TouchableOpacity>
              </View>
                <Text style={{color:'#000', fontSize:12, margin:10, marginTop:15}}>PRODUCTS:</Text>

              <FlatList
              data={this.state.postsByUser}
              keyExtractor={item => item.id.toString() }
              renderItem={ ({item}) => <SimpleProds data={item}  actionId={newSaleId} action={'sale'} /> }
              // refreshing={this.state.loadMyPosts}
              // onRefresh={this.handleRefreshingForAssigned}
              contentContainerStyle={{ paddingBottom: 300 }}
              />

            </View>
          </LinearGradient>
        </Modal>

        <Modal animationType='fade' visible={this.state.showPriceOfSale}>
          <View style={styles.myPostsModal}>
              <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                  <Text style={{color:'#000', fontSize:17, margin:22, fontWeight:'700', padding:10}}>PURCHASE PRICE</Text>
                <View style={{borderWidth:1, borderRadius:15, borderColor:'#2F6F4F', alignItems:'center',justifyContent:'center', padding:5, paddingLeft:15, paddingRight:15}}>
                  <Text style={{color:'#2F6F4F', fontSize:14, margin:10}}>HOW MUCH IT SHOULD BE:</Text>
                  <Text style={{color:'#2F6F4F', fontSize:22, margin:10}}>$ {parseFloat(this.state.salePrice).toFixed(2).toString()}</Text>

                </View>

                    <Text style={{color:'#000', fontSize:14, margin:12}}>PRICE ( $ ):</Text>
                    <TextInput 
                      style={styles.inputsMyTasks}
                      placeholder="price (optional)"
                      keyboardType='numeric'
                      underlineColorAndroid="transparent"
                      onChangeText={this.setSalePrice}
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                    />
              </View>

              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:5}}>
                  <TouchableOpacity style={styles.botaoAssign} onPress={()=>this.checkAndSetSalePrice(true)}>
                    <Text style={{color:'#FFF', fontSize: 14, padding:5}}>Done</Text>
                  </TouchableOpacity>
              </View>

          </View>
        </Modal>




        {/* -------------------------------------------------------------------------------------------------------------------- */}





          {/*   MODAL - CREATE NEW  ---  PRODUCT   */}

          <Modal animationType='fade' visible={this.state.showAddProduct}>
          <View style={styles.myPostsModal}>
              <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                <Text style={{color:'#000', fontSize:17, margin:22, fontWeight:'700', 
                      borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>NEW PRODUCT</Text>
                <Text style={{color:'#000', fontSize:12, margin:3}}>NAME:</Text>
                <TextInput 
                  style={styles.inputsMyTasks}
                  placeholder="name"
                  underlineColorAndroid="transparent"
                  onChangeText={this.setProductName}
                  onSubmitEditing={() => { this.state.inputPrice.focus() }}
                />
                    <Text style={{color:'#000', fontSize:12, margin:3}}>PRICE ( $ ):</Text>
                    <TextInput 
                      style={styles.inputsMyTasks}
                      placeholder="price"
                      keyboardType='numeric'
                      underlineColorAndroid="transparent"
                      onChangeText={this.setProductPrice}
                      ref={(input) => {this.state.inputPrice = input;}}
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                    />
              </View>

              <View style={{justifyContent:'space-between', flexDirection:'row', margin:10, padding:20}}>
                <TouchableOpacity style={styles.botaoVoltarALista} onPress={()=>this.setState({showAddProduct:false})}>
                  <Text style={{color:'#FF2f28', fontSize: 15, margin:3, padding:5, fontWeight:'700'}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoSave} onPress={()=>this.fcnAskToCreateNewProduct()}>
                  <Text style={{color:'#2F6F4F', fontSize: 15, margin:3, padding:5, fontWeight:'700'}}>Next</Text>
                </TouchableOpacity>
              </View>

          </View>
        </Modal>


          <Modal animationType='fade' visible={this.state.showAddFeedsToProducts}>
          <LinearGradient colors={['#fff','#DEB887']} style={styles.myPostsModal}>
              <View style={{justifyContent:'flex-start', alignItems:'center', marginBottom:15}}>
                <Text style={{color:'#333', fontSize: 10}}>Product ref: {newProductId}</Text>
                <Text style={{color:'#000', fontSize:17, margin:22, fontWeight:'700', 
                      borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>ADD FEEDSTOCK TO PRODUCT</Text>
                
              <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center', margin:5}}>
                  <TouchableOpacity style={styles.botaoAssign} onPress={()=>this.setState({showAddFeedsToProducts:false, showAddProduct:true})}>
                    <Text style={{color:'#FFF', fontSize: 14, padding:5}}>Done</Text>
                  </TouchableOpacity>
              </View>
                <Text style={{color:'#000', fontSize:12, margin:10, marginTop:15}}>FEEDSTOCKS:</Text>

              <FlatList
              data={this.state.postsByUser}
              keyExtractor={item => item.id.toString() }
              renderItem={ ({item}) => <SimpleFeeds data={item}  actionId={newProductId} action={'product'} /> }
              contentContainerStyle={{ paddingBottom: 300 }}
              />

            </View>
          </LinearGradient>
        </Modal>





{/* -------------------------------------------------------------------------------------------------------------------- */}









          {/*   MODAL - MY LIST OF SALES  -  SALES   */}



          <Modal animationType='fade' visible={this.state.MyOwnPosted}>
          <LinearGradient colors={['#DEB887','#CD853F']} style={{marginTop:0,paddingTop:15,paddingBottom:15, alignSelf:'center'}}>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:Dimensions.get("screen").width, 
                              borderBottomWidth:1, borderColor:'#DEB887', marginBottom:0, paddingTop:14, padding:5, paddingBottom:5}}>
                  <TouchableOpacity onPress={()=>this.keepThisModal(false)} style={{width:44, height:44, borderWidth:1, alignItems:'center',
                                  justifyContent:'center',borderColor:'#F00000', borderRadius:22, marginLeft:10}} >
                    <Text style={{marginTop:-12, marginLeft:-3, fontSize:40, color:'#F00000'}}>{'<'}</Text>
                  </TouchableOpacity>

                    <Text style={{color:'#fff', fontSize:20, margin:5, fontWeight:'700', 
                        borderBottomWidth:0,borderBottomColor:'#DEB887', padding:10, marginLeft:-10}}>SALES</Text>

                    <TouchableOpacity onPress={()=>this.fcnEntryModal(true)} style={{width:44, height:44, borderWidth:1, alignItems:'center',
                                justifyContent:'center',borderColor:'#fff', borderRadius:22, marginRight:10}} >
                        <Text style={{marginTop:0, fontSize:8, color:'#fff'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={styles.smallTop}>
              <TouchableOpacity style={{padding:-10}} onPress={()=>this.keepThisModal(false)}>
                <Text style={styles.textSmallTop}>Products</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10}} onPress={()=>this.fcnAssignedPostsModal(true)}>
                <Text style={styles.textSmallTop}>Stock</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:2, backgroundColor:'#fff',borderWidth:1, borderColor:'#fff', borderRadius:20, marginTop:-12}} >
                <Text style={{alignSelf:'center', color:'#CD853F', fontWeight:'600', fontSize:14, padding:5, marginBottom:0, marginTop:0}}
                onPress={()=>this.setShowOptionsForMyTask(!this.state.showBuySellOptions)}>Purchase/Sale</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10}} onPress={()=>this.setShowNewActOptions(!this.state.showNewActOptions)}>
                <Text style={styles.textSmallTop}>New</Text>
              </TouchableOpacity>

            </View>
            {!this.state.showBuySellOptions ? 
            <View></View>
          : 
          <View style={{flexDirection:'row',  zIndex: 9, elevation: 8}}>
            <TouchableOpacity style={{flex:1, alignItems:'center',justifyContent:'center'}} onPress={()=>this.setShowOptionsForMyTask(!this.state.showBuySellOptions)}>
              {/* <Text style={{color:'#CD853F',fontSize:12}}>  X  </Text> */}
            </TouchableOpacity>
            <View style={{alignSelf:'flex-end', width:'65%',marginBottom:0,marginTop:5,  shadowColor: '#000', shadowOffset: {width:0, height: 2},  shadowOpacity: 1}}>
            <LinearGradient colors={['#CD853F','#DEB887']}  style={{padding:2, borderTopLeftRadius:20, borderWidth:0.5, backgroundColor:'#CD853F', borderColor:'#CD853F',  borderLeftColor:'#fff', borderBottomColor:'#fff'}}>
                <Text style={{alignSelf:'center', padding:10, color:'#FFF', fontWeight:'700', fontSize:9, fontStyle:'italic'}}>CHOOSE BELOW - PURCHASES OR SALES:</Text>
              </LinearGradient>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.fcnPurchaseModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Purchases</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F',borderBottomLeftRadius:20}} onPress={()=>this.fcnMyOwnPostsModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Sales</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
          {!this.state.showNewActOptions ? 
            <View></View>
          : 
          <View style={{flexDirection:'row',  zIndex: 9, elevation: 8}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.setShowNewActOptions(!this.state.showNewActOptions)}>
              {/* <Text style={{color:'#CD853F',fontSize:12}}>  X  </Text> */}
            </TouchableOpacity>
            <View style={{alignSelf:'flex-end', width:'65%',marginBottom:0, marginTop:5, elevation: 8, shadowColor: '#000', shadowOffset: {width:0, height: 2},  shadowOpacity: 1}}>
              <LinearGradient colors={['#CD853F','#DEB887']}  style={{padding:2, borderTopLeftRadius:20, borderWidth:0.5, backgroundColor:'#CD853F', borderColor:'#CD853F',  borderLeftColor:'#fff', borderBottomColor:'#fff'}}>
                <Text style={{alignSelf:'center', padding:10, color:'#FFF', fontWeight:'700', fontSize:9, fontStyle:'italic'}}>CHOOSE BELOW TO CREATE SOMETHING NEW:</Text>
              </LinearGradient>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5, backgroundColor:'#efefef', borderColor:'#CD853F',  borderLeftColor:'#fff'}} onPress={()=>this.fcnMyPostModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Feedstock</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.setState({showAddProduct:true, showBuySellOptions:false, showNewActOptions:false})}>
                <Text style={{color:'#CD853F',padding:10}}>Product</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.fcnAskToCreateNewPurchase()}>
                <Text style={{color:'#CD853F',padding:10}}>Purchase</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F',borderBottomLeftRadius:20}} onPress={()=>this.fcnAskToCreateNewSale()}>
                <Text style={{color:'#CD853F',padding:10}}>Sale</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
            <View style={{flexDirection:'row', marginLeft:0, alignItems:'center',justifyContent:'space-around', width:Dimensions.get("screen").width}}>

          </View>

            <View>
              {this.state.postsByUser.length == 0 ?
                  <View style={styles.botaoEmpty}>
                    <Text style={{color:'#CD853F', fontSize: 17, margin:3, padding:8}}>EMPTY</Text>
                  </View>
                :
                  <FlatList
                  data={this.state.postsByUser}
                  keyExtractor={item => item.id.toString() }
                  renderItem={ ({item}) => <Products data={item}/> }
                  // refreshing={this.state.loadMyPosts}
                  // onRefresh={this.handleRefreshingForMyTasks}
                  contentContainerStyle={{ paddingBottom: 250 }}
                  />
              }

          </View>
          
          </Modal>






{/* -------------------------------------------------------------------------------------------------------------------- */}



          {/*   MODAL - MY LIST OF PURCHASES  -  PURCHASES   */}



          <Modal animationType='fade' visible={this.state.purchaseModal}>
          <LinearGradient colors={['#DEB887','#CD853F']} style={{marginTop:0,paddingTop:15,paddingBottom:15, alignSelf:'center'}}>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:Dimensions.get("screen").width, 
                              borderBottomWidth:1, borderColor:'#DEB887', marginBottom:0, paddingTop:14, padding:5, paddingBottom:5}}>
                  <TouchableOpacity onPress={()=>this.keepThisModal(false)} style={{width:44, height:44, borderWidth:1, alignItems:'center',
                                  justifyContent:'center',borderColor:'#F00000', borderRadius:22, marginLeft:10}} >
                    <Text style={{marginTop:-12, marginLeft:-3, fontSize:40, color:'#F00000'}}>{'<'}</Text>
                  </TouchableOpacity>

                    <Text style={{color:'#fff', fontSize:20, margin:5, fontWeight:'700', 
                        borderBottomWidth:0,borderBottomColor:'#DEB887', padding:10, marginLeft:-10}}>PURCHASES</Text>

                    <TouchableOpacity onPress={()=>this.fcnEntryModal(true)} style={{width:44, height:44, borderWidth:1, alignItems:'center',
                                justifyContent:'center',borderColor:'#fff', borderRadius:22, marginRight:10}} >
                        <Text style={{marginTop:0, fontSize:8, color:'#fff'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={styles.smallTop}>
              <TouchableOpacity style={{padding:-10}} onPress={()=>this.keepThisModal(false)}>
                <Text style={styles.textSmallTop}>Products</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10}} onPress={()=>this.fcnAssignedPostsModal(true)}>
                <Text style={styles.textSmallTop}>Stock</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:2, backgroundColor:'#fff',borderWidth:1, borderColor:'#fff', borderRadius:20, marginTop:-12}} >
                <Text style={{alignSelf:'center', color:'#CD853F', fontWeight:'600', fontSize:14, padding:5, marginBottom:0, marginTop:0}}
                onPress={()=>this.setShowOptionsForMyTask(!this.state.showBuySellOptions)} >Purchase/Sale</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10}} onPress={()=>this.setShowNewActOptions(!this.state.showNewActOptions)}>
                <Text style={styles.textSmallTop}>New</Text>
              </TouchableOpacity>

            </View>
            {!this.state.showBuySellOptions ? 
            <View></View>
          : 
          <View style={{flexDirection:'row',  zIndex: 9, elevation: 8}}>
            <TouchableOpacity style={{flex:1, alignItems:'center',justifyContent:'center'}} onPress={()=>this.setShowOptionsForMyTask(!this.state.showBuySellOptions)}>
              {/* <Text style={{color:'#CD853F',fontSize:12}}>  X  </Text> */}
            </TouchableOpacity>
            <View style={{alignSelf:'flex-end', width:'65%',marginBottom:0,marginTop:5,  shadowColor: '#000', shadowOffset: {width:0, height: 2},  shadowOpacity: 1}}>
            <LinearGradient colors={['#CD853F','#DEB887']}  style={{padding:2, borderTopLeftRadius:20, borderWidth:0.5, backgroundColor:'#CD853F', borderColor:'#CD853F',  borderLeftColor:'#fff', borderBottomColor:'#fff'}}>
                <Text style={{alignSelf:'center', padding:10, color:'#FFF', fontWeight:'700', fontSize:9, fontStyle:'italic'}}>CHOOSE BELOW - PURCHASES OR SALES:</Text>
              </LinearGradient>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.fcnPurchaseModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Purchases</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F',borderBottomLeftRadius:20}} onPress={()=>this.fcnMyOwnPostsModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Sales</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
          {!this.state.showNewActOptions ? 
            <View></View>
          : 
          <View style={{flexDirection:'row',  zIndex: 9, elevation: 8}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.setShowNewActOptions(!this.state.showNewActOptions)}>
              {/* <Text style={{color:'#CD853F',fontSize:12}}>  X  </Text> */}
            </TouchableOpacity>
            <View style={{alignSelf:'flex-end', width:'65%',marginBottom:0, marginTop:5, elevation: 8, shadowColor: '#000', shadowOffset: {width:0, height: 2},  shadowOpacity: 1}}>
              <LinearGradient colors={['#CD853F','#DEB887']}  style={{padding:2, borderTopLeftRadius:20, borderWidth:0.5, backgroundColor:'#CD853F', borderColor:'#CD853F',  borderLeftColor:'#fff', borderBottomColor:'#fff'}}>
                <Text style={{alignSelf:'center', padding:10, color:'#FFF', fontWeight:'700', fontSize:9, fontStyle:'italic'}}>CHOOSE BELOW TO CREATE SOMETHING NEW:</Text>
              </LinearGradient>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5, backgroundColor:'#efefef', borderColor:'#CD853F',  borderLeftColor:'#fff'}} onPress={()=>this.fcnMyPostModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Feedstock</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.setState({showAddProduct:true, showBuySellOptions:false, showNewActOptions:false})}>
                <Text style={{color:'#CD853F',padding:10}}>Product</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.fcnAskToCreateNewPurchase()}>
                <Text style={{color:'#CD853F',padding:10}}>Purchase</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F',borderBottomLeftRadius:20}} onPress={()=>this.fcnAskToCreateNewSale()}>
                <Text style={{color:'#CD853F',padding:10}}>Sale</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
            <View style={{flexDirection:'row', marginLeft:0, alignItems:'center',justifyContent:'space-around', width:Dimensions.get("screen").width}}>

          </View>

            <View>
              {this.state.postsByUser.length == 0 ?
                  <View style={styles.botaoEmpty}>
                    <Text style={{color:'#CD853F', fontSize: 17, margin:3, padding:8}}>EMPTY</Text>
                  </View>
                :
                  <FlatList
                  data={this.state.postsByUser}
                  keyExtractor={item => item.id.toString() }
                  renderItem={ ({item}) => <Purchases data={item} /> }
                  // refreshing={this.state.loadMyPosts}
                  // onRefresh={this.handleRefreshingForMyTasks}
                  contentContainerStyle={{ paddingBottom: 250 }}
                  />
              }

          </View>
          
          </Modal>










{/* -------------------------------------------------------------------------------------------------------------------- */}






          {/*   MODAL - FEEDSTOCKES LIST - FEEDSTOCKES   */}


          <Modal animationType='fade' visible={this.state.FeedsModal}>
          <LinearGradient colors={['#DEB887','#CD853F']} style={{marginTop:0,paddingTop:15,paddingBottom:15, alignSelf:'center'}}>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:Dimensions.get("screen").width, 
                              borderBottomWidth:1, borderColor:'#DEB887', marginBottom:0, paddingTop:14, padding:5, paddingBottom:5}}>
                  <TouchableOpacity onPress={()=>this.keepThisModal(false)} style={{width:44, height:44, borderWidth:1, alignItems:'center',
                                  justifyContent:'center',borderColor:'#F00000', borderRadius:22, marginLeft:10}} >
                    <Text style={{marginTop:-12, marginLeft:-3, fontSize:40, color:'#F00000'}}>{'<'}</Text>
                  </TouchableOpacity>

                    <Text style={{color:'#fff', fontSize:18, margin:5, fontWeight:'700', 
                        borderBottomWidth:0,borderBottomColor:'#DEB887', padding:10, marginLeft:-10}}>STOCK</Text>

                    <TouchableOpacity onPress={()=>this.fcnEntryModal(true)} style={{width:44, height:44, borderWidth:1, alignItems:'center',
                                justifyContent:'center',borderColor:'#fff', borderRadius:22, marginRight:10}} >
                        <Text style={{marginTop:0, fontSize:8, color:'#fff'}}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <View style={styles.smallTop}>

              <TouchableOpacity style={{padding:-10}} onPress={()=>this.keepThisModal(false)}>
                <Text style={styles.textSmallTop}>Products</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:2, backgroundColor:'#fff',borderWidth:1, borderColor:'#fff', borderRadius:20, marginTop:-12}} >
                <Text style={{alignSelf:'center', color:'#CD853F', fontWeight:'600', fontSize:14, padding:5, marginBottom:0, marginTop:0}}>Stock</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10}} onPress={()=>this.setShowOptionsForMyTask(!this.state.showBuySellOptions)}>
                <Text style={styles.textSmallTop}>Purchase/Sale</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10}} onPress={()=>this.setShowNewActOptions(!this.state.showNewActOptions)}>
                <Text style={styles.textSmallTop}>New</Text>
              </TouchableOpacity>

            </View>

            {!this.state.showBuySellOptions ? 
            <View></View>
          : 
          <View style={{flexDirection:'row',  zIndex: 9, elevation: 8}}>
            <TouchableOpacity style={{flex:1, alignItems:'center',justifyContent:'center'}} onPress={()=>this.setShowOptionsForMyTask(!this.state.showBuySellOptions)}>
              {/* <Text style={{color:'#CD853F',fontSize:12}}>  X  </Text> */}
            </TouchableOpacity>
            <View style={{alignSelf:'flex-end', width:'65%',marginBottom:0,marginTop:5,  shadowColor: '#000', shadowOffset: {width:0, height: 2},  shadowOpacity: 1}}>
            <LinearGradient colors={['#CD853F','#DEB887']}  style={{padding:2, borderTopLeftRadius:20, borderWidth:0.5, backgroundColor:'#CD853F', borderColor:'#CD853F',  borderLeftColor:'#fff', borderBottomColor:'#fff'}}>
                <Text style={{alignSelf:'center', padding:10, color:'#FFF', fontWeight:'700', fontSize:9, fontStyle:'italic'}}>CHOOSE BELOW - PURCHASES OR SALES:</Text>
              </LinearGradient>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.fcnPurchaseModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Purchases</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F',borderBottomLeftRadius:20}} onPress={()=>this.fcnMyOwnPostsModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Sales</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
          {!this.state.showNewActOptions ? 
            <View></View>
          : 
          <View style={{flexDirection:'row',  zIndex: 9, elevation: 8}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.setShowNewActOptions(!this.state.showNewActOptions)}>
              {/* <Text style={{color:'#CD853F',fontSize:12}}>  X  </Text> */}
            </TouchableOpacity>
            <View style={{alignSelf:'flex-end', width:'65%',marginBottom:0, marginTop:5, elevation: 8, shadowColor: '#000', shadowOffset: {width:0, height: 2},  shadowOpacity: 1}}>
              <LinearGradient colors={['#CD853F','#DEB887']}  style={{padding:2, borderTopLeftRadius:20, borderWidth:0.5, backgroundColor:'#CD853F', borderColor:'#CD853F',  borderLeftColor:'#fff', borderBottomColor:'#fff'}}>
                <Text style={{alignSelf:'center', padding:10, color:'#FFF', fontWeight:'700', fontSize:9, fontStyle:'italic'}}>CHOOSE BELOW TO CREATE SOMETHING NEW:</Text>
              </LinearGradient>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5, backgroundColor:'#efefef', borderColor:'#CD853F',  borderLeftColor:'#fff'}} onPress={()=>this.fcnMyPostModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Feedstock</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.setState({showAddProduct:true, showBuySellOptions:false, showNewActOptions:false})}>
                <Text style={{color:'#CD853F',padding:10}}>Product</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.fcnAskToCreateNewPurchase()}>
                <Text style={{color:'#CD853F',padding:10}}>Purchase</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F',borderBottomLeftRadius:20}} onPress={()=>this.fcnAskToCreateNewSale()}>
                <Text style={{color:'#CD853F',padding:10}}>Sale</Text>
              </TouchableOpacity>
            </View>
          </View>
          }

            <View style={{flexDirection:'row', marginLeft:0, alignItems:'center',justifyContent:'space-around', width:Dimensions.get("screen").width}}>

                <View
                  style={{
                    width: Dimensions.get("screen").width/2,
                    alignSelf:'center',
                    marginTop: 2,
                    marginBottom:5,
                    borderColor: 'black',
                    borderBottomWidth:1,
                    borderRadius: 10
                  }}>
                  <Picker 
                    selectedValue={this.state.feedFilterCategory} 
                    onValueChange={(itemValue,itemIndex) => this.fcnGetFeedsByCategory(itemValue)}
                    style={{color:'#CD964F', paddingTop:5, marginTop:1}}
                    value={this.state.feedFilterCategory}
                    >
                      <Picker.Item key={98} value={98} label='Filter' />
                      <Picker.Item key={99} value={99} label='All categories' />
                      <Picker.Item key={0} value={0} label="OTHER"/>
                      <Picker.Item key={1} value={1} label="CONSUMABLES"/>
                      <Picker.Item key={2} value={2} label="PRODUCTION"/>
                      <Picker.Item key={3} value={3} label="PRODUCT"/>
                      <Picker.Item key={4} value={4} label="FEEDSTOCK"/>
                  </Picker>

                </View>

              
          </View>

          <View>
              {this.state.feedstocksList.length == 0 ?
                  <View style={styles.botaoEmpty}>
                    <Text style={{color:'#CD853F', fontSize: 17, margin:3, padding:8}}>EMPTY</Text>
                  </View>
                :
                  <FlatList
                  data={this.state.feedstocksList}
                  keyExtractor={item => item.id.toString() }
                  renderItem={ ({item}) => <Feeds data={item} /> }
                  refreshing={this.state.loading}
                  onRefresh={this.handleRefreshingForAssigned}
                  contentContainerStyle={{ paddingBottom: 250 }}
                  />
              }

          </View>

              {/* <FlatList
              data={this.state.postsByUser}
              keyExtractor={item => item.id.toString() }
              renderItem={ ({item}) => <Feeds data={item} /> }
              refreshing={this.state.loadMyPosts}
              onRefresh={this.handleRefreshingForAssigned}
              contentContainerStyle={{ paddingBottom: 20 }}
              /> */}

          
              
          </Modal>





{/* -------------------------------------------------------------------------------------------------------------------- */}



          {/* VIEW - SMALL TOP MENU ON POSTS LIST SCREEN --   PRODUCTS   */}

          <Modal animationType='fade' visible={this.state.ProductsModal}>

          <LinearGradient colors={['#DEB887', '#CD853F']} style={{marginTop:10, alignSelf:'center'}}>
            {/* <Text style={{color:'#000', fontSize:20, margin:5, fontWeight:'700', 
                      borderBottomWidth:0,borderBottomColor:'#09AFFF', padding:10}}>OLA TASK</Text> */}
            <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', width:Dimensions.get("screen").width, 
                          borderBottomWidth:0.4,borderColor:'#fff', marginBottom:0, marginTop:14, padding:5, paddingBottom:5}}>
              <TouchableOpacity onPress={()=>
                  Alert.alert(
                    'Stareng Technology',
                    '\nVisit our website:\n\n'+'www.starengtech.com\n\nDeveloped by:\nThiago Trolle Cavalheiro',
                    [{ text: 'OK'}],
                    {cancelable: false},
                  ) 
            } style={{width:44, height:44, borderWidth:1, alignItems:'center',
                              justifyContent:'center',borderColor:'#fff', borderRadius:22, marginLeft:10}} >
                <Text style={{marginTop:0, fontSize:8, color:'#fff'}}>Stareng</Text>
              </TouchableOpacity>

                <Text style={{color:'#fff', fontSize:21, margin:0, fontWeight:'700',borderBottomColor:'#777', padding:10, marginLeft:-10}}>
                   ASM Manager
                </Text>

                <TouchableOpacity onPress={()=>this.fcnEntryModal(true)} style={{width:44, height:44, borderWidth:1, alignItems:'center',
                                justifyContent:'center',borderColor:'#fff', borderRadius:22, marginRight:10}} >
                    <Text style={{marginTop:0, fontSize:8, color:'#fff'}}>Logout</Text>
                </TouchableOpacity>
            </View>
                <Text style={{ alignSelf:'center',color:'#fff', fontSize:12, margin:0,borderBottomColor:'#777', padding:10, marginLeft:-10}}>
                    Project: {this.state.userName}
                </Text>
          </LinearGradient>
          <View style={styles.smallTop}>

            <TouchableOpacity style={{padding:2, backgroundColor:'#fff',borderWidth:1, borderColor:'#fff', borderRadius:20, marginTop:-12}} >
              <Text style={{alignSelf:'center', color:'#CD853F', fontWeight:'600', fontSize:14, padding:5, marginBottom:0, marginTop:0}}>Products</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:-10}} onPress={()=>this.fcnAssignedPostsModal(true)}>
              <Text style={styles.textSmallTop}>Stock</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:-10}} onPress={()=>this.setShowOptionsForMyTask(!this.state.showBuySellOptions)}>
              <Text style={styles.textSmallTop}>Purchase/Sale</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{padding:-10}} onPress={()=>this.setShowNewActOptions(!this.state.showNewActOptions)}>
              <Text style={styles.textSmallTop}>New</Text>
            </TouchableOpacity>

          </View>

          {!this.state.showBuySellOptions ? 
            <View></View>
          : 
          <View style={{flexDirection:'row',  zIndex: 9, elevation: 8}}>
            <TouchableOpacity style={{flex:1, alignItems:'center',justifyContent:'center'}} onPress={()=>this.setShowOptionsForMyTask(!this.state.showBuySellOptions)}>
              {/* <Text style={{color:'#CD853F',fontSize:12}}>  X  </Text> */}
            </TouchableOpacity>
            <View style={{alignSelf:'flex-end', width:'65%',marginBottom:0,marginTop:5,  shadowColor: '#000', shadowOffset: {width:0, height: 2},  shadowOpacity: 1}}>
            <LinearGradient colors={['#CD853F','#DEB887']}  style={{padding:2, borderTopLeftRadius:20, borderWidth:0.5, backgroundColor:'#CD853F', borderColor:'#CD853F',  borderLeftColor:'#fff', borderBottomColor:'#fff'}}>
                <Text style={{alignSelf:'center', padding:10, color:'#FFF', fontWeight:'700', fontSize:9, fontStyle:'italic'}}>CHOOSE BELOW - PURCHASES OR SALES:</Text>
              </LinearGradient>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.fcnPurchaseModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Purchases</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F',borderBottomLeftRadius:20}} onPress={()=>this.fcnMyOwnPostsModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Sales</Text>
              </TouchableOpacity>
            </View>
          </View>
          }
          {!this.state.showNewActOptions ? 
            <View></View>
          : 
          <View style={{flexDirection:'row',  zIndex: 9, elevation: 8}}>
            <TouchableOpacity style={{flex:1}} onPress={()=>this.setShowNewActOptions(!this.state.showNewActOptions)}>
              {/* <Text style={{color:'#CD853F',fontSize:12}}>  X  </Text> */}
            </TouchableOpacity>
            <View style={{alignSelf:'flex-end', width:'65%',marginBottom:0, marginTop:5, elevation: 8, shadowColor: '#000', shadowOffset: {width:0, height: 2},  shadowOpacity: 1}}>
              <LinearGradient colors={['#CD853F','#DEB887']}  style={{padding:2, borderTopLeftRadius:20, borderWidth:0.5, backgroundColor:'#CD853F', borderColor:'#CD853F',  borderLeftColor:'#fff', borderBottomColor:'#fff'}}>
                <Text style={{alignSelf:'center', padding:10, color:'#FFF', fontWeight:'700', fontSize:9, fontStyle:'italic'}}>CHOOSE BELOW TO CREATE SOMETHING NEW:</Text>
              </LinearGradient>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5, backgroundColor:'#efefef', borderColor:'#CD853F',  borderLeftColor:'#fff'}} onPress={()=>this.fcnMyPostModal(true)}>
                <Text style={{color:'#CD853F',padding:10}}>Feedstock</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.setState({showAddProduct:true, showBuySellOptions:false, showNewActOptions:false})}>
                <Text style={{color:'#CD853F',padding:10}}>Product</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F', borderLeftColor:'#fff'}} onPress={()=>this.fcnAskToCreateNewPurchase()}>
                <Text style={{color:'#CD853F',padding:10}}>Purchase</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{padding:-10, borderWidth:0.5,backgroundColor:'#efefef', borderColor:'#CD853F',borderBottomLeftRadius:20}} onPress={()=>this.fcnAskToCreateNewSale()}>
                <Text style={{color:'#CD853F',padding:10}}>Sale</Text>
              </TouchableOpacity>
            </View>
          </View>
          }

              
          {/* </View> */}
                         

          {/* <ReversedFlatList */}
          
          <FlatList
          data={this.state.posts}
          keyExtractor={item => item.id.toString() }
          renderItem={ ({item}) => <Product data={item} userId={this.state.userID}/> }
          refreshing={this.state.loadMyPosts}
          onRefresh={this.handleRefreshing}
          contentContainerStyle={{ paddingBottom: 200 }}
          />

      </Modal>

 


          {/* LOADING ZONE - ALL LOADINGS */}

          <Modal animationType='fade' transparent={true} visible={this.state.loadMyPosts} style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
              <LinearGradient colors={['#DEB887', '#fff']} style={{marginTop:165, alignSelf:'center', width:130, height:130, backgroundColor:'#FFf', borderWidth:1, borderColor:'#CD853F', borderRadius:55}}>
                <View style={{alignItems: 'center', justifyContent: 'center', flex:1}}>
                  <ActivityIndicator color="#CD853F" size={35}/>
                  <Text style={{color:'#DEB887', fontSize:8}}>wait</Text>
                </View>
              </LinearGradient>
          </Modal>





  
    </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop:30
  },
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
  entryModal:{
    flex:1,
    // backgroundColor:'#DEB887',
    justifyContent:'flex-start',
    alignItems:'center'
  },
  smallTop:{
    backgroundColor:'#CD853F',
    padding:5,
    paddingTop:18,
    paddingTop:5,
    flexDirection:'row',
    justifyContent:'space-around',
    borderBottomLeftRadius:58,
    borderBottomRightRadius:58,
    borderTopWidth:0.5,
    borderTopColor:'#fff'
  },
  smallTop2:{
    paddingTop:2,
    flexDirection:'row',
    justifyContent:'space-around',
    borderBottomWidth:1,
    borderBottomColor:'#09AFFF'
  },
  
  myPostsModal:{
    flex:1,
    backgroundColor:'#FFF',
    padding:10
  },
  inputsEntry:{
    width:350,
    height:50,
    color:'#111',
    borderWidth:1,
    borderColor:'#FFF',
    borderRadius:10,
    margin:10,
    fontSize:15,
    padding:10
  },
  inputsNewLogin:{
    width:350,
    height:45,
    color:'#FFF',
    borderWidth:1,
    borderColor:'#FFF',
    borderRadius:10,
    margin:5,
    marginBottom:16,
    fontSize:15,
    padding:10
  },
  inputsMyTasks:{
    width:350,
    height:55,
    borderWidth:1,
    borderColor:'#000',
    color:'#6495ED',
    borderRadius:10,
    margin:10,
    fontSize:15,
    padding:10
  },
  inputsMyTasksMiddle:{
    width:350,
    height:80,
    borderWidth:1,
    borderColor:'#000',
    color:'#6495ED',
    borderRadius:10,
    marginTop:-5,
    fontSize:15,
    padding:10,
    alignContent:'flex-start',
    justifyContent:'flex-start'
  },
  inputsMyTasksBigger:{
    width:350,
    height:110,
    borderWidth:1,
    borderColor:'#000',
    color:'#6495ED',
    borderRadius:10,
    margin:10,
    fontSize:15,
    padding:10,
    alignContent:'flex-start',
    justifyContent:'flex-start'
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
  textSmallTop:{
    color:'#FFF', 
    fontWeight:'600',
    fontSize:14,
    padding:5,
    paddingTop:15, 
    marginBottom:0,
    marginTop:-5
  },
  textSmallTop2:{
    color:'#09AFFF', 
    fontSize:15, 
    margin:5,
    marginBottom:15,
    padding:10,
    paddingTop:10,
    paddingBottom:5
  },
  textInput:{
    textAlign:'center',
    fontSize:25
  },
  botaoEntry:{
      width:350,
      height:60,
      borderWidth:1,
      borderColor:'#fff',
      marginTop:40,
      marginBottom:10,
      padding: 10,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center'
  
    },
    botaoTexto:{
      textAlign: 'center',
      fontSize:18,
      color: '#fff'
    },
    botaoMyPostBack:{
      width:150,
      borderWidth:1,
      borderColor:'#FF2f28',
      //marginTop:25,
      //marginBottom:10,
      //padding: 8,
      borderTopLeftRadius:20,
      borderBottomLeftRadius:20,
      alignItems:'center',
      justifyContent:'center'
  
    },
    botaoTextoMyPostBack:{
      textAlign: 'center',
      fontSize:14,
      margin:1,
      padding:10,
      color: '#FF2f28'
    },
    botaoMyPostSave:{
      width:300,
      backgroundColor:'#09AFFF',
      marginTop:30,
      marginBottom:20,
      padding: 8,
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center'
  
    },
    botaoTextoMyPostSave:{
      textAlign: 'center',
      fontSize:14,
      margin:2,
      color: '#FFF'
    },
    botaoMyPostSaveTasks:{
      //width:90,
      backgroundColor:'#2F4F4F',
      marginTop:-25,
      marginBottom:35,
      padding: 7,
      borderRadius:26,
      alignItems:'center',
      justifyContent:'center'
  
    },
    botaoTextoMyPostSaveTasks:{
      textAlign: 'center',
      fontSize:13,
      margin:1,
      color: '#FFF'
    },
    botaoAssign:{
      width:150,
      borderWidth:2,
      borderColor:'#778899',
      marginTop:0,
      padding: 5,
      alignItems:'center',
      justifyContent:'center',
      shadowColor: '#000',
      backgroundColor: '#2F4F4F',
      shadowOffset: {width:0, height: 1},
      shadowOpacity: 1,
      shadowRadius: 7,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      elevation: 6,
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
    botaoSubmit:{
      width:280,
      borderWidth:2,
      borderColor:'#778899',
      padding: 8,
      marginTop: 30,
      marginBottom: 60,
      alignItems:'center',
      justifyContent:'center',
      shadowColor: '#000',
      backgroundColor: '#CD853F',
      shadowOffset: {width:0, height: 1},
      shadowOpacity: 1,
      shadowRadius: 7,
      borderRadius: 15,
      elevation: 6,
    },
    botaoAssigned:{
      alignSelf:'center',
      width:180,
      borderWidth:2,
      borderColor:'#778899',
      marginTop:60,
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
    }
    ,
    botaoEmpty:{
      alignSelf:'center',
      width:190,
      borderWidth:1,
      borderColor:'#778899',
      marginTop:60,
      padding: 0,
      borderRadius:40,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#FFF',
      borderRadius: 10
    }
});

export default App;