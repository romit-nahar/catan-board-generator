# 🏝️ Catan Board Generator

A dynamic, cartoonish Catan board generator built with React and TypeScript. Generate random Catan boards with proper resource distribution and number placement following official game rules.

## ✨ Features

- **Dynamic Board Generation**: Fresh, random board on every page load/refresh
- **Multiple Board Sizes**: Support for both 3-4 player (19 hexes) and 5-6 player (37 hexes) boards
- **Proper Resource Distribution**: Follows official Catan rules for resource placement
- **Cartoonish Design**: Bright, playful visual style with emoji icons
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Statistics**: View resource distribution counts
- **Interactive Controls**: Easy board size switching and regeneration

## 🎮 How It Works

### Resource Distribution
- **3-4 Players**: 4 Forest, 4 Pasture, 4 Fields, 3 Hills, 3 Mountains, 1 Desert
- **5-6 Players**: 6 Forest, 6 Pasture, 6 Fields, 5 Hills, 5 Mountains, 1 Desert

### Number Placement
- Numbers 2-12 (except 7) distributed with proper probabilities
- Desert hex contains the robber (no number token)
- Numbers placed in a logical pattern across the board

### Visual Design
- Hexagonal grid layout using SVG
- Color-coded resources with emoji icons
- Hover effects and smooth animations
- Cartoonish, modern UI design

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd catan-board-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Deploying to GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages using your preferred method (GitHub Actions, manual upload, etc.)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Build tool and development server
- **CSS Modules** - Component-scoped styling
- **SVG** - Vector graphics for hexagonal grid

## 📁 Project Structure

```
src/
├── components/
│   ├── BoardGenerator.tsx    # Main component
│   ├── HexGrid.tsx          # Hexagonal grid container
│   ├── HexTile.tsx          # Individual hex tile
│   ├── BoardControls.tsx    # UI controls and stats
│   └── *.css               # Component styles
├── types/
│   └── board.ts            # TypeScript type definitions
├── utils/
│   ├── boardGenerator.ts   # Main board generation logic
│   ├── resourceDistribution.ts # Resource and number distribution
│   └── hexLayout.ts        # Hexagonal grid layout utilities
└── assets/                 # Static assets
```

## 🎯 Usage

1. **Generate New Board**: Click the "🎲 Generate New Board" button
2. **Change Board Size**: Use the dropdown to switch between 3-4 and 5-6 player boards
3. **View Statistics**: Check the resource distribution panel on the left
4. **Refresh Page**: Simply refresh the page to generate a completely new board

## 🎨 Customization

### Colors
Resource colors are defined in `src/components/HexTile.tsx`:
```typescript
const RESOURCE_COLORS = {
  forest: '#4CAF50',
  pasture: '#8BC34A',
  fields: '#FFEB3B',
  hills: '#FF9800',
  mountains: '#9E9E9E',
  desert: '#FFC107'
};
```

### Icons
Resource icons can be changed in the same file:
```typescript
const RESOURCE_ICONS = {
  forest: '🌲',
  pasture: '🐑',
  fields: '🌾',
  hills: '🧱',
  mountains: '⛰️',
  desert: '🏜️'
};
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the classic board game Catan by Klaus Teuber
- Built with modern web technologies for the best user experience
- Designed with accessibility and responsiveness in mind

---

**Happy Settling! 🏘️**
