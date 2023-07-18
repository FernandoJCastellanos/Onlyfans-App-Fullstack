import { Link } from 'expo-router';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import users from '../assets/data/users';
import UserCard from '../src/components/UserCard';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { User } from '../src/models';




export default function Page() {

  const [users, setUsers] = useState([]);

  const { signOut } = useAuthenticator();
  useEffect(() => {
    // fetch users
    DataStore.query(User).then(setUsers);
  }, []);



  return (
    <View style={styles.container}>
      <View style={styles.optioncontainer}>
        <View style={styles.newpostcontainer}>
          <Link style={styles.newpost} href={'/newPost'}>New post</Link>
        </View>
        <View style={styles.signoutcontainer}>
          <Text style={styles.signout}onPress={() => signOut()}>Sign out</Text>
        </View>

      </View>


      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 75,
  },
  optioncontainer: {
    flex: 1,
    flexDirection: 'row',
    
    display: "flex",
    
  },
  newpostcontainer: {
    position: "relative",
    display: "flex",
    flex: 1,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  newpost: {
    position: "relative",
    display: "flex",
    paddingLeft: "33%",
    paddingRight: "33%",
    paddingTop: "10%",
    paddingBottom: "10%",

  },
  signoutcontainer: {
    position: "relative",
    display: "flex",
    flex: 1,
    backgroundColor: "grey",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signout: {
    position: "relative",
    display: "flex",
    paddingLeft: "33%",
    paddingRight: "33%",
    paddingTop: "10%",
    paddingBottom: "10%",
  }
});
