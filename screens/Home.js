import {useEffect, useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable, ScrollView ,TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import styles from "../styles";

// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {db,collection,addDoc,setDoc,doc,auth} from "../firebase"
//import firebase from "firebase";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  
  
} from "react-native-reanimated";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateDoc } from 'firebase/firestore';



const Home  = ({ route,navigation }) => {
  //const [jounal, setValue] = useState("")
  const[journal,setjournal]=useState("");
  const {name}=route.params;
  const { height, width } = Dimensions.get("window");
  const formButtonScale = useSharedValue(1);

  useEffect(()=>{
  //   journalRef.orderBy.onSnapshot(querySnapshot=>{
  //     const journal=[]
  //     querySnapshot.forEach((doc)=>{
  //       const {heading}=doc.data()
  //       journal.push({
  //         id:doc.id,
  //         heading
  //       })
  //     })
  //     myjournal(journal)
  //   })
   },[])
  // let validateAndSet = (value,setValue) => {
  //  setValue(value)
//}
const saveJournal=async()=>{
  try {
   
     await addDoc(collection(db,auth.currentUser.email), {
      journal: journal,
      
    });
   // console.log("Document written with ID: ", docRef.id);
    alert('Journal saved');
    navigation.navigate('AllJournals');
    setjournal=="";

    
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Oops! Something went wrong, try again");
  }
}
const formButtonAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{scale: formButtonScale.value}]
  }
})

  return (
    <View styles={{flex:1,height:height}}>
      <ImageBackground source={require('../assets/signup.png')} style={{width:width,height:height}}>

        <View>
          <Text style={{alignSelf:'flex-start',fontSize:20,color:'black',marginTop:30,margin:5}}>Hi {name}!</Text>
            <Text style={{alignSelf:'flex-start',fontSize:20,color:'white',margin:5}}>How was your day today?</Text>
            <ScrollView horizontal>
                <View stye={{margin:4,justifyContent:'center',alignItems:'center',padding:10}}>
                     <Image source={require('../assets/smiling-cool.png')} style={{height:100,width:100,backgroundColor:'white',borderRadius:10,padding:20,margin:10}}></Image>
                     <Text style={{alignSelf:'center'}}>Cool</Text>
                </View>
                <View stye={{margin:4,justifyContent:'center',alignItems:'center',padding:10}}>
                     <Image source={require('../assets/smiling.png')} style={{height:100,width:100,backgroundColor:'white',borderRadius:10,padding:20,margin:10}}></Image>
                     <Text style={{alignSelf:'center'}}>Happy</Text>
                </View>

                <View stye={{margin:4,justifyContent:'center',alignItems:'center',padding:10}}>
                     <Image source={require('../assets/smiling-tear.png')} style={{height:100,width:100,backgroundColor:'white',borderRadius:10,padding:20,margin:10}}></Image>
                     <Text style={{alignSelf:'center'}}>Happy tears</Text>
                </View>

                <View stye={{margin:4,justifyContent:'center',alignItems:'center',padding:10}}>
                     <Image source={require('../assets/crying-face.png')} style={{height:100,width:100,backgroundColor:'white',borderRadius:10,padding:20,margin:10}}></Image>
                     <Text style={{alignSelf:'center'}}>Not so great</Text>
                </View>
            </ScrollView>
       
     <KeyboardAwareScrollView>
      <View style={{borderRadius:50,backgroundColor:'white',height:height/1.7,margin:10,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor:'grey', borderWidth:5}}> 
      
      <TextInput
      placeholder='How are you feeling at this moment?'
        editable
        autoCorrect
        multiline
        numberOfLines={10}
        maxLength={500}
        onChangeText={text => setjournal(text)}
        value={journal}
        style={{padding: 10,fontStyle:'italic'}}
      />
      <TouchableOpacity
  onPress={() => navigation.navigate('AllJournals')}
  style={{height:20,width:20,borderRadius:50,marginTop:150,marginLeft:width-100}}>
  <Image source={require("../assets/dairy3.jpeg")} style={{height:70,width:70,borderRadius:50}}></Image>
</TouchableOpacity>
        </View>
       </KeyboardAwareScrollView>
      
        <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable onPress={saveJournal} >
              <Text style={styles.buttonText}>
               SAVE
              </Text>
            </Pressable>
            </Animated.View>
          



            </View>

  
        </ImageBackground>
      
    </View>
  );
}

export default Home;