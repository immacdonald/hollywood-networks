import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
}

class SigmaErrorBoundaryClass extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Sigma rendering error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback ?? <div>Graph failed to load. WebGL may not be supported.</div>;
        }

        return this.props.children;
    }
}

// Wrap for clean functional usage
const SigmaErrorBoundary = ({ children, fallback }: Props) => {
    return <SigmaErrorBoundaryClass fallback={fallback}>{children}</SigmaErrorBoundaryClass>;
};

export { SigmaErrorBoundary };
