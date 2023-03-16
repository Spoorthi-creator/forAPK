import React, { useEffect, useState } from "react";
import { View, Text ,Dimensions,FlatList} from "react-native";
//import { FlashList } from "@shopify/flash-list";
import {db,collection,addDoc,setDoc,doc,auth,getDocs} from "../firebase"


export default function AllJournals () {
    const[journalData,setJournalData]=useState([]);
    const { height, width } = Dimensions.get("window");
    useEffect(()=>{
        getData();
    },[]);

    const getData=async()=>{
        const querySnapshot = await getDocs(collection(db,auth.currentUser.email));
        const journal = [];
querySnapshot.forEach((doc) => {
journal.push({
...doc.data(),
id:doc.id
});
console.log(doc.id, " => ", doc.data());
// setJournalData({...doc.data(),
// //journal:doc.data().journal,
// id: doc.id,
// });

});
setJournalData(journal);
    };

   


  return (
  
    <View style={{flex:1,width:width,height:height,alignContent:'center'}}>
  {
    journalData ?
    
    <FlatList
  
      data={journalData}
      renderItem={({ item }) => <Text style={{fontSize:15}}>{item.journal}</Text>}
      keyExtractor={item=>item.id}
    //  estimatedItemSize={200}
    />
    : alert('No records at the moment')
  }
    </View>
   
  );

};
