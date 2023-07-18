import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Entypo, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { User, Post } from '../models';
import { DataStore, Storage } from 'aws-amplify';



const Posted = ({ post }) => {

  const [user, setUser] = useState();
  const [imageUri, setImageUri] = useState();
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    DataStore.query(User, post.userID).then(setUser);
  }, []);

  useEffect(() => {
    if (post.image) {
      Storage.get(post.image).then(setImageUri);
    }
  }, [post.image]);

  const [currentLikes, setCurrentLikes] = useState(post.likes);

  const handleLikes = (n) => {
    setCurrentLikes(prevLikes => prevLikes + n);
  };
  const handleIsLiked = () => {
    setIsLiked(!isLiked)
  };
  const handlePress = async (e, post) => {

    if (isLiked) {
      e.preventDefault();
      const postToChange = await DataStore.query(Post, post.id);
      await DataStore.save(Post.copyOf(postToChange, updated => {
        updated.likes -= 1;
      }));
      handleLikes(-1);
      handleIsLiked();
    } else {
      e.preventDefault();
      const postToChange = await DataStore.query(Post, post.id);
      await DataStore.save(Post.copyOf(postToChange, updated => {
        updated.likes += 1;
      }));
      handleLikes(1);
      handleIsLiked();
    };
  };

  return (
    <View style={{ marginVertical: 15 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <Image
          src={user?.avatar}
          style={{
            width: 50,
            aspectRatio: 1,
            borderRadius: 50,
            marginRight: 10,
          }}
        />
        <View>
          <Text style={{ fontWeight: '600', fontSize: 16, marginBottom: 3 }}>
            {user?.name}
          </Text>
          <Text style={{ color: 'gray' }}>@{user?.handle}</Text>
        </View>

        <View
          style={{
            marginLeft: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={{ marginRight: 5, color: 'gray' }}>3 hours ago</Text>
          <Entypo name="dots-three-horizontal" size={18} color="gray" />
        </View>
      </View>

      <Text style={{ margin: 10, lineHeight: 18 }}>{post.text}</Text>

      { imageUri && (
        <Image src={imageUri} style={{ width: '100%', aspectRatio: 1 }} />
      )
      }

      <View style={{ margin: 10, flexDirection: 'row' }}>          
        <TouchableOpacity>
          <AntDesign
            onPress={(e) => handlePress(e, post)}
              // onPress={async e => {
              // e.preventDefault()
              // const postToChange = await DataStore.query(Post, post.id)
              // await DataStore.save(Post.copyOf(postToChange, updated => {
              //   updated.likes += 1
              // }))}
              // }
            name={isLiked ? "heart" : "hearto"}
            size={22}
            color={isLiked ? "red" : "grey"}
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>


        <FontAwesome5
          name="dollar-sign"
          size={20}
          color="gray"
          style={{ marginRight: 15 }}
        />
      </View>

      <Text style={{ fontWeight: '500', marginHorizontal: 10 }}>
        {currentLikes} Likes
      </Text>
    </View>
  );
};

export default Posted;
