import { Image } from "react-native";

const ImageScreen = (props) => {
  const uri =
    `https://elitelearninggateway.com/${props.route.params.uri}`.replace(
      " ",
      "%20"
    );
  console.log(uri);
  return <Image source={{ uri: uri }} />;
};

export default ImageScreen;
