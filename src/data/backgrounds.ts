/**
 * The 12 desktop backgrounds shown in the Appearance dropdown.
 *
 * Each `css` string is a complete CSS `background` shorthand value — it is applied
 * 1:1 to both the full desktop layer and its thumbnail, so previews always match.
 *
 * To swap a gradient for a real image later, drop the file in /public/backgrounds
 * and change that entry's css to:
 *   url("/backgrounds/my-image.jpg") center / cover no-repeat
 * (you can keep a gradient after the comma as a loading fallback, like `mint-air`).
 */

export interface BackgroundOption {
  id: string;
  name: string;
  /** value for the CSS `background` shorthand */
  css: string;
  /** dark backgrounds get a lighter focus ring on their thumbnail */
  isDark?: boolean;
}

export const BACKGROUNDS: BackgroundOption[] = [
  {
    id: "mint-air",
    name: "Mint Air",
    css: `url("/wallpaper.jpg") center / cover no-repeat,
      radial-gradient(circle at 60% 8%, rgba(220, 240, 251, 0.95) 0%, rgba(220, 240, 251, 0.55) 8%, transparent 24%),
      radial-gradient(circle at 2% 33%, rgba(222, 200, 114, 0.88) 0%, rgba(222, 200, 114, 0.55) 10%, transparent 30%),
      radial-gradient(circle at 86% 62%, rgba(255, 255, 255, 0.92) 0%, rgba(182, 223, 235, 0.72) 12%, transparent 32%),
      linear-gradient(135deg, #c0ebd0 0%, #98d9d1 32%, #8ed8ce 56%, #9bd5a3 76%, #bbd190 100%)`,
  },
  {
    id: "coral-bloom",
    name: "Coral Bloom",
    css: `radial-gradient(circle at 28% 20%, rgba(255, 196, 208, 0.95) 0%, transparent 48%),
      radial-gradient(circle at 74% 72%, rgba(214, 34, 70, 0.85) 0%, transparent 55%),
      linear-gradient(140deg, #ff9a8b 0%, #ff5470 52%, #e63955 100%)`,
  },
  {
    id: "periwinkle",
    name: "Periwinkle",
    css: `radial-gradient(circle at 26% 24%, rgba(231, 237, 255, 0.95) 0%, transparent 46%),
      radial-gradient(circle at 70% 70%, rgba(122, 110, 255, 0.7) 0%, transparent 55%),
      linear-gradient(135deg, #b9c6ff 0%, #7d8cff 55%, #9a7bff 100%)`,
  },
  {
    id: "spring-glow",
    name: "Spring Glow",
    css: `radial-gradient(circle at 32% 26%, rgba(240, 255, 244, 0.95) 0%, transparent 50%),
      radial-gradient(circle at 72% 76%, rgba(38, 160, 95, 0.75) 0%, transparent 58%),
      linear-gradient(140deg, #d4f7da 0%, #7fdf9c 52%, #3fbf74 100%)`,
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    css: `radial-gradient(circle at 30% 22%, rgba(255, 250, 214, 0.95) 0%, transparent 48%),
      radial-gradient(circle at 74% 74%, rgba(244, 162, 31, 0.8) 0%, transparent 58%),
      linear-gradient(140deg, #ffef9e 0%, #ffd84d 55%, #f6b53a 100%)`,
  },
  {
    id: "ocean-ink",
    name: "Ocean Ink",
    isDark: true,
    css: `radial-gradient(circle at 28% 26%, rgba(86, 156, 255, 0.85) 0%, transparent 52%),
      radial-gradient(circle at 72% 76%, rgba(8, 36, 178, 0.9) 0%, transparent 58%),
      linear-gradient(140deg, #2f6fe4 0%, #0c3ed1 55%, #071f96 100%)`,
  },
  {
    id: "frost",
    name: "Frost",
    css: `radial-gradient(circle at 64% 22%, rgba(255, 255, 255, 0.98) 0%, transparent 46%),
      radial-gradient(circle at 24% 76%, rgba(176, 205, 200, 0.85) 0%, transparent 55%),
      linear-gradient(160deg, #f2f8f6 0%, #d9e9e5 55%, #bcd6d1 100%)`,
  },
  {
    id: "petal-swirl",
    name: "Petal Swirl",
    css: `radial-gradient(circle at 24% 28%, rgba(255, 214, 224, 0.95) 0%, transparent 48%),
      radial-gradient(circle at 70% 58%, rgba(255, 124, 169, 0.85) 0%, transparent 52%),
      radial-gradient(circle at 52% 92%, rgba(255, 205, 150, 0.9) 0%, transparent 50%),
      linear-gradient(135deg, #ffd0da 0%, #ff9dbd 48%, #ffb389 100%)`,
  },
  {
    id: "aurora-noir",
    name: "Aurora Noir",
    isDark: true,
    css: `radial-gradient(circle at 22% 26%, rgba(94, 197, 80, 0.5) 0%, transparent 50%),
      radial-gradient(circle at 76% 70%, rgba(234, 107, 101, 0.45) 0%, transparent 55%),
      radial-gradient(circle at 56% 16%, rgba(243, 191, 82, 0.3) 0%, transparent 42%),
      linear-gradient(140deg, #11151a 0%, #1b231f 50%, #0b0e12 100%)`,
  },
  {
    id: "midnight-oil",
    name: "Midnight Oil",
    isDark: true,
    css: `radial-gradient(circle at 70% 18%, rgba(222, 200, 114, 0.4) 0%, transparent 46%),
      radial-gradient(circle at 28% 76%, rgba(26, 188, 254, 0.32) 0%, transparent 52%),
      linear-gradient(150deg, #0a0d14 0%, #16222d 52%, #0a0d14 100%)`,
  },
  {
    id: "lavender-marble",
    name: "Lavender Marble",
    css: `radial-gradient(circle at 30% 24%, rgba(245, 238, 255, 0.95) 0%, transparent 48%),
      radial-gradient(circle at 72% 70%, rgba(165, 132, 255, 0.8) 0%, transparent 55%),
      linear-gradient(135deg, #e9defc 0%, #c2a8ff 52%, #9f86f0 100%)`,
  },
  {
    id: "sunset-ribbon",
    name: "Sunset Ribbon",
    css: `radial-gradient(circle at 24% 70%, rgba(255, 95, 162, 0.9) 0%, transparent 52%),
      radial-gradient(circle at 76% 24%, rgba(255, 177, 92, 0.92) 0%, transparent 52%),
      linear-gradient(135deg, #ff7ab8 0%, #ff4f81 50%, #ff8a3d 100%)`,
  },
];

export const DEFAULT_BACKGROUND_ID = BACKGROUNDS[0].id;
