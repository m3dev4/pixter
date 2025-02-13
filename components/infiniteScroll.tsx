import { useInView } from "react-intersection-observer";

interface IntfiniteScrollProps {
  onBottomReached: () => void;
  className?: string;
  children: React.ReactNode;
}

export default function InfiniteScroll({
  children,
  onBottomReached,
  className,
}: IntfiniteScrollProps) {
  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (inView) {
        onBottomReached();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
}
