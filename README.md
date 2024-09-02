# DungeonDash

DungeonDash is a command-line RPG game where players embark on an epic adventure through various dungeons, battling enemies, collecting items, and leveling up to become the ultimate hero. Each dungeon presents unique challenges, enemies, and rewards. Will you be able to defeat the mini-bosses, gather the legendary artifact, and complete your quest?

## Table of Contents

- [Installation](#installation)

- [How to Play](#how-to-play)

- [Game Mechanics](#game-mechanics)

- [World Map](#world-map)

- [Dungeons](#dungeons)

- [Combat](#combat)

- [Items and Inventory](#items-and-inventory)

- [Leveling Up](#leveling-up)

- [Main Quest](#main-quest)

- [Features](#features)

- [Credits](#credits)

## Installation

1\. **Clone the repository:**

```bash

git clone https://github.com/Faizan711/dungeon-dash.git

```

2\. **Navigate to the project directory:**

```bash

cd dungeon-dash

```

3\. **Install the necessary dependencies:**

```bash

npm install

```

4\. **Run the game:**

```bash

node .

```

or you can link to the game using the command:

```bash
npm link
```

and then run the game using the command:

```bash

dungeon-dash

```

## How to Play

1\. **Start the Game:**

- Run the game using the command above.

- You'll be welcomed and prompted to enter your character's name.

2\. **Explore the World:**

- After creating your character, you can choose a location (dungeon) to explore.

3\. **Combat:**

- As you explore dungeons, you'll encounter enemies. Engage in turn-based combat by choosing actions such as "Attack," "Defend," "Use Magic," "Use Item," or "Run Away."

4\. **Collect Loot:**

- Defeat enemies and mini-bosses to collect items, weapons, and armor. These items can be used during your adventure to increase your stats.

5\. **Level Up:**

- Gain experience points (XP) from combat and exploration. Level up to increase your stats and take on more challenging dungeons.

6\. **Complete the Quest:**

- Your goal is to retrieve the pieces of a legendary artifact scattered across the dungeons. Defeat the mini-bosses, collect the pieces, and complete your quest!

## Game Mechanics

### World Map

DungeonDash features a variety of dungeons, each with unique challenges, enemies, and rewards. Explore the world and conquer these dungeons:

- **Enchanted Forest:**

  - _Description:_ A mystical forest filled with magical creatures.
  - _Enemies:_ Fairy, Troll
  - _Mini-Boss:_ Forest Guardian
  - _Difficulty:_ 1
  - _Loot:_ Magic Bow (Attack +10)

- **Haunted Castle:**

  - _Description:_ A dark castle haunted by restless spirits.
  - _Enemies:_ Ghost, Vampire
  - _Mini-Boss:_ Phantom Knight
  - _Difficulty:_ 2
  - _Loot:_ Silver Sword (Attack +15)

- **Sunken Ruins:**

  - _Description:_ Ancient underwater ruins teeming with sea creatures.
  - _Enemies:_ Mermaid, Giant Octopus
  - _Mini-Boss:_ Kraken
  - _Difficulty:_ 3
  - _Loot:_ Trident of Poseidon (Attack +20, Deals double damage to sea creatures)

- **Dwarven Mines:**

  - _Description:_ Deep underground mines filled with rare minerals and gems.
  - _Enemies:_ Goblin, Rockbiter
  - _Mini-Boss:_ Mole King
  - _Difficulty:_ 2
  - _Loot:_ Adamantium Pickaxe (Attack +12, Doubles mining yield)

- **Volcanic Lair:**
  - _Description:_ A fiery lair nestled within an active volcano.
  - _Enemies:_ Lava Elemental, Fire Drake
  - _Mini-Boss:_ Magma Lord
  - _Difficulty:_ 4
  - _Loot:_ Inferno Greaves (Attack +18, Immune to fire damage)

### Combat

Combat is turn-based, with the following actions available to the player:

- **Attack:** Deal damage to the enemy using your equipped weapon.

- **Defend:** Reduce the damage taken from the next enemy attack.

- **Use Magic:** Cast a spell to deal damage or apply effects (only if you have enough magic points).

- **Use Item:** Use an item from your inventory, such as a health potion.

- **Run Away:** Attempt to escape the battle (success depends on luck).

### Items and Inventory

- **Items:** Players can collect items such as potions, weapons, and armor during their adventure. These items can be used in combat or to restore health.

- **Inventory:** Manage your items in the inventory. Equip weapons and armor to enhance your stats.

### Leveling Up

- Gain XP from defeating enemies and completing dungeons. When your XP reaches a certain threshold, you'll level up.

- Leveling up increases your stats, such as health, attack, and defense, making you stronger for future battles.

## Main Quest

The main quest of DungeonDash is to retrieve the pieces of a legendary artifact that has been broken and scattered across the dungeons. Each dungeon is guarded by a mini-boss who holds a piece of the artifact. Collect all the pieces to complete the artifact and finish the quest.

## Features

- **Multiple Dungeons:** Explore a variety of dungeons with unique themes, enemies, and challenges.

- **Turn-Based Combat:** Engage in strategic battles with a variety of combat options.

- **Items and Inventory System:** Collect and manage items to aid you on your quest.

- **Leveling System:** Gain experience, level up, and increase your stats.

- **Main Quest:** Follow the storyline and complete the quest to retrieve the legendary artifact.

## Credits

DungeonDash was developed by Md Faizan Alam using Node.JS and various npm libraries, including:

- `chalk` for colorful terminal output
- `inquirer` for interactive prompts
- `nanospinner` for loading animations
- `gradient-string` for colorful text
- `ora` for additional spinner animations

Feel free to contribute to the project or suggest new features. Enjoy your adventure in DungeonDash!
