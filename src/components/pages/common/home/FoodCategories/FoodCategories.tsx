// components/FoodCategories.tsx
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import Link from "next/link";

const categories = [
  { name: "Tacos", icon: "🌮", count: 142 },
  { name: "Noodles", icon: "🍜", count: 98 },
  { name: "Kebabs", icon: "🍢", count: 76 },
  { name: "Desserts", icon: "🍧", count: 113 },
  { name: "Vegan", icon: "🌱", count: 64 },
  { name: "Fusion", icon: "🍛", count: 87 },
];

export default function FoodCategories() {
  return (
    <section className="py-6 md:py-12 bg-white">
      <MyContainer>
        <SectionHead title="Explore by Category" className="mb-6 md:mb-10" />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/spots?category=${category.name}`}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center group"
            >
              <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">
                {category.icon}
              </span>
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {category.count}+ spots
              </p>
            </Link>
          ))}
        </div>
      </MyContainer>
    </section>
  );
}
