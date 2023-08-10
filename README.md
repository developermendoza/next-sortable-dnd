This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Image Gallery Web App

This is a Next.js web application that allows users to upload images, rearrange their order, and view the list of uploaded images before submitting.

![alt text](images/web-app-screenshot.png)

## Features

- Upload images using drag and drop or file selection.
- Rearrange uploaded images by dragging and dropping.
- Delete images from the gallery.
- Preview images before submitting.
- Submit the selected images for processing.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository to your local machine

```bash
git clone https://github.com/your-username/image-gallery-app.git
```

2. Navigate to the project directory:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Dependencies

- [@dnd-kit/core](https://dndkit.com/)
- [@dnd-kit/modifiers](https://dndkit.com/)
- [@dnd-kit/utilities](https://dndkit.com/)
- [create-file-list](https://www.npmjs.com/package/create-file-list)
- [react-image-file-resizer](https://www.npmjs.com/package/react-image-file-resizer)
- [uuid](https://www.npmjs.com/package/uuid)

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Usage

1. Drag and drop images onto the dropzone area or click to select files.
2. Rearrange images by dragging and dropping them within the gallery.
3. Click the "Delete" button to remove an image from the gallery.
4. Click the "Submit" button to view the list of selected images before submitting.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# next-sortable-dnd
