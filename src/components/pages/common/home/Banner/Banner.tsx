// components/Banner.tsx
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import MyButton from "@/components/ui/MyButton/MyButton";
import Image from "next/image";
import Link from "next/link";
import "./Banner.css";

export default function Banner() {
  return (
    <section className="relative text-white py-16 md:py-24 overflow-hidden">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1619683815335-2b5b130a1baf?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Street food background"
          fill
          className="object-cover"
          priority
        />
        {/* Smooth gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/40" />
      </div>

      {/* Content container */}
      <MyContainer className="px-4 relative z-10 flex flex-col md:flex-row items-center">
        {/* Text content */}
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 !leading-[1.23]">
            Discover Hidden <span className="text-primary">Street Food</span>{" "}
            Gems
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg text-gray-100">
            Join FlavorQuest and explore the most authentic street food
            experiences in your city. Share your finds and taste the best local
            flavors!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth/register">
              <MyButton
                label="Start Exploring"
                className="rounded-full"
                isArrow
              />
            </Link>
            <Link href="/about" className="md:block hidden">
              <MyButton
                label="How it works"
                variant="outline"
                className="rounded-full"
              />
            </Link>
          </div>
        </div>

        {/* Food image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Delicious street food"
              fill
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 rounded-lg"
              priority
            />
          </div>
        </div>
      </MyContainer>

      {/* Floating food icons */}
      <div className="absolute bottom-0 left-0 w-full h-20 overflow-hidden">
        <div className="absolute -bottom-10 left-0 right-0 flex justify-between px-10 animate-float">
          {["🍢", "🍜", "🍡", "🌮", "🍤", "🥟", "🍧", "🍢", "🍜", "🍡"].map(
            (icon, i) => (
              <span
                key={i}
                className="text-3xl opacity-80 hover:opacity-100 hover:text-primary-300 transition-opacity"
                style={{
                  animationDelay: `${i * 2}s`,
                  animationDuration: "10s",
                }}
              >
                {icon}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
