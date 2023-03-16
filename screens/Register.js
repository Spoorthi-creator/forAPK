import {useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import styles from "../styles";
 //import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {db,createUserWithEmailAndPassword,auth,addDoc,collection,setDoc,doc} from "../firebase"
//import firebase from "firebase";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
  withSequence,
  withSpring
} from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Register  = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const { height, width } = Dimensions.get("window");
  const formButtonScale = useSharedValue(1);
 
  let validateAndSet = (value,setValue) => {
   setValue(value)
}

const formButtonAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{scale: formButtonScale.value}]
  }
})
function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword){
    setValidationMessage('Password do not match') 
  }
  else setValidationMessage('')
}
   async function createAccount() {
    email === '' || password === '' 
    ? setValidationMessage('required filled missing')
    : ''
    
    await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    
    setDoc(doc(db, "users",auth.currentUser.email),{
           email: email,
              password:password
      
     });

     alert("Welcome to MyJournal");
          navigation.navigate('Home',{name});
          setEmail="";
          setName="";
          setPassword="";
          setConfirmPassword="";
     
    }).catch ((error) =>{
      setValidationMessage(error.message);
      
   });
  }
  return (
    <View styles={{flex:1}}>
      <ImageBackground source={require('../assets/2.png')} style={{width:width,height:height,}}resizeMode="cover">
     
      <View style={{borderRadius:50,backgroundColor:'white',justifyContent:'center',height:height/1.5,margin:10,marginTop:height/5.9,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}> 
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: '10%', marginTop: '5%', color: '#FFCC00' }}>REGISTER</Text>
      <Input
          placeholder='Name'
          placeholderTextColor={'black'}
          containerStyle={{marginTop: 10}}
          value={name}
          onChangeText={(text) => setName(text)}
         
          leftIcon={<Ionicons name="person-outline" size={16} color="black" />}
          
            />

        
        <Input
          placeholder='Email'
          placeholderTextColor={'black'}
          containerStyle={{marginTop: 10}}
          value={email}
          onChangeText={(text) => setEmail(text)}
          leftIcon={<MaterialCommunityIcons name="email-outline" size={16} color="black" />}
            />
        <Input
          placeholder='Password'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'black'}
          value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry
          leftIcon={<Icon name='key' size={16} color="black"/>}
          

            />
        <Input
          placeholder='Confirm password'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'black'}
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value,setConfirmPassword)}
          secureTextEntry
          leftIcon={<Icon name='key' size={16} color="black"/>}
          onBlur={()=>checkPassword(password,confirmPassword)}
            />  
            {<Text style={styles.error}>{validationMessage}</Text>}
        {/* <Button title="Sign up" buttonStyle={{marginTop:10}} onPress={createAccount} /> */}

        <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable onPress={createAccount}>
              <Text style={styles.buttonText}>
               REGISTER
              </Text>
            </Pressable>
            </Animated.View>
            </View>
        </ImageBackground>
      
    </View>
  );
}

export default Register;