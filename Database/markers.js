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
    coords: [426, 818],
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
    coords: [100, 887],
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
    coords: [826, 180],
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
  },
  {
    id: "khalssari",
    name: "Khal'Ssari",
    title: "Khal'Ssari &mdash; The City Below",
    coords: [176, 634],
    thematic: "Images/Thematic/khalssari.png",
    description:
      "There are cities that reach for the sky, and there are cities that hide from it. " +
      "Khal'Ssari does neither. It descends." +
      "<br><br>" +
      "Carved into the wall of a great ravine in the Shattered Lands, the city was never built " +
      "so much as hollowed. Where surface cities lay stone upon stone, the Yuan-Ti of Khal'Ssari " +
      "cut inward, tunnelling deeper with each passing generation, following the heat of the earth " +
      "down toward the slow glow of lava far below. The ravine breathes. Smoke rises from its " +
      "depths in long, tired exhalations, carrying with it the scent of burnt refuse and hot metal " +
      "&mdash; the first thing any traveller notices, long before they ever see a guard, a market, " +
      "or a face." +
      "<br><br>" +
      "The name itself tells you what kind of place it is. Khal'Ssari &mdash; the Deep City. " +
      "The City Below. Not below a kingdom, not below a mountain. Simply below. As if everything " +
      "that matters lies downward, and the surface is only the mouth of something larger." +
      "<br><br>" +
      "A visitor enters at the top, where the trash is. Platforms jut from the cliffside and tip " +
      "the city's refuse into the glowing dark; fire salamanders chew through bone and fungus in " +
      "long, warm halls; workers sort, burn, and forget. Descend a level, and the air thickens " +
      "with cooking fires and fungal damp. Here are the communal chambers where most of the " +
      "Yuan-Ti live, the great bartering markets where nothing is paid for in coin and nearly " +
      "anything can be found, and the small, quieter markets where the things that shouldn't be " +
      "sold are. Descend again, and the stone becomes smoother, the ceilings higher, the guards " +
      "more watchful. This is the level of the council, of the luxury chambers, of the shrine " +
      "and the training pits &mdash; the part of the city the Yuan-Ti would show a guest, if " +
      "they ever chose to have one." +
      "<br><br>" +
      "But Khal'Ssari does not end there." +
      "<br><br>" +
      "Beneath the shrine, behind an unmarked opening in the wall, the city changes. The " +
      "corridors straighten. Corners sharpen. Everything becomes exact, measured, symmetrical " +
      "&mdash; as if the rough, living stone of the upper levels has been replaced by something " +
      "that wants to be perfect. This is where the Cult of the Devouring Coil begins, and where " +
      "Khal'Ssari stops being a city at all. It becomes a body. A throat. A long descent toward " +
      "the thing waiting at the bottom." +
      "<br><br>" +
      "To those who live above, Khal'Ssari is an old Yuan-Ti settlement, secluded and self-" +
      "sufficient, rarely seen and mostly rumour. To those who dwell within it, it is a home " +
      "that has been quietly eaten for generations &mdash; from the root up, not the branch down. " +
      "The council still speaks of balance. The markets still trade. Eggs are still kept warm in " +
      "their chambers. But deeper than any of that, deeper than the council can reach, something " +
      "coils in the dark and whispers that the Yuan-Ti were once more than this." +
      "<br><br>" +
      "And the city, level by level, is beginning to listen."
  },
  {
    id: "aelthirion",
    name: "Aelthirion",
    title: "Aelthirion &mdash; The Stillwild",
    coords: [501, 981],
    thematic: "Images/Thematic/stillwind.png",
    description:
      "There are cities that grow, and there are cities that are built. " +
      "Aelthirion is neither. It was placed." +
      "<br><br>" +
      "A short ride from Dullen, where the ground was once uneven and unremarkable, " +
      "a vast plateau of pale stone now rises out of the earth as though lifted by " +
      "an invisible hand. Its sides are sheer, its surface impossibly level, its " +
      "edges too clean to be the work of wind or water. There are no quarry scars " +
      "at its base, no displaced earth, no fractures in the rock &mdash; only a " +
      "single, seamless transition from the broken land below to the still and " +
      "ordered space above. The plateau was not constructed. It was raised. And " +
      "anyone who walks upon it long enough begins to suspect that something has " +
      "been bound into the stone &mdash; something held very, very still." +
      "<br><br>" +
      "Beneath the polished surface, faint vein-like patterns run through the rock, " +
      "resembling roots frozen mid-reach. In the right light they seem almost to " +
      "move. Footsteps land softer than they should. Sound carries strangely. " +
      "Across the entire expanse, nature exists only where it has been allowed: " +
      "grass in defined stretches, trees in fixed positions, flowers blooming in " +
      "quiet cycles that begin and end exactly when intended. Flower golems and " +
      "stone constructs drift through the open spaces in steady, untiring patrols, " +
      "trimming what dares to grow too far, smoothing imperfections that scarcely " +
      "appear at all. Nothing here changes by accident. Nothing here changes at all." +
      "<br><br>" +
      "There are only three ways onto the plateau. Three great towers rise from " +
      "the ground below and meet the city above, woven of pale stone and shaped, " +
      "deliberate growth. Vines climb them, but only in the patterns they were " +
      "given. Flowers bloom along their sides, but never beyond their bounds. " +
      "Those who ascend through them speak afterward of a strange pressure as " +
      "they climbed &mdash; a quiet sense that the city was already aware of " +
      "them, long before they arrived. There are no hidden paths. No back routes. " +
      "No forgotten gates. Only what has been permitted." +
      "<br><br>" +
      "Above, the city itself unfolds in concentric rings, each turning inward " +
      "toward a single point." +
      "<br><br>" +
      "The Outer Ring is where most of Aelthirion's people live. Its homes, " +
      "workshops, and gathering spaces are simple but ordered, separated by " +
      "patches of carefully tended green. Life here is the most visible &mdash; " +
      "the most lived in &mdash; though even here, no plant grows past its " +
      "appointed line, and no door faces a direction it was not meant to face. " +
      "Beyond it, the Civic Ring handles the work of the city: open plazas, " +
      "structured gardens, halls where decisions are carried out and tasks " +
      "distributed. Function takes precedence over beauty, though beauty is " +
      "never truly absent. And inward of that lies the Inner Ring &mdash; the " +
      "most refined district, where stone and living growth become " +
      "indistinguishable from one another, and trees rise from the architecture " +
      "as though the buildings had grown them on purpose. Here dwell the " +
      "Queen's closest followers, those granted a place within her design." +
      "<br><br>" +
      "At the heart of all of it stands the palace." +
      "<br><br>" +
      "It is not separated from the city by walls; it does not need to be. Every " +
      "street, every garden, every line of sight bends gently toward it, the way " +
      "iron filings bend toward a lodestone. It mirrors the Queen's seat in the " +
      "Feywild, adapted to the Material Plane &mdash; at once grown and built, " +
      "organic and exact. From a distance it looks alive. Up close, it is " +
      "unmistakably governed." +
      "<br><br>" +
      "The Queen of the Seelie Court is almost never seen. No one in living " +
      "memory speaks of having met her in the open. And yet her absence is not " +
      "doubted; it is felt. Her closest courtiers move through the city as " +
      "extensions of her will, their words heavier than their station should " +
      "allow. The stillness of the air, the precision of movement, the quiet " +
      "certainty that nothing within Aelthirion exists beyond her awareness " +
      "&mdash; these are her presence, more reliably than any throne. Aelthirion " +
      "does not need her at its centre. Everything within it already belongs to her." +
      "<br><br>" +
      "Among those who live there, two quiet truths exist side by side." +
      "<br><br>" +
      "Some revere the city. They look upon Aelthirion and see something the " +
      "world has been failing at for centuries &mdash; balance, finally achieved; " +
      "chaos, finally answered. They take pride in their roles, in the unbroken " +
      "rhythm of the place, in the privilege of being part of something that has " +
      "been made correctly." +
      "<br><br>" +
      "Others endure it. They do not resist openly, and they would rarely admit " +
      "the feeling even to themselves, but they long quietly for a life that is " +
      "not measured. A garden that is allowed to overgrow. A door that opens onto " +
      "something unexpected. They live within Aelthirion because it is safe, and " +
      "they understand that safety here has a price &mdash; paid in small, daily " +
      "portions, in the shape of all the things they no longer choose for themselves." +
      "<br><br>" +
      "This divide is rarely spoken, but it can be seen if one knows where to " +
      "look. The Inner Ring is flawless. The Civic Ring is precise. The Outer " +
      "Ring, while still perfectly maintained, holds the smallest traces of " +
      "preference &mdash; a personal arrangement of objects, a flower allowed to " +
      "lean a half-degree further than it should before the golems return. " +
      "Nothing breaks the rules. But some press gently against them." +
      "<br><br>" +
      "The mortals of Dullen named the city first, before they ever learned its " +
      "true name." +
      "<br><br>" +
      "The Stillwild. A place where nature lives but does not spread. A forest " +
      "that does not grow. A city that does not change." +
      "<br><br>" +
      "Only later did the other name surface, carried in quieter voices, by " +
      "those who had reason to know." +
      "<br><br>" +
      "Aelthirion." +
      "<br><br>" +
      "It is a name not spoken loudly. It does not need to be. Where the rest of " +
      "the world struggles against corruption, instability, and the things that " +
      "crawl out of the cracked places, Aelthirion stands as something else " +
      "entirely &mdash; proof that the wild can be held, if the will holding it " +
      "is great enough. It is the first true foothold of the Feywild in the " +
      "Material Plane since the Cross World." +
      "<br><br>" +
      "It does not expand. It does not adapt." +
      "<br><br>" +
      "It simply remains." +
      "<br><br>" +
      "Perfectly ordered. Perfectly still. Exactly as it was made."
  }
];
