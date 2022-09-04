// class Navigator {
//   navigator = null;

//   setNavigator = (navigator) => {
//     this.navigator = navigator;
//   };

//   navigateToErrorPage(message = null) {
//     this.navigator.navigate("Error", { message: message });
//   }
// }

import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const navigateToErrorPage = (params) => {
  navigationRef.current?.navigate("Error", params);
};
