import React from 'react';
import { Context } from './Provider';
interface Props {
    element: React.ReactNode;
}
declare class CodeLiveErrorBoundary extends React.Component<Props, {
    hasError?: boolean;
}> {
    context: React.ContextType<typeof Context>;
    componentDidCatch(error: Error): void;
    render(): React.ReactNode;
}
export default CodeLiveErrorBoundary;
