import { Icon, Input, VStack, View, Avatar } from "native-base";
import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native";
import Ionicon from "react-native-vector-icons/Ionicons";
import { useSelector, useDispatch } from "react-redux";

import CustomText from "../components/custom/Text";
import colors from "../constants/Colors";
import { posts_data } from "../constants/dummy-data";
import { useEffect, useState } from "react";
import AwesomeLoading from "react-native-awesome-loading";
import Loading from "../components/Loading";
import PostItem from "../components/list-items/PostItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchPosts } from "../store/actions/postActions";
import { screens } from "../constants/navigation";

const PostsList = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const postsList = useSelector((state) => state.post.posts);
  const [posts, setPosts] = useState([]);
  const isDataFetching = useSelector((state) => state.post.isFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem("session")
      .then((jsonValue) => JSON.parse(jsonValue))
      .then((user) => dispatch(fetchPosts(user.grade, user.section)))
      .catch((err) => console.log("Error: " + err));
  }, []);

  useEffect(() => {
    setPosts(postsList);
  }, [postsList]);

  const search = () => {
    setIsSearching(true);

    if (!searchValue) setPosts(postsList);
    else
      setPosts(
        posts_data.filter((post) => post.post_title.includes(searchValue))
      );

    setIsSearching(false);
  };

  const onPressPost = (id) => {
    props.navigation.navigate(screens.post, { id: id });
  };

  const renderPost = ({ item }) => (
    <PostItem
      key={item.id}
      post={item}
      onPressHandler={(id) => onPressPost(id)}
    />
  );

  if (isDataFetching && postsList.length === 0) {
    return <Loading text="Fetching Posts..." />;
  }

  return (
    <VStack padding={3} space={4}>
      <View borderBottomWidth={1} paddingY={2}>
        <Input
          placeholder="Search..."
          variant="outline"
          width="100%"
          borderWidth={1}
          fontSize={16}
          borderRadius="full"
          borderColor={colors.black}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
          onSubmitEditing={search}
          InputLeftElement={
            <Icon
              ml={3}
              size={5}
              color={colors.black}
              as={<Ionicon name="ios-search" />}
            />
          }
        />
      </View>
      {isSearching ? (
        <ActivityIndicator
          style={{ paddingTop: "5%" }}
          size="large"
          color={colors.yellow}
        />
      ) : (
        <View>
          {posts?.length > 0 ? (
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: "4%",
              }}
              keyExtractor={(item) => item.id}
              data={posts}
              renderItem={renderPost}
            />
          ) : (
            <CustomText style={{ textAlign: "center" }}>
              Oops! Looks like no posts match that query!
            </CustomText>
          )}
        </View>
      )}
    </VStack>
  );
};

export default PostsList;
