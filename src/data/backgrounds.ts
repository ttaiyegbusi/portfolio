/**
 * 12 desktop backgrounds: 10 real high-quality images (center/cover, no pixelation)
 * + 2 from original gradient set to complete the 12.
 */

export interface BackgroundOption {
  id: string;
  name: string;
  css: string;
  isDark?: boolean;
}

export const BACKGROUNDS: BackgroundOption[] = [
  {
    id: "mint-air",
    name: "Mint Air",
    css: `url("/wallpaper.jpg") center / cover no-repeat`,
  },
  {
    id: "mesh-gradient",
    name: "Mesh Gradient",
    css: `url("/backgrounds/Gradient-mesh-1.png") center / cover no-repeat`,
  },
  {
    id: "halo-blush",
    name: "Halo Blush",
    css: `url("/backgrounds/Gradient-halo-1.png") center / cover no-repeat`,
  },
  {
    id: "neon-ribbons",
    name: "Neon Ribbons",
    isDark: true,
    css: `url("/backgrounds/Gradient-halo-2.png") center / cover no-repeat`,
  },
  {
    id: "teal-void",
    name: "Teal Void",
    isDark: true,
    css: `url("/backgrounds/Background_-1.png") center / cover no-repeat`,
  },
  {
    id: "golden-halo",
    name: "Golden Halo",
    css: `url("/backgrounds/Gradient-halo-3.png") center / cover no-repeat`,
  },
  {
    id: "cyan-dream",
    name: "Cyan Dream",
    css: `url("/backgrounds/Gradient-halo-4.png") center / cover no-repeat`,
  },
  {
    id: "frost-mist",
    name: "Frost Mist",
    css: `url("/backgrounds/Gradient-halo-5.png") center / cover no-repeat`,
  },
  {
    id: "magenta-burst",
    name: "Magenta Burst",
    css: `url("/backgrounds/Gradient-mesh-5.png") center / cover no-repeat`,
  },
  {
    id: "twilight-fade",
    name: "Twilight Fade",
    css: `url("/backgrounds/Background_-2.png") center / cover no-repeat`,
  },
  {
    id: "emerald-glow",
    name: "Emerald Glow",
    css: `url("/backgrounds/Background_-4.png") center / cover no-repeat`,
  },
  {
    id: "lavender-marble",
    name: "Lavender Marble",
    css: `linear-gradient(135deg, #e9defc 0%, #c2a8ff 52%, #9f86f0 100%)`,
  },
];

export const DEFAULT_BACKGROUND_ID = BACKGROUNDS[0].id;
