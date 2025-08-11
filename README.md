# Love Confession App 💝

A beautiful and interactive love confession web application built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- Interactive love confession interface
- Beautiful animations and transitions
- Responsive design
- Modern UI with a lovely pink theme

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js
- Tailwind CSS
- Framer Motion
- TypeScript

## Credits

- Design & Code by [@PPekKunGzDev](https://github.com/PPekKunGzDev)
- Animations inspired by [v0.dev](https://v0.dev)
- Love confession concept by https://www.youware.com/project/8d73ndrpuw?enter_from=personal_center
- README / LICENSE by Claude-3.5-Sonnet

## Customization

### How to Change Date and Message

1. Set your special date:
   - Open `src/app/page.tsx`
   - Find the line `const firstDate = new Date("2025-04-11")`
   - Change the date to your special date (format: "YYYY-MM-DD")
   - The app will automatically calculate months and days together

2. Customize the message:
   - Navigate to `src/lib/message.txt`
   - Open the file in your text editor
   - Add your personalized message
   - The message supports line breaks and emojis

3. To change the loading delay:
   - Open `src/components/modal/love-card.tsx`
   - Find the `setTimeout` function
   - Adjust the delay value (default is 3000ms)

4. To customize images:
   - Place your images in the `public` folder
   - Update the image paths in `src/components/modal/image-slider.tsx`
   - Supported formats: jpg, png, mp4

## License

This project is open source and available for use with proper attribution to the original creators.
