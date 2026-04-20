// markers.js — points of interest on the world map of Alarkdum.
//
// coords are [y, x] measured in pixels from the TOP-LEFT of the world map image.
// To get new coords, open worldmap.html?edit=1 and click on the map.
//
// Optional fields per marker:
//   thematic  — path to a thematic artwork shown at the top of the popup
//   cityMap   — path to a top-down city map shown inside the popup
//   description — supports HTML; use <br> for line breaks, or paragraphs inline
//
window.mapMarkers = [
  {
    id: "dullen",
    name: "Dullen",
    title: "Capital City of Dullen",
    coords: [385, 790],
    thematic: "Images/Thematic/dullen.jpg",
    cityMap: "Images/Maps/dullen-city.jpg",
    description:
      "Dullen is the capital city of Alarkdum. " +
      "All trading going to other cities goes through here since it sits at the center, " +
      "but that also means it is under frequent attack from monsters &mdash; which is why " +
      "Dullen has the thickest walls all around the outskirts of the city." +
      "<br><br>" +
      "Not much farming goes on in Dullen, and since they can't expand the walls, the alleyways " +
      "ended up very slim and the city grew up rather than out. The markets are plenty though, " +
      "selling whatever your heart desires." +
      "<br><br>" +
      "Further in, where the richer people live, fine tall apartments in very different styles " +
      "line the streets. The buildings have been built upon over time, which can clearly be seen " +
      "as the style differs as it goes up. The infrastructure isn't very well thought through, " +
      "so the apartments lean up against each other for support." +
      "<br><br>" +
      "The working class, homeless and criminals all live in the same vicinity, very hard to " +
      "differentiate as the buildings twist and turn to fill up what little space is left. " +
      "Buildings are merged together, alleyways suddenly end, and random drops between buildings " +
      "plunge down to the ground."
  },
  {
    id: "letty",
    name: "Letty",
    title: "City of Letty",
    coords: [85, 810],
    thematic: "Images/Thematic/letty.jpg",
    // cityMap intentionally omitted until we have one
    description:
      "Letty is the biggest city by far, stretching on for miles and miles. " +
      "It is located furthest from the Dead Zone, lies up against the Shattered Lands &mdash; " +
      "a truly barren place &mdash; and is under &quot;protection&quot; from the dragons that " +
      "live in the mountains." +
      "<br><br>" +
      "This means they can continue to expand without as much trouble as the other cities, " +
      "and don't have to spend extreme amounts of resources on walls and armies. Most of their " +
      "land is used for farming, as they are responsible for almost all non-essential products " +
      "used across Alarkdum." +
      "<br><br>" +
      "Letty is the place for those who wish to stay out of danger and focus on other things. " +
      "Scholars, farmers, entertainers and everything in between usually grow up here and refine " +
      "their skills."
  },
  {
    id: "velz",
    name: "Velz",
    title: "City of Velz",
    coords: [800, 215],
    thematic: "Images/Thematic/velz.jpg",
    cityMap: "Images/Maps/velz-city.jpg",
    description:
      "Velz is the most popular city by far, as they are home to the largest army and the " +
      "famous adventuring guild that all adventuring spirits wish to join." +
      "<br><br>" +
      "Velz is very self-reliant, making most of their own food and protecting themselves. " +
      "This is possible because the area around Velz is very good for training and acts like a " +
      "personal training ground for adventurers and soldiers alike." +
      "<br><br>" +
      "As far into the city as you can get lies a huge plateau where the soldiers train, the " +
      "adventurers have their base of operations, and the politicians discuss the future of Velz. " +
      "From the plateau you can see the thousands of houses and apartments of all kinds of design " +
      "slowly descending towards the outer walls &mdash; that stand brick by brick 50 feet up, " +
      "with guard towers at the gate." +
      "<br><br>" +
      "Beyond the outer walls lie the farms, whether crops or cattle, as far as the eyes can see, " +
      "with small villages of 10-15 houses scattered in between, each in charge of their own part " +
      "of the land. At the end of these farms &mdash; plenty of miles away &mdash; lies the outer-" +
      "outer wall, which consists of nothing but a 5-foot wall meant only as a warning that " +
      "trespassers will be met with soldiers."
  }
];
