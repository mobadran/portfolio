# Terminal Portfolio

A web-based portfolio app that simulates a terminal interface. Users can spawn and close multiple terminal windows using keyboard shortcuts, providing an interactive and developer-friendly way to showcase your work.

## Features

- Multiple terminal windows (spawn with <kbd>Alt</kbd>+<kbd>T</kbd>)
- Close terminals individually
- Keyboard navigation and accessibility
- Built with React, TypeScript, and modern web technologies

## Usage

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/terminal-portfolio.git
   cd terminal-portfolio
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Keyboard Shortcuts

- **Alt+T**: Open a new terminal window

## Development

- Edit components in `src/components/`
- Main logic for terminal management is in `Main.tsx`
- Customize terminal appearance and commands in the `Terminal` component
