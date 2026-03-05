import Image from "next/image";

export default function BuffaloLogo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ aspectRatio: "1/1" }}>
      <Image
        src="/logo.png"
        alt="בופלו כהנוב - Buffalo Kahanov"
        fill
        className="object-contain"
        priority
        sizes="(max-width: 640px) 96px, 128px"
      />
    </div>
  );
}
