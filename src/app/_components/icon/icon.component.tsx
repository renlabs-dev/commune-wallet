import Link from "next/link";
import Image from "next/image";

export const Icon = ({
  src,
  href,
  className,
}: {
  src: string;
  href?: string;
  className?: string;
}) => {
  return (
    <Link href={href ?? ""}>
      <Image
        src={src}
        width={100}
        height={100}
        alt="commune logo"
        className={className}
      />
    </Link>
  );
};
