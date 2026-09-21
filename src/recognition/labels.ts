import fodmap from "../data/fodmap";
import { Fodmap } from "../types/Fodmap";
import dishes from "./dishes";
import { LabelIndex, LabelKind, RecognitionLabel } from "./types";

export const FOOD_TEMPLATES = [
  "a photo of {}, a type of food.",
  "a close-up photo of {} on a plate.",
  "a photo of {} served as part of a meal.",
];

export const DISH_TEMPLATES = [
  "a photo of {}, a type of dish.",
  "a close-up photo of a plate of {}.",
  "a photo of {} served in a restaurant.",
];

export const BACKGROUND_TEMPLATES = ["a photo of {}."];

export const BACKGROUND_LABELS = [
  "an empty plate",
  "an empty bowl",
  "a wooden table",
  "cutlery",
  "a napkin",
  "a person",
  "a kitchen",
  "a restaurant interior",
  "an empty glass",
  "a menu",
  "a phone",
];

const excluded = new Set<string>([
  "Acesulfame K", "Agave", "Alfalfa sprouts", "Allspice", "Almond butter", "Almond flour", "Almond milk", "Amaranth flour",
  "Amaranth, puffed grain", "Apple Cider Vinegar", "Arrowroot", "Asafoetida / hing", "Aspartame", "Avocado Oil",
  "Baking powder", "Baking soda", "Balsamic Vinegar", "Barley, flour", "Barley, sprouted", "Bay leaves", "Black tea, strong",
  "Boar", "Brown sugar", "Buckwheat, flour", "Buffalo", "Buttermilk", "Cacao powder", "Canola oil", "Capsicum", "Cardamom",
  "Carob powder", "Carp", "Cashew butter", "Catfish", "Cayenne pepper", "Chai tea, strong", "Chili flakes", "Chili powder",
  "Cinnamon", "Cloves", "Cocoa powder", "Coconut aminos", "Coconut cream", "Coconut flour", "Coconut milk, canned",
  "Coconut oil", "Coconut sugar", "Coconut water", "Condensed milk, sweetened", "Coriander", "Corn starch", "Cornflour",
  "Cornmeal", "Creme fraiche", "Cumin", "Curry leaves", "Curry powder", "Cuttlefish", "Dandelion tea, strong",
  "Date syrup", "Drinking chocolate powder (any % cocoa)", "Eel", "Erythritol", "Evaporated milk", "Fenugreek leaves, dried",
  "Fish sauce", "Five spice powder", "Flax seeds/lineseed", "Freekeh", "Garlic infused oil", "Garlic powder",
  "Garlic salt", "Ghee", "Gin", "Glucose", "Goat", "Goat milk", "Goat yogurt", "Golden syrup / light tracle",
  "Gotukala", "Hemp milk", "Hemp seeds", "Herbal tea (strong)", "High Fructose Corn Syrup (HFCS)", "Hommus dip",
  "Horse", "Horseradish", "Icing sugar / powdered sugar", "Instant coffee (only if not made with lactose or other FODMAPS)",
  "Inulin", "Isomalt", "Kamut", "Kefir", "Lactose free milk", "Lactose free yogurt", "Lemongrass", "Lime juice",
  "Macadamia milk", "Malt extract", "Maltitol", "Mannitol", "Margarine", "Millet flour", "Molasses", "Monk fruit sweetener",
  "Nutmeg", "Nutritional Yeast", "Oat milk", "Olive Oil", "Onion Powder", "Oregano", "Palm sugar", "Paprika", "Peanut oil",
  "Pepper, black", "Poppy seeds", "Powdered milk / milk powder", "Pufferfish / Fugu", "Rampa / pandan leaves",
  "Rice bran", "Rice malt syrup", "Rice milk", "Rum", "Saccharine", "Saffron", "Salt", "Semolina", "Sesame Oil",
  "Shark", "Sheep's milk", "Sorbitol", "Sorghum", "Soy milk made with soy beans", "Soya milk made with soy protein",
  "Spelt flakes", "Star anise", "Stevia", "Sucralose", "Sugar/sucrose", "Sumac", "Sunflower oil", "Tamarind", "Tapioca",
  "Tarragon", "Teff flour", "Thyme", "Tonic water", "Turmeric", "Vanilla", "Vegemite", "Marmite", "Vegetable oil",
  "Vinegar", "Vodka", "Wheat bran, pellets", "Wheat flour", "Whey protein concentrate", "Whey protein isolate",
  "White sugar", "Xanthan gum", "Xylitol",
]);

