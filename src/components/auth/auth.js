import React from 'react';
import { LoginContext } from './context';

const If = (props) => {
  return props.condition ? props.children : null;
};

class Auth extends React.Component {
  static contextType = LoginContext;
  render() {
    let okToRender = false;

    try {
      okToRender =
        this.context.loggedIn &&
        (this.props.capability
          ? this.context.user.capabilities.includes(this.props.capability)
          : true);
    } catch (e) {
      console.warn('Not Authorized');
    }

    // <Auth> <div /> </Auth>
    /// are you logged in?
    /// was there no capability specified?

    // <Auth capability="foo"> <div /> </Auth>
    /// are you logged in?
    /// Is there a capability that we care about?
    /// do you have it?

    return (
      <If condition={okToRender}>
        <div>{this.props.children}</div>
      </If>
    );
  }
}

export default Auth;

// import React, { useContext } from 'react';
// import { LoginContext } from '../../context/context';
// import { If, Then, Else } from '../if';

// export default function Auth() {
//   const siteContext = useContext(LoginContext);
//   let okToRender = false;
//   try {
//     okToRender =
//       siteContext.loggedIn &&
//       (this.props.capability
//         ? siteContext.user.capabilities.includes(this.props.capability)
//         : true);
//   } catch (e) {
//     console.warn('Not Authorized');
//   }
//   return (
//     <div>
//       <If condition={okToRender}>
//         <div>{props.children}</div>
//       </If>
//     </div>
//   );
// }

// // <Auth> <div /> </Auth>
// /// are you logged in?
// /// was there no capability specified?
// // <Auth capability="foo"> <div /> </Auth>
// /// are you logged in?
// /// Is there a capability that we care about?
// /// do you have it?
