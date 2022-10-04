import * as React from "react";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export const navigateToErrorPage = (params) => {
  navigationRef.current?.navigate(screens.error, params);
};

export const screens = {
  login: "Login",
  dashboard: "Dashboard",
  attendance: "Attendance",
  subjectList: "Subjects",
  settings: "Settings",
  assessmentList: "Assessments",
  assessmentReport: "Assessment Report",
  postsList: "Posts",
  post: "Post",
  error: "Error",
  attachment: "Attachment",
};
