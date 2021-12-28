import { StatusBar } from 'expo-status-bar'; 
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


const nodeos_url='http://149.28.41.105:80';
//const PicoApi = new  RpcApi(nodeos_url, 'eosio.token');
const token= 'eosio.token'


export default function App() {
  const [publicKey, setPublicKey] = useState('EOS6ETMtoBJrGDMxFRumnr9Qe4MMVQzpdT2xoNdeYActs5YiF6FA2')
  const [privateKey, setPrivateKey] = useState('5K4G5UP9875eUSo73SDS8Z3bnouNtW57uRH7LtSrBFoQ3wCH8vf')
  const [username, setUsername] = useState('')
  const [data, setData] = useState('')

  async function login() {
    const privateKeys = [privateKey];
    //const signatureProvider = new JsSignatureProvider(privateKeys);
    
    const payload = {
      code: token,
      account: username,
      symbol: 'WWW'
    }

    const res =  await fetch(
      `${nodeos_url}/v1/chain/get_currency_balance`,
      {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    //const rpc = new JsonRpc(nodeos_url); //required to read blockchain state
    //const api = new Api({ rpc, signatureProvider }); //required to submit transactions
  	//const block = await rpc.get_account(username) //get the first block
    console.log(data);
    
    setData(JSON.stringify(data, null, 2))
	}


  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <Text>Username</Text>
        <TextInput value={username} onChangeText={setUsername} style={styles.input} />
      </View>

      <View style={styles.inputView}>
        <Text>Public Key</Text>
        <TextInput value={publicKey} onChangeText={setPublicKey} style={styles.input} />
      </View>
      
      <View style={styles.inputView}>
        <Text>Private Key</Text>
        <TextInput value={privateKey} onChangeText={setPrivateKey} style={styles.input} />
      </View>
      <View style={styles.row}>
        <View style={styles.button}>
          <Button title='login' onPress={login} />
        </View>
        <View style={styles.button}>
          <Button title='clear' onPress={()=>setData('')} color={'red'} />
        </View>
      </View>
      <View style={styles.scroll}>
        <ScrollView >
          <Text>{data}</Text>
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  scroll:{
    height:200, 
    borderWidth: 1,
    borderColor: 'black', 
    marginVertical: 10,
  width: '100%'
  },
  row:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  input:{
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    height: 40,
    paddingHorizontal: 5,
    paddingVertical: 3
  },
  inputView:{
    width: '100%',
    marginVertical:10
  },
  button:{
    marginHorizontal: 10
  },
})
