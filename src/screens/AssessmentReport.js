import { WebView } from "react-native-webview";
import { useSelector } from "react-redux";

import Loading from "../components/Loading";

const Buffer = require("buffer").Buffer;

const AssessmentReport = (props) => {
  const userGrno = useSelector((state) => state.user.grno);
  const assessment = props.route.params.title.replace(" ", "+");
  // encodes the user's grno
  const encodedGrno = new Buffer(userGrno).toString("base64");

  return (
    <WebView
      source={{
        uri: `https://elitelearninggateway.com/studentwisereport_byexamname.php?examname=${assessment}&Action=viewreportcard&accesscode=${encodedGrno}&grade=5&status=viewreportcard%3B%3F%3E`,
      }}
      scalesPageToFit={false}
      injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=2); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
      renderLoading={() => <Loading text="Fetching Report..." />}
      startInLoadingState
    />
  );
};

export default AssessmentReport;
