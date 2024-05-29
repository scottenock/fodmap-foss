import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import FoodList from "../components/FoodList";
import fodmap from "../data/fodmap";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <FoodList foods={fodmap} />
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
