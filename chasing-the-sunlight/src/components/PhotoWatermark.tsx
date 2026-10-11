interface PhotoWatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const PhotoWatermark = ({ children, className = '', ...props }: PhotoWatermarkProps) => {
  return (
    <div className={`relative ${className}`} {...props}>
      {children}
      <span className="absolute bottom-3 right-3 text-xs font-medium text-white/40 select-none pointer-events-none tracking-wide z-10">
        © Chasing the Sunlight
      </span>
    </div>
  );
};

export default PhotoWatermark;
