import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { FlashSaleSection } from '../components/home/FlashSaleSection';
import { TrendingSection } from '../components/home/TrendingSection';
import { PromoBanner } from '../components/home/PromoBanner';
import { RecommendedSection } from '../components/home/RecommendedSection';
import { WhyAuraStore } from '../components/home/WhyAuraStore';
import { Testimonials } from '../components/home/Testimonials';
import { Newsletter } from '../components/home/Newsletter';

export const Home = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeroSection />
      <CategorySection />
      <FlashSaleSection />
      <TrendingSection />
      <PromoBanner />
      <RecommendedSection />
      <WhyAuraStore />
      <Testimonials />
      <Newsletter />
    </div>
  );
};
