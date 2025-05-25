// app/membership/page.tsx
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import MyButton from "@/components/ui/MyButton/MyButton";
import { CheckCircle, Star, Gem, Zap, MoveRight } from "lucide-react";
import Link from "next/link";

export default function MembershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-amber-500 to-primary text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/pattern-food.png')] bg-repeat bg-center"></div>
        </div>
        <MyContainer className="text-center relative z-10">
          <div className="inline-flex items-center bg-white/20 px-4 py-1 rounded-full text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            Premium Membership
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Unlock the Full FlavorQuest Experience
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Get exclusive access to premium food spots, special perks, and
            support our community of food explorers.
          </p>
        </MyContainer>
      </div>

      {/* Benefits Section */}
      <div className="py-6 md:py-12">
        <MyContainer>
          <SectionHead title="Why Go Premium?" />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Gem className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Exclusive Spots</h3>
              <p className="text-gray-600">
                Access premium-listed food spots that regular members
                can`&apos;t see. Discover hidden gems before anyone else.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Early Access</h3>
              <p className="text-gray-600">
                Be the first to know about new spots and special events. Get
                48-hour early access to all new features.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Support the Community</h3>
              <p className="text-gray-600">
                Your membership helps us maintain the platform and support small
                food businesses in your area.
              </p>
            </div>
          </div>
        </MyContainer>
      </div>

      {/* Pricing Section */}
      <div className="py-6 md:py-12 bg-gray-50">
        <MyContainer>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              {/* Left Side - Pricing Card */}
              <div className="md:w-1/2 bg-gradient-to-br from-amber-500 to-primary p-8 text-white">
                <div className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Membership
                </div>
                <h3 className="text-2xl font-bold mb-2">Premium Membership</h3>
                <div className="flex items-end mb-6">
                  <span className="text-5xl font-bold">999 BDT</span>
                </div>
                <p className="mb-8">One time payment, lifetime service!</p>

                <Link href={"/checkout"}>
                  <MyButton
                    className="!bg-white !text-primary rounded-full hover:bg-gray-100 px-8 py-3 font-bold"
                    label="Upgrade Now"
                    customIcon={<MoveRight className="text-primary" />}
                  />
                </Link>
              </div>

              {/* Right Side - Features */}
              <div className="md:w-1/2 p-8">
                <h4 className="text-xl font-bold mb-6">
                  Everything in Premium:
                </h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Access to all premium food spots</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Early access to new features</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Exclusive member events</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Priority customer support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Special discounts at partner spots</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ad-free experience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </MyContainer>
      </div>

      {/* Testimonial Section */}
      <div className="py-6 md:py-12">
        <MyContainer>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHead title="What Our Members Say" />
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-amber-400 fill-amber-400"
                  />
                ))}
              </div>
              <blockquote className="text-xl italic mb-6">
                FlavorQuest Premium helped me discover amazing hidden food
                trucks I never would have found otherwise. Worth every penny!
              </blockquote>
              <div className="font-medium">
                - Sarah K., Premium Member since 2022
              </div>
            </div>
          </div>
        </MyContainer>
      </div>
    </div>
  );
}
