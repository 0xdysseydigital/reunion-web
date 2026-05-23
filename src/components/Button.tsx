import Link from "next/link";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

const base =
  "relative inline-block cursor-pointer border border-brand-cream text-brand-cream " +
  "font-servus text-[14px] tracking-[0.06em] uppercase " +
  "px-6 py-3 rounded-none bg-transparent overflow-hidden group ";

function ButtonInner({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span className="absolute inset-0 bg-brand-cream translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10 group-hover:text-brand-bg transition-colors duration-300">{children}</span>
    </>
  );
}

export default function Button({
  href,
  onClick,
  children,
  className = "",
  external = false,
}: ButtonProps) {
  const cls = base + className;

  if (href) {
    return external ? (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        <ButtonInner>{children}</ButtonInner>
      </a>
    ) : (
      <Link href={href} className={cls}>
        <ButtonInner>{children}</ButtonInner>
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      <ButtonInner>{children}</ButtonInner>
    </button>
  );
}
