import { Fragment } from "react";

//Components
import Hero from "@/Components/Home/Hero";
import Trends from "@/Components/Home/Trends";
import Category from "@/Components/Home/Category";
import ClientReview from "@/Components/Home/ClientReview";
import FeatureProduct from "@/Components/Home/FeatureProduct";
import Services from "@/Components/Home/Services";
import RecentProduct from "@/Components/Home/RecentProduct";
import Faq from "@/Components/Home/Faq";
import NewsLetter from "@/Components/Home/NewsLetter";

//Tenstack and Query
import { QueryClient } from "@tanstack/react-query";
import { createClient } from "@/Supabase/server";
import { GET_PROFILE } from "@/Tenstack/Functions/Account/profile";
import { GET_CART_LIST } from "@/Tenstack/Functions/Cart/cart";

const Page = async () => {
  //Client
  const supabase = createClient();
  const queryClient = new QueryClient();

  //Tenstack
  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: () => GET_PROFILE(supabase)
  })
  await queryClient.prefetchQuery({
    queryKey: ["cart"],
    queryFn: () => GET_CART_LIST(supabase)
  })

  return (
    <Fragment>
      <Hero />
      <Trends />
      <Category />
      <ClientReview />
      <FeatureProduct />
      <Services />
      <RecentProduct />
      <Faq />
      <NewsLetter />
    </Fragment>
  );
};

export default Page;