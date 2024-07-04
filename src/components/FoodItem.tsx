import { Fodmap } from "../types/Fodmap";
import Score from "./Score";

type FoodItemProps = {
  food: Fodmap;
};

const styles = {
  container: "p-3 flex my-1 shadow-md mb-2 justify-between",
};

const fodmapRating = (score?: number) => {
  let rating = "N/A";
  rating = score === 0 ? "Low" : rating;
  rating = score === 1 ? "Medium" : rating;
  rating = score === 2 ? "High" : rating;

  return rating;
};

const FoodItem: React.FC<FoodItemProps> = ({ food }) => {
  const ratingColour = food.fodmap === "high" ? "bg-red-500" : "bg-green-300";

  return (
    <div className="">
      <section className={styles.container}>
        <div>
          <p className="text-3xl">{food.name}</p>
          <p className="text-base">{food.category}</p>
          <p className="text-base">Max Quantity: {food.qty ?? "unspecified"}</p>
        </div>
        <div className="flex items-center my-1">
          <span className={`rounded-full w-7 h-7 block mr-2 ${ratingColour}`} />
          <p className="text-2xl">{food.fodmap.toUpperCase()}</p>
        </div>
      </section>
      <section className="p-3">
        <h2 className="text-base font-bold mb-3">Details:</h2>
        <p className="text-base font-medium">Oligos</p>
        <Score
          score={food.details?.oligos ?? 3}
          text={fodmapRating(food.details?.oligos)}
        />
        <div className="border-b-2 border-gray-300 mb-2" />
        <p className="text-base font-medium">Lactose</p>
        <Score
          score={food.details?.lactose ?? 3}
          text={fodmapRating(food.details?.lactose)}
        />
        <div className="border-b-2 border-gray-300 mb-2" />
        <p className="text-base font-medium">Fructose</p>
        <Score
          score={food.details?.fructose ?? 3}
          text={fodmapRating(food.details?.fructose)}
        />
        <div className="border-b-2 border-gray-300 mb-2" />
        <p className="text-base font-medium">Polyols</p>
        <Score
          score={food.details?.polyols ?? 3}
          text={fodmapRating(food.details?.polyols)}
        />
        <div className="border-b-2 border-gray-300" />
      </section>
    </div>
  );
};

export default FoodItem;
