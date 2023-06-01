# Wackdonalds
vi tester lige
Github for my DnD miniature collection

To update the miniature collection:
- Upload 1080x1080 transparent image of model to "Images/Miniatures"
- Go to "Database/miniatures.js" and add the following (fill in XXX and so on):

```javascript
{
  src: 'Images/Miniatures/XXX.png',
  name: 'XXX',
  quantity: 'Quantity: XXX',
  tags: ['Race: XXX', 'Subrace: XXX', 'Creature Type: XXX','Size: XXX', 'Class: XXX', 'Gender: XXX', 'Weapon: XXX', 'Armor: XXX', 'Mount: XXX', 'Features: XXX, YYY, ZZZ'],
  location: 'Location: (Placement in cabinet)'
},
