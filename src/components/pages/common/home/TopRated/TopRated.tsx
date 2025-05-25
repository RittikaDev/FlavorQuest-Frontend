// components/TopRated.tsx
import MyContainer from "@/components/shared/MyContainer/MyContainer";
import SectionHead from "@/components/shared/SectionHead/SectionHead";
import { ChevronRight, Star } from "lucide-react";

export default function TopRated() {
  const topRated = [
    {
      id: 1,
      name: "Dragon Noodle House",
      category: "Chinese",
      rating: 4.9,
      distance: "0.8mi",
    },
    {
      id: 2,
      name: "Dragon Noodle House",
      category: "Chinese",
      rating: 4.9,
      distance: "0.8mi",
    },
    {
      id: 3,
      name: "Dragon Noodle House",
      category: "Chinese",
      rating: 4.9,
      distance: "0.8mi",
    },
    // Add 4-5 more items
  ];

  return (
    <section className="py-6 md:py-12 bg-slate-100/90">
      <MyContainer>
        <div className="flex justify-between items-center mb-8">
          <SectionHead title="Top Rated This Week" />
          <button className="hidden md:flex items-center text-primary font-medium">
            View all <ChevronRight className="ml-1 w-5 h-5" />
          </button>
        </div>

        <div className="rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {topRated.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-6 border-b border-gray-100 rounded bg-white`}
              >
                <div className="flex items-center">
                  <span className="text-gray-400 font-bold mr-6 w-6 text-center">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.category} • {item.distance}
                    </p>
                  </div>
                </div>
                <div className="flex items-center bg-primary/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  <span className="font-medium text-sm">{item.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MyContainer>
    </section>
  );
}
