# El Pollo Loco Game

A JavaScript-based 2D jump-and-run game featuring a Mexican-themed adventure.

## Game Overview

El Pollo Loco is a side-scrolling platformer where players control Pepe, a character who must collect items, avoid enemies, and defeat the final boss - El Pollo Loco.

## Game Features

- **Character Movement**: Walk, jump, and run with smooth animations
- **Enemy System**: Multiple enemy types including chickens and the endboss
- **Collectibles**: Coins and salsa bottles to collect
- **Audio System**: Background music and sound effects
- **Mobile Support**: Touch controls for mobile devices

## Classes Overview

### Core Game Classes
- `World` - Main game world manager
- `Character` - Player character with animations and controls
- `Level` - Level configuration and object management

### Enemy Classes
- `Chicken` - Regular enemy chicken
- `SmallChicken` - Smaller variant of chicken enemy
- `Endboss` - Final boss with multiple attack patterns

### Object Classes
- `MovableObject` - Base class for all moving game objects
- `DrawableObject` - Base class for all drawable elements
- `CollisionManager` - Handles all collision detection

## Getting Started

1. Open `index.html` in a web browser
2. Click START to begin the game
3. Use arrow keys to move, SPACE to jump, D to throw bottles

## Documentation

Run `npm run docs` to generate the complete API documentation.