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
    id: "mesh-1",
    name: "Mesh Gradient",
    css: `url("/backgrounds/Gradient-mesh-1.jpg") center / cover no-repeat`,
  },
  {
    id: "mesh-3",
    name: "Mesh Bloom",
    css: `url("/backgrounds/Gradient-mesh-3.jpg") center / cover no-repeat`,
  },
  {
    id: "mesh-5",
    name: "Mesh Dusk",
    css: `url("/backgrounds/Gradient-mesh-5.jpg") center / cover no-repeat`,
  },
  {
    id: "halo-1",
    name: "Halo Blush",
    css: `url("/backgrounds/Gradient-halo-1.jpg") center / cover no-repeat`,
  },
  {
    id: "halo-3",
    name: "Halo Golden",
    css: `url("/backgrounds/Gradient-halo-3.jpg") center / cover no-repeat`,
  },
  {
    id: "halo-4",
    name: "Halo Cyan",
    css: `url("/backgrounds/Gradient-halo-4.jpg") center / cover no-repeat`,
  },
  {
    id: "bg-1",
    name: "Aurora Silk",
    isDark: true,
    css: `url("/backgrounds/Background -1.jpg") center / cover no-repeat`,
  },
  {
    id: "bg-2",
    name: "Petal Swirl",
    css: `url("/backgrounds/Background -2.jpg") center / cover no-repeat`,
  },
  {
    id: "bg-3",
    name: "Neon Ribbons",
    isDark: true,
    css: `url("/backgrounds/Background -3.jpg") center / cover no-repeat`,
  },
  {
    id: "bg-7",
    name: "Teal Void",
    isDark: true,
    css: `url("/backgrounds/Background -7.jpg") center / cover no-repeat`,
  },
  {
    id: "bg-8",
    name: "Ember Flow",
    isDark: true,
    css: `url("/backgrounds/Background -8.jpg") center / cover no-repeat`,
  },
  {
    id: "bg-10",
    name: "Deep Ocean",
    isDark: true,
    css: `url("/backgrounds/Background -10.jpg") center / cover no-repeat`,
  },
];

export const DEFAULT_BACKGROUND_ID = BACKGROUNDS[0].id;
