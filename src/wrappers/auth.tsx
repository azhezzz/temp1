import React, { FC, useEffect } from 'react';
import { Redirect, useAccess } from 'umi';
import { message } from 'antd';

const AuthWrapper: FC = props => {
  const { isLogin } = useAccess();
  useEffect(() => {
    !isLogin && message.warning('请先登陆');
  }, []);
  if (isLogin) {
    return <>{props.children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default AuthWrapper;
