import { Component, ReactNode } from "react";
import NextLink from "next/link";

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: ReactNode | null }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown) {
    return {
      error: (
        <div className="p-4">
          <h2 className="text-lg font-semibold text-red-600">Something went wrong</h2>
          <p className="text-sm text-gray-600 mt-2">
            {String(error)}
          </p>
        </div>
      ),
    };
  }

  componentDidCatch() {}

  render() {
    if (this.state.error !== null) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 m-4">
          {this.state.error}
        </div>
      );
    }

    return this.props.children;
  }
}
