import MyContainer from "@/components/shared/MyContainer/MyContainer";
import MyButton from "@/components/ui/MyButton/MyButton";
import { ChefHat, MapPin, Heart, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function AboutUs() {
  return (
    <MyContainer className="py-12 md:py-20">
      {/* Hero Section */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Discover. Share. Savor.
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Street Food Finder connects food lovers with the most authentic local
          street food experiences around the world.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center">
            <ChefHat className="mr-3 text-amber-500" />
            Our Story
          </h2>
          <p className="text-gray-600 mb-4">
            Born from a passion for authentic street food experiences, Street
            Food Finder started as a simple idea between three food-obsessed
            travelers in 2022.
          </p>
          <p className="text-gray-600 mb-4">
            Frustrated by not being able to find genuine local street food
            recommendations, we built this platform to help others discover
            hidden culinary gems.
          </p>
          <p className="text-gray-600">
            Today, we&apos;re a global community of food lovers sharing our
            favorite street food finds from Bangkok to Barcelona.
          </p>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1656639655048-9cffe08d506b?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your team image
            alt="Street Food Finder team"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* What We Do */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-5 md:mb-8 text-center">
          What We Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <MapPin size={40} className="text-primary mb-4" />,
              title: "Discover Hidden Gems",
              description:
                "Find authentic street food spots recommended by locals and travelers",
            },
            {
              icon: <Star size={40} className="text-primary mb-4" />,
              title: "Honest Reviews",
              description:
                "Get real ratings and reviews from fellow food enthusiasts",
            },
            {
              icon: <Heart size={40} className="text-primary mb-4" />,
              title: "Support Small Vendors",
              description:
                "Help sustain local food cultures and small businesses",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md border border-gra-300 transition-shadow"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="bg-primary/10 p-8 rounded-xl mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Our Food Community
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            {
              icon: <Users size={32} className="mx-auto text-primary mb-2" />,
              value: "10,000+",
              label: "Food Explorers",
            },
            {
              icon: <ChefHat size={32} className="mx-auto text-primary mb-2" />,
              value: "5,000+",
              label: "Street Food Spots",
            },
            {
              icon: <Star size={32} className="mx-auto text-primary mb-2" />,
              value: "50,000+",
              label: "Reviews",
            },
            {
              icon: <MapPin size={32} className="mx-auto text-primary mb-2" />,
              value: "100+",
              label: "Cities Worldwide",
            },
          ].map((stat, index) => (
            <div key={index}>
              {stat.icon}
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team CTA */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Join Our Food Adventure</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you&apos;re a street food vendor or a passionate foodie,
          we&apos;d love to have you as part of our growing community.
        </p>
        <Link href={"/auth/login"} className="flex items-center justify-center">
          <MyButton label="Share Your Food Find" className="rounded-full" />
        </Link>
      </div>
    </MyContainer>
  );
}