const aliases: Record<string, string[]> = {
  "Apple, dried": ["dried apple slices"],
  "Apples": ["an apple", "apple slices"],
  "Apricots, dried": ["dried apricots"],
  "Bagel, wheat": ["a bagel"],
  "Baked beans": ["baked beans in tomato sauce"],
  "Banana, dried": ["dried banana chips"],
  "Bananas, ripe": ["a ripe banana"],
  "Bananas, unripe": ["an unripe green banana"],
  "Barley, pearl": ["pearl barley"],
  "Beef": ["a steak", "roast beef slices"],
  "Beer": ["a glass of beer"],
  "Beetroots/Beets": ["beetroot"],
  "Black beans, boiled": ["black beans"],
  "Black beans, canned": ["black beans"],
  "Black tea, weak": ["a cup of black tea"],
  "Blue Cheese": ["blue cheese"],
  "Brussel sprouts": ["brussels sprouts"],
  "Cabbage, common": ["green cabbage"],
  "Cabbage, red": ["red cabbage"],
  "Cabbage, savoy": ["savoy cabbage"],
  "Chai tea, weak": ["a cup of chai tea"],
  "Chayote / choko": ["chayote"],
  "Chia seeds": ["chia seed pudding"],
  "Chicken": ["roast chicken", "grilled chicken breast", "chicken pieces"],
  "Chickpeas, boiled": ["chickpeas"],
  "Chickpeas, canned": ["chickpeas"],
  "Chickpeas, sprouted": ["sprouted chickpeas"],
  "Chinese broccoli / gai lan": ["gai lan"],
  "Chips, corn (plain)": ["corn chips"],
  "Chips, potato crisps (plain)": ["potato crisps"],
  "Chips, tortilla": ["tortilla chips"],
  "Cider, apple (alcoholic)": ["a glass of cider"],
  "Coconut (fresh or dried)": ["coconut"],
  "Cod": ["a cod fillet", "battered fish"],
  "Coffee (regular or decaf)": ["a cup of coffee"],
  "Coffee, black": ["a cup of black coffee"],
  "Cold cuts / deli meat / cold meats such as ham": ["sliced ham", "deli meat"],
  "Corn / Sweet corn": ["sweet corn", "corn on the cob"],
  "Cous cous, wheat": ["couscous"],
  "Cranberry, dried": ["dried cranberries"],
  "Cream, regular fat": ["whipped cream", "pouring cream"],
  "Croissants": ["a croissant"],
  "Dandelion tea, weak": ["a cup of dandelion tea"],
  "Dill, fresh": ["fresh dill"],
  "Dried Cranberries": ["dried cranberries"],
  "Eggplant/Aubergine": ["aubergine", "eggplant"],
  "Eggs": ["fried eggs", "scrambled eggs", "boiled eggs", "poached eggs"],
  "Fennel tea": ["a cup of fennel tea"],
  "Figs, dried": ["dried figs"],
  "Figs, fresh": ["fresh figs"],
  "Frankfurters / hot dogs (plain)": ["frankfurter sausages"],
  "Garbanzo beans, canned": ["chickpeas"],
  "Garlic": ["garlic cloves"],
  "Gherkins in vinegar": ["pickled gherkins"],
  "Ginger tea": ["a cup of ginger tea"],
  "Gluten free wheat products (e.g. breads, cereals, pasta) made without high fodmap ingredients like honey or garlic": ["gluten free bread"],
  "Gnocchi, wheat": ["gnocchi"],
  "Grapes (Red, Green and Black)": ["grapes"],
  "Green Beans": ["green beans"],
  "Green Pepper": ["a green bell pepper"],
  "Green tea": ["a cup of green tea"],
  "Guava, ripe": ["guava"],
  "Guava, unripe": ["guava"],
  "Halloumi / Hellim": ["grilled halloumi"],
  "Herbal tea (weak)": ["a cup of herbal tea"],
  "Hummus / houmous": ["hummus"],
  "Jackfruit, ripe": ["jackfruit"],
  "Jam (mixed berries)": ["berry jam"],
  "Kholrabi": ["kohlrabi"],
  "Kidney beans, boiled": ["kidney beans"],
  "Kidney beans, sprouted": ["kidney beans"],
  "Ketchup (USA)": ["ketchup"],
  "Lamb": ["lamb chops", "roast lamb"],
  "Leeks": ["leeks"],
  "Leeks (green leaves only)": ["leeks"],
  "Lentils, boiled": ["lentils"],
  "Lentils, canned": ["lentils"],
  "Lettuce (e.g. rocket, butter, iceberg, radicchio, red coral, romaine)": ["lettuce", "salad leaves"],
  "Matcha (green tea powder)": ["a cup of matcha"],
  "Melons e.g. Honeydew, galia": ["honeydew melon"],
  "Milk chocolate": ["milk chocolate"],
  "Muffins": ["a muffin"],
  "Mung beans, boiled": ["mung beans"],
  "Mung beans, sprouted": ["bean sprouts"],
  "Naan bread, wheat": ["naan bread"],
  "Nutella / chocolate hazelnut spread": ["chocolate hazelnut spread"],
  "Oatcake": ["oatcakes"],
  "Oatmeal": ["a bowl of oatmeal"],
  "Oats": ["rolled oats"],
  "Onions": ["an onion", "fried onions"],
  "Oolong tea": ["a cup of oolong tea"],
  "Parmesan cheese": ["grated parmesan cheese"],
  "Pasta sauce (cream based)": ["creamy pasta sauce"],
  "Peas": ["green peas"],
  "Peppermint tea": ["a cup of peppermint tea"],
  "Pesto sauce": ["pesto"],
  "Pizza base, wheat": ["pizza"],
  "Pork": ["pork chops", "roast pork"],
  "Potato": ["potatoes", "roast potatoes", "mashed potato", "french fries"],
  "Processed cheese slices": ["a processed cheese slice"],
  "Pumpkin seeds": ["pumpkin seeds"],
  "Rice Cakes": ["rice cakes"],
  "Rice Crackers": ["rice crackers"],
  "Rooibos tea": ["a cup of rooibos tea"],
  "Rutabaga/Swede": ["swede"],
  "Rye": ["rye bread"],
  "Sardines, canned in oil": ["canned sardines"],
  "Salmon": ["a salmon fillet", "smoked salmon"],
  "Savory biscuits": ["crackers"],
  "Scallions / Spring onions / Green onions (green part)": ["spring onions"],
  "Scallions / Spring onions / Green onions (white part)": ["spring onions"],
  "Seaweed / nori": ["nori seaweed"],
  "Silverbeet / chard": ["swiss chard"],
  "Soda water / sparkling water": ["a glass of sparkling water"],
  "Sodas with HFCS": ["a can of soda", "a glass of cola"],
  "Soy sauce": ["a small dish of soy sauce"],
  "Spelt bread (non-sourdough)": ["spelt bread"],
  "Spelt bread (sourdough)": ["sourdough bread"],
  "Split Peas": ["split peas"],
  "Strawberry jam / jelly (without HFCS)": ["strawberry jam"],
  "Tofu (drained or firm)": ["tofu"],
  "Tomato sauce": ["tomato sauce"],
  "Tortilla, wheat (flour)": ["a flour tortilla"],
  "Tuna": ["a tuna steak", "canned tuna"],
  "Tzatziki dip": ["tzatziki"],
  "Wasabi powder": ["wasabi"],
  "Water": ["a glass of water"],
  "Wheat foods e.g. Bread, cereal, pasta": ["sliced bread", "toast", "pasta", "a bread roll", "breakfast cereal"],
  "Whiskey": ["a glass of whiskey"],
  "White rice": ["white rice", "steamed rice"],
  "White tea": ["a cup of white tea"],
  "Wine": ["a glass of wine"],
  "Yogurt": ["yogurt"],
  "Zucchini / courgette": ["courgette"],
  "Apple juice": ["a glass of apple juice"],
  "Cranberry Juice": ["a glass of cranberry juice"],
  "Grape juice": ["a glass of grape juice"],
  "Mango juice": ["a glass of mango juice"],
  "Orange juice": ["a glass of orange juice"],
  "Pear juice": ["a glass of pear juice"],
  "Pineapple juice": ["a glass of pineapple juice"],
  "Tomato juice": ["a glass of tomato juice"],
  "Lemonade": ["a glass of lemonade"],
  "Kombucha": ["a glass of kombucha"],
  "Cow milk": ["a glass of milk"],
  "Chamomile tea": ["a cup of chamomile tea"],
  "Cilantro": ["fresh coriander leaves"],
};

