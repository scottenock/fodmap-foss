export type Dish = {
  id: string;
  name: string;
  prompts: string[];
  core: string[];
  common: string[];
};

const BREAD = "Wheat foods e.g. Bread, cereal, pasta";
const LETTUCE = "Lettuce (e.g. rocket, butter, iceberg, radicchio, red coral, romaine)";
const HAM = "Cold cuts / deli meat / cold meats such as ham";
const SPRING_ONION = "Scallions / Spring onions / Green onions (green part)";
const TORTILLA = "Tortilla, wheat (flour)";
const CREAM = "Cream, regular fat";

const dishes: Dish[] = [
  {
    id: "pizza", name: "Pizza", prompts: ["pizza", "a slice of pizza"],
    core: ["Pizza base, wheat", "Mozzarella cheese", "Tomato sauce"],
    common: ["Onions", "Garlic", "Mushrooms", "Pepperoni", "Basil"],
  },
  {
    id: "garlic-bread", name: "Garlic bread", prompts: ["garlic bread"],
    core: [BREAD, "Garlic", "Butter"], common: ["Parsley", "Mozzarella cheese"],
  },
  {
    id: "bruschetta", name: "Bruschetta", prompts: ["bruschetta"],
    core: [BREAD, "Tomatoes", "Garlic", "Basil"], common: ["Olive Oil", "Red onion"],
  },
  {
    id: "spaghetti-bolognese", name: "Spaghetti bolognese", prompts: ["spaghetti bolognese", "pasta with meat sauce"],
    core: [BREAD, "Ground beef", "Tomatoes"],
    common: ["Onions", "Garlic", "Parmesan cheese", "Carrots", "Celery"],
  },
  {
    id: "lasagne", name: "Lasagne", prompts: ["lasagne"],
    core: [BREAD, "Ground beef", "Tomatoes", "Mozzarella cheese", "Cow milk"],
    common: ["Onions", "Garlic", "Parmesan cheese"],
  },
  {
    id: "macaroni-cheese", name: "Macaroni cheese", prompts: ["macaroni cheese"],
    core: [BREAD, "Cheddar cheese", "Cow milk"], common: ["Butter", "Wheat flour"],
  },
  {
    id: "carbonara", name: "Carbonara", prompts: ["spaghetti carbonara", "creamy pasta with bacon"],
    core: [BREAD, "Eggs", "Bacon", "Parmesan cheese"], common: ["Garlic", CREAM, "Onions"],
  },
  {
    id: "pesto-pasta", name: "Pesto pasta", prompts: ["pesto pasta"],
    core: [BREAD, "Pesto sauce"], common: ["Parmesan cheese", "Garlic", "Pine nuts"],
  },
  {
    id: "tomato-pasta", name: "Tomato pasta", prompts: ["pasta in tomato sauce", "penne arrabiata"],
    core: [BREAD, "Tomatoes"], common: ["Onions", "Garlic", "Parmesan cheese", "Basil"],
  },
  {
    id: "meatballs", name: "Meatballs", prompts: ["meatballs in tomato sauce"],
    core: ["Ground beef", "Tomatoes"], common: ["Onions", "Garlic", BREAD, "Parmesan cheese"],
  },
  {
    id: "risotto", name: "Risotto", prompts: ["risotto"],
    core: ["White rice", "Parmesan cheese", "Butter"], common: ["Onions", "Garlic", "Mushrooms", "Wine", "Peas"],
  },
  {
    id: "paella", name: "Paella", prompts: ["paella"],
    core: ["White rice", "Shrimp"], common: ["Chicken", "Mussels", "Squid", "Onions", "Garlic", "Peas", "Red Peppers", "Tomatoes"],
  },
  {
    id: "cheeseburger", name: "Burger", prompts: ["a cheeseburger", "a hamburger"],
    core: [BREAD, "Ground beef", "Cheddar cheese"],
    common: [LETTUCE, "Tomatoes", "Onions", "Ketchup (USA)", "Gherkins in vinegar", "Potato", "Mayonnaise"],
  },
  {
    id: "hot-dog", name: "Hot dog", prompts: ["a hot dog in a bun"],
    core: ["Frankfurters / hot dogs (plain)", BREAD], common: ["Onions", "Mustard", "Ketchup (USA)"],
  },
  {
    id: "fish-and-chips", name: "Fish and chips", prompts: ["fish and chips", "battered fish with fries"],
    core: ["Cod", "Potato", "Wheat flour"], common: ["Peas", "Lemon", "Mayonnaise"],
  },
  {
    id: "fried-chicken", name: "Fried chicken", prompts: ["fried chicken", "chicken nuggets"],
    core: ["Chicken", "Wheat flour"], common: ["Garlic powder", "Potato", "Ketchup (USA)"],
  },
  {
    id: "chicken-wings", name: "Chicken wings", prompts: ["chicken wings"],
    core: ["Chicken"], common: ["Barbeque sauce", "Garlic", "Honey"],
  },
  {
    id: "steak-and-chips", name: "Steak and chips", prompts: ["steak with fries"],
    core: ["Beef", "Potato"], common: ["Mushrooms", "Tomatoes", "Onions", "Green Beans", "Peas"],
  },
  {
    id: "roast-dinner", name: "Roast dinner", prompts: ["a roast dinner", "roast chicken with roast potatoes and vegetables"],
    core: ["Chicken", "Potato", "Carrots"],
    common: ["Broccoli", "Peas", "Brussel sprouts", "Onions", "Wheat flour", "Beef", "Lamb", "Pork", "Parsnip"],
  },
  {
    id: "shepherds-pie", name: "Shepherd's pie", prompts: ["shepherd's pie", "cottage pie"],
    core: ["Ground beef", "Potato"], common: ["Onions", "Garlic", "Carrots", "Peas", "Lamb"],
  },
  {
    id: "meat-pie", name: "Meat pie", prompts: ["a meat pie", "a steak pie"],
    core: [BREAD, "Beef"], common: ["Onions", "Garlic", "Potato", "Carrots"],
  },
  {
    id: "sausage-roll", name: "Sausage roll", prompts: ["a sausage roll"],
    core: ["Sausages", BREAD], common: ["Onions"],
  },
  {
    id: "sausage-and-mash", name: "Sausages and mash", prompts: ["sausages and mashed potato"],
    core: ["Sausages", "Potato"], common: ["Onions", "Peas", "Butter", "Cow milk"],
  },
  {
    id: "chilli-con-carne", name: "Chilli con carne", prompts: ["chilli con carne"],
    core: ["Ground beef", "Kidney beans, boiled", "Tomatoes"],
    common: ["Onions", "Garlic", "White rice", "Bell pepper", "Sour cream", "Cheddar cheese"],
  },
  {
    id: "full-english", name: "Cooked breakfast", prompts: ["a full english breakfast", "a cooked breakfast with eggs, bacon and sausages"],
    core: ["Eggs", "Bacon", "Sausages", "Baked beans"], common: ["Tomatoes", "Mushrooms", BREAD, "Butter"],
  },
  {
    id: "beans-on-toast", name: "Beans on toast", prompts: ["beans on toast"],
    core: ["Baked beans", BREAD], common: ["Butter", "Cheddar cheese"],
  },
  {
    id: "pancakes", name: "Pancakes", prompts: ["a stack of pancakes", "crepes"],
    core: ["Wheat flour", "Eggs", "Cow milk"], common: ["Maple syrup", "Butter", "Blueberry", "Bananas, ripe", "Strawberry"],
  },
  {
    id: "waffles", name: "Waffles", prompts: ["waffles"],
    core: ["Wheat flour", "Eggs", "Cow milk"], common: ["Maple syrup", "Butter", "Strawberry", "Cream, regular fat"],
  },
  {
    id: "french-toast", name: "French toast", prompts: ["french toast"],
    core: [BREAD, "Eggs", "Cow milk"], common: ["Maple syrup", "Butter", "Cinnamon"],
  },
  {
    id: "porridge", name: "Porridge", prompts: ["a bowl of porridge", "oatmeal with toppings"],
    core: ["Oats", "Cow milk"], common: ["Honey", "Bananas, ripe", "Blueberry", "Cinnamon"],
  },
  {
    id: "yogurt-bowl", name: "Yogurt bowl", prompts: ["yogurt with granola and berries", "a yogurt parfait"],
    core: ["Yogurt", "Granola"], common: ["Honey", "Strawberry", "Blueberry", "Bananas, ripe"],
  },
  {
    id: "cereal", name: "Cereal with milk", prompts: ["a bowl of breakfast cereal with milk"],
    core: ["Cow milk", BREAD], common: ["Granola", "Muesli", "Oats", "Bananas, ripe"],
  },
  {
    id: "avocado-toast", name: "Avocado toast", prompts: ["avocado toast"],
    core: [BREAD, "Avocado"], common: ["Eggs", "Tomatoes", "Lemon", "Chili flakes", "Feta cheese"],
  },
  {
    id: "eggs-benedict", name: "Eggs benedict", prompts: ["eggs benedict"],
    core: ["Eggs", BREAD, HAM], common: ["Butter", "Spinach", "Salmon"],
  },
  {
    id: "omelette", name: "Omelette", prompts: ["an omelette"],
    core: ["Eggs"], common: ["Cheddar cheese", "Mushrooms", "Onions", "Bell pepper", HAM, "Butter"],
  },
  {
    id: "shakshuka", name: "Shakshuka", prompts: ["shakshuka", "eggs baked in tomato sauce"],
    core: ["Eggs", "Tomatoes", "Onions", "Garlic"], common: ["Bell pepper", "Feta cheese", BREAD],
  },
  {
    id: "quiche", name: "Quiche", prompts: ["a quiche"],
    core: ["Eggs", BREAD, "Cheddar cheese"], common: ["Bacon", "Onions", CREAM, "Spinach"],
  },
  {
    id: "sandwich", name: "Sandwich", prompts: ["a sandwich", "a club sandwich", "a toasted sandwich"],
    core: [BREAD], common: ["Cheddar cheese", HAM, LETTUCE, "Tomatoes", "Mayonnaise", "Butter", "Chicken", "Tuna", "Eggs"],
  },
  {
    id: "wrap", name: "Wrap", prompts: ["a wrap", "a burrito"],
    core: [TORTILLA], common: ["Chicken", "Kidney beans, boiled", "White rice", "Cheddar cheese", "Onions", "Garlic", "Sour cream", "Avocado", "Tomatoes", LETTUCE],
  },
  {
    id: "tacos", name: "Tacos", prompts: ["tacos"],
    core: ["Corn tortilla", "Ground beef"], common: ["Onions", "Garlic", "Tomatoes", LETTUCE, "Cheddar cheese", "Sour cream", "Avocado", "Cilantro", "Lime"],
  },
  {
    id: "nachos", name: "Nachos", prompts: ["nachos"],
    core: ["Chips, tortilla", "Cheddar cheese"], common: ["Kidney beans, boiled", "Tomatoes", "Onions", "Sour cream", "Avocado"],
  },
  {
    id: "quesadilla", name: "Quesadilla", prompts: ["a quesadilla"],
    core: [TORTILLA, "Cheddar cheese"], common: ["Chicken", "Onions", "Bell pepper", "Sour cream"],
  },
  {
    id: "fajitas", name: "Fajitas", prompts: ["fajitas"],
    core: [TORTILLA, "Chicken", "Bell pepper", "Onions"], common: ["Garlic", "Sour cream", "Cheddar cheese", "Avocado", "Lime"],
  },
  {
    id: "enchiladas", name: "Enchiladas", prompts: ["enchiladas"],
    core: [TORTILLA, "Cheddar cheese", "Tomatoes"], common: ["Chicken", "Ground beef", "Onions", "Garlic", "Kidney beans, boiled"],
  },
  {
    id: "guacamole", name: "Guacamole", prompts: ["guacamole"],
    core: ["Avocado"], common: ["Lime", "Onions", "Garlic", "Tomatoes", "Cilantro", "Chips, tortilla"],
  },
  {
    id: "chicken-curry", name: "Chicken curry", prompts: ["chicken curry", "chicken tikka masala", "butter chicken"],
    core: ["Chicken", "Onions", "Garlic"], common: ["Coconut milk, canned", "Tomatoes", "Ginger", "White rice", "Naan bread, wheat", CREAM, "Curry powder"],
  },
  {
    id: "dal", name: "Dal", prompts: ["dal", "lentil curry"],
    core: ["Lentils, boiled", "Onions", "Garlic"], common: ["Tomatoes", "White rice", "Ginger", "Naan bread, wheat"],
  },
  {
    id: "chana-masala", name: "Chickpea curry", prompts: ["chana masala", "chickpea curry"],
    core: ["Chickpeas, boiled", "Onions", "Garlic", "Tomatoes"], common: ["White rice", "Ginger", "Naan bread, wheat"],
  },
  {
    id: "biryani", name: "Biryani", prompts: ["biryani"],
    core: ["Basmati rice", "Onions"], common: ["Chicken", "Garlic", "Lamb", "Yogurt", "Ginger"],
  },
  {
    id: "katsu-curry", name: "Katsu curry", prompts: ["katsu curry"],
    core: ["Chicken", "White rice", BREAD], common: ["Onions", "Garlic", "Carrots", "Apples", "Wheat flour"],
  },
  {
    id: "thai-curry", name: "Thai curry", prompts: ["thai green curry", "thai red curry"],
    core: ["Coconut milk, canned", "Chicken"], common: ["Garlic", "Shallot", "Jasmine rice", "Bamboo shoots", "Basil", "Green Beans", "Bell pepper"],
  },
  {
    id: "pad-thai", name: "Pad thai", prompts: ["pad thai"],
    core: ["Rice noodles", "Eggs", "Peanuts"], common: ["Shrimp", "Chicken", "Bean sprouts", "Garlic", "Shallot", "Lime", "Tofu (drained or firm)"],
  },
  {
    id: "fried-rice", name: "Fried rice", prompts: ["fried rice", "egg fried rice"],
    core: ["White rice", "Eggs"], common: ["Peas", "Carrots", "Soy sauce", SPRING_ONION, "Garlic", "Onions", "Chicken", "Shrimp"],
  },
  {
    id: "stir-fry", name: "Stir fry", prompts: ["a vegetable stir fry", "chicken stir fry with noodles"],
    core: ["Broccoli", "Carrots", "Bell pepper"], common: ["Chicken", "Beef", "Soy sauce", "Garlic", "Onions", "Ginger", "White rice", "Egg noodles", "Tofu (drained or firm)"],
  },
  {
    id: "ramen", name: "Ramen", prompts: ["a bowl of ramen"],
    core: ["Egg noodles", "Eggs"], common: ["Pork", SPRING_ONION, "Garlic", "Onions", "Seaweed / nori", "Bean sprouts", "Mushrooms", "Soy sauce"],
  },
  {
    id: "pho", name: "Pho", prompts: ["a bowl of pho"],
    core: ["Rice noodles", "Beef"], common: ["Onions", "Bean sprouts", "Basil", "Lime", "Cilantro", "Ginger"],
  },
  {
    id: "miso-soup", name: "Miso soup", prompts: ["miso soup"],
    core: ["Miso paste", "Tofu (drained or firm)"], common: ["Seaweed / nori", SPRING_ONION],
  },
  {
    id: "sushi", name: "Sushi", prompts: ["sushi", "a plate of sushi rolls", "nigiri sushi"],
    core: ["White rice", "Seaweed / nori"], common: ["Salmon", "Tuna", "Avocado", "Cucumber", "Soy sauce", "Wasabi powder", "Ginger", "Sesame seeds"],
  },
  {
    id: "onigiri", name: "Onigiri", prompts: ["onigiri rice balls"],
    core: ["White rice", "Seaweed / nori"], common: ["Tuna", "Salmon", "Mayonnaise"],
  },
  {
    id: "poke-bowl", name: "Poke bowl", prompts: ["a poke bowl"],
    core: ["White rice", "Salmon"], common: ["Avocado", "Edamame", "Cucumber", "Soy sauce", "Seaweed / nori", "Sesame seeds", "Mango"],
  },
  {
    id: "bibimbap", name: "Bibimbap", prompts: ["bibimbap"],
    core: ["White rice", "Eggs"], common: ["Beef", "Spinach", "Carrots", "Bean sprouts", "Zucchini / courgette", "Garlic", "Mushrooms", "Kimchi"],
  },
  {
    id: "dumplings", name: "Dumplings", prompts: ["dumplings", "gyoza", "dim sum"],
    core: [BREAD, "Pork"], common: ["Garlic", "Cabbage, common", SPRING_ONION, "Soy sauce", "Ginger", "Shrimp"],
  },
  {
    id: "spring-rolls", name: "Spring rolls", prompts: ["spring rolls"],
    core: [BREAD, "Cabbage, common"], common: ["Carrots", "Pork", "Garlic", "Bean sprouts", "Shrimp"],
  },
  {
    id: "tempura", name: "Tempura", prompts: ["tempura"],
    core: ["Wheat flour"], common: ["Shrimp", "Sweet Potato", "Zucchini / courgette", "Soy sauce"],
  },
  {
    id: "congee", name: "Congee", prompts: ["congee", "rice porridge"],
    core: ["White rice"], common: ["Chicken", "Ginger", SPRING_ONION, "Eggs"],
  },
  {
    id: "falafel-wrap", name: "Falafel wrap", prompts: ["a falafel wrap", "falafel in pita bread"],
    core: ["Falafel", BREAD], common: ["Hummus / houmous", LETTUCE, "Tomatoes", "Tzatziki dip", "Onions"],
  },
  {
    id: "mezze", name: "Mezze", prompts: ["a mezze platter", "hummus with pita bread"],
    core: ["Hummus / houmous", BREAD], common: ["Olives", "Feta cheese", "Tzatziki dip", "Cucumber", "Tomatoes", "Falafel"],
  },
  {
    id: "kebab", name: "Kebab", prompts: ["a doner kebab", "shawarma", "gyros"],
    core: ["Lamb", BREAD], common: ["Chicken", LETTUCE, "Tomatoes", "Onions", "Garlic", "Yogurt"],
  },
  {
    id: "greek-salad", name: "Greek salad", prompts: ["a greek salad"],
    core: ["Feta cheese", "Cucumber", "Tomatoes", "Olives"], common: ["Red onion", "Green Pepper", "Olive Oil"],
  },
  {
    id: "caesar-salad", name: "Caesar salad", prompts: ["a caesar salad"],
    core: [LETTUCE, "Parmesan cheese", BREAD], common: ["Chicken", "Bacon", "Eggs", "Garlic", "Mayonnaise", "Anchovies"],
  },
  {
    id: "garden-salad", name: "Salad", prompts: ["a green salad", "a mixed salad"],
    core: [LETTUCE, "Tomatoes", "Cucumber"], common: ["Red onion", "Bell pepper", "Carrots", "Avocado", "Olive Oil"],
  },
  {
    id: "caprese", name: "Caprese salad", prompts: ["a caprese salad"],
    core: ["Mozzarella cheese", "Tomatoes", "Basil"], common: ["Olive Oil", "Balsamic Vinegar"],
  },
  {
    id: "couscous-salad", name: "Couscous salad", prompts: ["couscous salad"],
    core: ["Cous cous, wheat"], common: ["Tomatoes", "Cucumber", "Red onion", "Mint", "Chickpeas, canned", "Feta cheese"],
  },
  {
    id: "tabbouleh", name: "Tabbouleh", prompts: ["tabbouleh"],
    core: ["Bulgur wheat", "Parsley", "Tomatoes"], common: ["Mint", "Red onion", "Lemon"],
  },
  {
    id: "potato-salad", name: "Potato salad", prompts: ["potato salad"],
    core: ["Potato", "Mayonnaise"], common: ["Eggs", "Red onion", "Chives", "Gherkins in vinegar"],
  },
  {
    id: "coleslaw", name: "Coleslaw", prompts: ["coleslaw"],
    core: ["Cabbage, common", "Carrots", "Mayonnaise"], common: ["Onions"],
  },
  {
    id: "baked-potato", name: "Baked potato", prompts: ["a baked potato with toppings", "a jacket potato"],
    core: ["Potato"], common: ["Butter", "Cheddar cheese", "Baked beans", "Tuna", "Sour cream", "Chives"],
  },
  {
    id: "vegetable-soup", name: "Vegetable soup", prompts: ["a bowl of vegetable soup", "minestrone"],
    core: ["Carrots", "Potato", "Celery"], common: ["Onions", "Garlic", "Leeks", "Tomatoes", BREAD],
  },
  {
    id: "tomato-soup", name: "Tomato soup", prompts: ["a bowl of tomato soup"],
    core: ["Tomatoes"], common: ["Onions", "Garlic", CREAM, BREAD],
  },
  {
    id: "chicken-soup", name: "Chicken noodle soup", prompts: ["chicken noodle soup"],
    core: ["Chicken", "Egg noodles", "Carrots"], common: ["Onions", "Garlic", "Celery"],
  },
  {
    id: "moussaka", name: "Moussaka", prompts: ["moussaka"],
    core: ["Eggplant/Aubergine", "Ground beef", "Tomatoes"], common: ["Onions", "Garlic", "Potato", "Cow milk", "Wheat flour"],
  },
  {
    id: "ratatouille", name: "Ratatouille", prompts: ["ratatouille"],
    core: ["Eggplant/Aubergine", "Zucchini / courgette", "Tomatoes", "Bell pepper"], common: ["Onions", "Garlic"],
  },
  {
    id: "cake", name: "Cake", prompts: ["a slice of cake", "a cupcake", "a birthday cake"],
    core: ["Wheat flour", "White sugar", "Eggs", "Butter"], common: ["Cow milk", "Milk chocolate", CREAM, "Strawberry"],
  },
  {
    id: "cookies", name: "Cookies", prompts: ["cookies", "biscuits"],
    core: ["Wheat flour", "White sugar", "Butter"], common: ["Milk chocolate", "Oats", "Eggs"],
  },
  {
    id: "brownie", name: "Brownie", prompts: ["a chocolate brownie"],
    core: ["Wheat flour", "White sugar", "Eggs", "Butter", "Dark chocolate"], common: ["Walnuts"],
  },
  {
    id: "cheesecake", name: "Cheesecake", prompts: ["a slice of cheesecake"],
    core: ["Cream cheese", "White sugar", BREAD, "Butter"], common: ["Strawberry", CREAM, "Raspberry"],
  },
  {
    id: "apple-pie", name: "Apple pie", prompts: ["apple pie", "apple crumble"],
    core: ["Apples", "Wheat flour", "White sugar", "Butter"], common: ["Cinnamon", "Custard", "Ice cream"],
  },
  {
    id: "doughnut", name: "Doughnut", prompts: ["a doughnut"],
    core: ["Wheat flour", "White sugar"], common: ["Milk chocolate", "Jam (mixed berries)", "Eggs"],
  },
  {
    id: "tiramisu", name: "Tiramisu", prompts: ["tiramisu"],
    core: ["Mascarpone cheese", "Coffee (regular or decaf)", "Eggs", "White sugar", BREAD], common: ["Cocoa powder"],
  },
  {
    id: "sundae", name: "Ice cream sundae", prompts: ["an ice cream sundae"],
    core: ["Ice cream"], common: [CREAM, "Milk chocolate", "Strawberry", "Bananas, ripe"],
  },
  {
    id: "fruit-salad", name: "Fruit salad", prompts: ["a fruit salad", "a bowl of mixed fresh fruit"],
    core: [], common: ["Apples", "Bananas, ripe", "Grapes (Red, Green and Black)", "Strawberry", "Blueberry", "Orange", "Kiwifruit", "Melons e.g. Honeydew, galia", "Pineapple", "Mango", "Pomegranate"],
  },
  {
    id: "smoothie", name: "Smoothie", prompts: ["a fruit smoothie"],
    core: ["Bananas, ripe", "Cow milk"], common: ["Strawberry", "Blueberry", "Yogurt", "Mango", "Honey", "Oats"],
  },
  {
    id: "milkshake", name: "Milkshake", prompts: ["a milkshake"],
    core: ["Cow milk", "Ice cream"], common: ["Strawberry", "Milk chocolate"],
  },
  {
    id: "latte", name: "Coffee with milk", prompts: ["a latte", "a cappuccino", "a coffee with milk"],
    core: ["Coffee (regular or decaf)", "Cow milk"], common: ["White sugar"],
  },
  {
    id: "tea-with-milk", name: "Tea with milk", prompts: ["a cup of tea with milk"],
    core: ["Black tea, weak", "Cow milk"], common: ["White sugar"],
  },
];

export default dishes;
