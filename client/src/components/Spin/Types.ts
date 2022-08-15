interface SpinProps {
  children: React.ReactNode;
  tip?: string;
  spinning?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: 'twoBalls' | 'threeBalls';
  LoadingContentHeight?: string;
}

export { SpinProps }