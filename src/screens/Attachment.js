import WebView from "react-native-webview";
import Loading from "../components/Loading";

const AttachmentScreen = (props) => {
  const uri =
    `https://elitelearninggateway.com/${props.route.params.uri}`.replace(
      " ",
      "%20"
    );

  return (
    <WebView
      source={{
        uri: uri,
      }}
      scalesPageToFit={false}
      injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=2); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
      renderLoading={() => <Loading text="Loading Attachment..." />}
      startInLoadingState
    />
  );
};

export default AttachmentScreen;
