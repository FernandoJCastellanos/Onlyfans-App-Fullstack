import { useSearchParams } from 'expo-router';
import { Text, StyleSheet, FlatList, View } from 'react-native';
import users from '../../assets/data/users';
import { useState, useEffect } from 'react';
import UserProfileHeader from '../../src/components/UserProfileHeader';
import posts from '../../assets/data/posts';
import Post from '../../src/components/Posted';
import { FontAwesome5 } from '@expo/vector-icons';
import { DataStore } from 'aws-amplify';
import { User, Post as PostModel } from '../../src/models';



const ProfilePage = () => {

  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const { id } = useSearchParams();

  // const user = users.find((u) => u.id === id);
  useEffect(() => {
    DataStore.query(User, id).then(setUser);
    DataStore.query(PostModel, (post) => post.userID.eq(id)).then(setPosts);
  }, [id]);


  if (!user) {
    return <Text>User not found!</Text>;
  }

  if (!isSubscribed) {
    return (
      <View>
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />

        <View
          style={{
            backgroundColor: 'gainsboro',
            alignItems: 'center',
            padding: 20,
          }}
        >
          <FontAwesome5 name="lock" size={50} color="gray" />
          <Text
            style={{
              backgroundColor: 'royalblue',
              height: 50,
              borderRadius: 25,
              overflow: 'hidden',
              padding: 15,
              color: 'white',
              margin: 20,
            }}
          >
            Subscribe to see user's posts
          </Text>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <Post post={item} />}
      ListHeaderComponent={() => (
        <UserProfileHeader
          user={user}
          isSubscribed={isSubscribed}
          setIsSubscribed={setIsSubscribed}
        />
      )}
      
    />
  );
};

const styles = StyleSheet.create({});
export default ProfilePage;
