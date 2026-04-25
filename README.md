# Quick Response Back

A modern, eye-catching web app that stores a dictionary of rare/devilish words and displays them in a Geometric Sans typography showcase (Word of the Day + Word Explorer).

## 🚀 Features

- **Word of the Day**: Big, bold, typographic hero section with random word discovery
- **Word Explorer**: Browse all words in a stylish responsive grid
- **SQLite Database**: Persistent storage with Prisma ORM
- **Modern Design**: Clean, minimal interface with Poppins/Nunito fonts and TailwindCSS styling
- **Mobile-First**: Fully responsive design that works on all devices

## 🛠️ Tech Stack

- **Frontend**: Next.js with React and TypeScript
- **Database**: SQLite with Prisma ORM
- **Styling**: TailwindCSS with Typography plugin
- **Fonts**: Poppins/Nunito (Google Fonts) - modern geometric sans-serif fallbacks
- **Data**: 267+ devilish words with definitions, examples, and tone categories

## 🎨 Design System

### Typography
- **Word titles**: 64px bold uppercase (Circular Bold style)
- **Definitions**: 20px medium gray, max-width 600px
- **Examples**: 18px italic secondary gray
- **UI/Navigation**: 16px medium weight

### Color Palette
- **Background**: #f9fafb (neutral light gray)
- **Headline text**: #111827 (charcoal)
- **Accent color**: #2ecc71 (Emerald)
- **Cards**: White with soft shadows and rounded corners

## 📱 Pages

1. **Homepage** (`/`) - Word of the Day hero with features overview
2. **Explorer** (`/explorer`) - Browse and search all words
3. **Responses** (`/search`) - Generate smart responses to messages
4. **Favorites** (`/favorites`) - View saved words and responses

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Commands

- **Seed database**: `npm run db:seed`
- **Open Prisma Studio**: `npm run db:studio`
- **Run migrations**: `npm run db:migrate`

## 📚 Word Categories

- **Witty** 😏 - Clever and humorous words
- **Sarcastic** 😒 - Sharp and cutting words  
- **Romantic** 💕 - Beautiful and poetic words
- **Professional** 💼 - Formal and business-appropriate words
- **Devilish** 😈 - Sharp and provocative words

## 🔮 Future Features

- Tone selector for response generation
- Word of the Day notifications
- Export/share functionality
- Gamification with learning streaks
- API endpoints for external integration
- Mobile app version

## 📝 Usage

1. **Discover Words**: Visit the homepage for your daily word or explore the full collection
2. **Generate Responses**: Paste any message to get three response suggestions (Plain, Witty, Devilish)
3. **Save Favorites**: Click the heart icon to save words and responses you love
4. **Search & Filter**: Use the explorer to find specific words by tone or search term

## 🎯 Perfect For

- Writers looking for unique vocabulary
- Professionals wanting witty responses
- Language enthusiasts exploring rare words
- Anyone who wants to sound more sophisticated

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS
