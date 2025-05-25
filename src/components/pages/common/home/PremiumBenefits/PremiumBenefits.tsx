// components/PremiumBenefits.tsx
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import { MapPin, Star, Unlock } from "lucide-react";
import Link from "next/link";

export default function PremiumBenefits() {
  const benefits = [
    {
      icon: <Unlock className="w-6 h-6 text-amber-500" />,
      title: "Exclusive Access",
      description: "Unlock premium food spots hidden from regular users",
    },
    {
      icon: <Star className="w-6 h-6 text-amber-500" />,
      title: "Early Reviews",
      description: "Be the first to discover and review new spots",
    },
    {
      icon: <MapPin className="w-6 h-6 text-amber-500" />,
      title: "Personalized Map",
      description: "Custom food map based on your preferences",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <MyContainer>
        <div className="text-center mb-12">
          <span className="inline-block bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-medium mb-3">
            Premium Membership
          </span>
          <SectionHead title="Unlock the Full FlavorQuest Experience" />
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href={"/checkout"} className="bg-gradient-to-r from-amber-500 to-primary text-white px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all">
            Upgrade to Premium
          </Link>
        </div>
      </MyContainer>
    </section>
  );
}