const defaultAlias = (name: string): string => {
  const stripped = name.replace(/\s*\([^)]*\)/g, "").trim();
  const [head, qualifier] = stripped.split(",").map((s) => s.trim());
  const text = qualifier ? `${qualifier} ${head}` : head;
  return text.toLowerCase();
};

export const promptsFor = (food: Fodmap): string[] => aliases[food.name] ?? [defaultAlias(food.name)];

export const isRecognisable = (food: Fodmap): boolean => !excluded.has(food.name);

export const excludedNames = (): string[] => [...excluded];

export const aliasNames = (): string[] => Object.keys(aliases);

export const buildLabelIndex = (model: string, dtype: string): Omit<LabelIndex, "dim" | "hash"> => {
  const rows: string[] = [];
  const rowIndex = new Map<string, number>();
  const row = (kind: LabelKind, prompt: string): number => {
    const key = `${kind}|${prompt}`;
    const existing = rowIndex.get(key);
    if (existing !== undefined) return existing;
    rows.push(prompt);
    rowIndex.set(key, rows.length - 1);
    return rows.length - 1;
  };
  const labels: RecognitionLabel[] = [];
  for (const food of fodmap) {
    if (!isRecognisable(food)) continue;
    labels.push({ kind: "food", id: food.id, name: food.name, rows: promptsFor(food).map((p) => row("food", p)) });
  }
  for (const dish of dishes) {
    labels.push({ kind: "dish", id: dish.id, name: dish.name, rows: dish.prompts.map((p) => row("dish", p)) });
  }
  for (const background of BACKGROUND_LABELS) {
    labels.push({ kind: "background", id: background, name: background, rows: [row("background", background)] });
  }
  return { model, dtype, rows, labels };
};

export const templatesFor = (kind: LabelKind): string[] =>
  kind === "food" ? FOOD_TEMPLATES : kind === "dish" ? DISH_TEMPLATES : BACKGROUND_TEMPLATES;

export const rowKinds = (index: Pick<LabelIndex, "rows" | "labels">): LabelKind[] => {
  const kinds: LabelKind[] = new Array(index.rows.length).fill("food");
  for (const label of index.labels) for (const r of label.rows) kinds[r] = label.kind;
  return kinds;
};
