/* eslint-disable max-classes-per-file */
import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { Button } from 'antd';

const DefaultUI = () => (
  <div
    // show in center
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      flex: '1',
      height: '100%',
      maxWidth: 250,
      margin: 'auto',
    }}
  >
    <h1>Something went wrong.</h1>
    <Button type="primary" block onClick={() => window.location?.reload()}>
      Refresh
    </Button>
  </div>
);

// usage in MaybeErrorComponent‘s Parent Component: <ErrorBoundary><MaybeErrorComponent /></ErrorBoundary>
export class ErrorBoundary extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
    this.wrapperedComponent = this.wrapperedComponent.bind(this);
  }

  static getDerivedStateFromError(_error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(_error: any, _errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo)
  }

  wrapperedComponent() {
    const { children } = this.props;
    return children;
  }

  render() {
    const { hasError } = this.state;
    if (hasError) return <DefaultUI />;

    return this.wrapperedComponent();
  }
}

// usage in MaybeErrorComponent: errorBoundary(MaybeErrorComponent)
// or as Decorator:
// @errorBoundary
// MaybeErrorComponent
type ErrorHandlingComponent<Props> = (props: Props) => React.ReactNode;
export function errorBoundary<Props extends Record<string, unknown>>(
  WrapperedComponent: ErrorHandlingComponent<Props>,
): React.ComponentType<Props> {
  class FErrorBoundary extends ErrorBoundary {
    wrapperedComponent() {
      // @ts-ignore
      return <WrapperedComponent {...this.props} />;
    }
  }
  // @ts-ignore
  hoistNonReactStatic(FErrorBoundary, WrapperedComponent);
  return FErrorBoundary;
}

export const MakeError = () => {
  throw Error('make test error');
};
